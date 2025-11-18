import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {Chat} from "../../styles/Chat.styled";
import {Chat__messagesComponent} from "./Chat__messages";
import {Chat__inputComponent} from "./Chat__input";
import EmptyState from "./EmptyState";
import {createNewChat, fetchMessages, sendUserMessage, subscribeMessages} from "../../services/chatService";
import {AuthContext} from "../../context/AuthContext";
import {callAI} from "../../services/ai";

export const ChatComponent = ({chatId: chatIdFromRoute}) => {
    const {user} = useContext(AuthContext);
    const [chatId, setChatId] = useState(chatIdFromRoute ?? null);
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const unsubRef = useRef(() => {
    });
    const bottomRef = useRef(null);
    const subscriptionReady = useRef(false);
    const pendingMessages = useRef([]); // Cola para mensajes enviados antes de la suscripción
    let isMounted = true; // Mover isMounted al ámbito superior

    const scrollToBottom = () => {
        if (!bottomRef.current) return;
        requestAnimationFrame(() => {
            bottomRef.current?.scrollIntoView({behavior: "smooth", block: "end"});
        });
    };

    useLayoutEffect(() => {
        scrollToBottom();
    }, [messages.length]);

    useEffect(() => {
        // Resetear estado si no hay usuario autenticado
        if (!user?.id) {
            setChatId(null);
            setMessages([]);
            setTyping(false);
            if (unsubRef.current) {
                unsubRef.current();
                unsubRef.current = () => {
                };
            }
            subscriptionReady.current = false;
            pendingMessages.current = [];
            return;
        }

        // Solo proceder si el usuario está autenticado
        if (!chatIdFromRoute) return;

        // Limpiar suscripción previa
        if (unsubRef.current) {
            console.log("Cleaning up previous subscription for chatId:", chatId);
            unsubRef.current();
            unsubRef.current = () => {
            };
        }

        isMounted = true; // Resetear isMounted al montar

        (async () => {
            let id = chatIdFromRoute;
            if (!id) {
                id = await createNewChat(user.id);
                if (isMounted) setChatId(id);
            }

            const rows = await fetchMessages(id);
            if (isMounted) {
                setMessages(
                    rows.map((r) => ({
                        id: r.id,
                        text: r.content,
                        isUser: r.sender === "user",
                        created_at: r.created_at,
                    }))
                );
            }

            // Configurar la suscripción
            unsubRef.current = subscribeMessages(id, (row) => {
                console.log("Received insert for chatId:", id, "row:", row);
                if (row.chat_id !== id) {
                    console.warn("Ignoring mismatched row for chatId:", row.chat_id, "current:", id);
                    return;
                }

                if (isMounted) {
                    setMessages((prev) => {
                        if (row.id && prev.some((m) => m.id === row.id)) return prev;

                        const clientId = row?.metadata?.client_id;
                        if (clientId) {
                            const i = prev.findIndex((m) => m.pending && m.clientId === clientId);
                            if (i !== -1) {
                                const copy = [...prev];
                                copy[i] = {
                                    id: row.id,
                                    text: row.content,
                                    isUser: row.sender === "user",
                                    created_at: row.created_at,
                                };
                                return copy;
                            }
                        }

                        return [
                            ...prev,
                            {
                                id: row.id,
                                text: row.content,
                                isUser: row.sender === "user",
                                created_at: row.created_at,
                            },
                        ];
                    });

                    if (row.sender === "assistant") setTyping(false);
                }
            });

            // Esperar conexión y marcar como lista
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Aumentar a 1000ms
            console.log("Subscription set up and channel connected for chatId:", id);
            subscriptionReady.current = true;

            const recentMessages = await fetchMessages(id, {limit: 10});
            if (isMounted) {
                setMessages((prev) => {
                    const newMessages = recentMessages
                        .filter((r) => !prev.some((m) => m.id === r.id))
                        .map((r) => ({
                            id: r.id,
                            text: r.content,
                            isUser: r.sender === "user",
                            created_at: r.created_at,
                        }));
                    return [...prev, ...newMessages];
                });
            }

            // Procesar mensajes encolados solo si la suscripción está lista
            if (subscriptionReady.current) {
                pendingMessages.current.forEach(({userText, clientId}) => handleSend(userText, clientId));
                pendingMessages.current = [];
            }
        })();

        return () => {
            isMounted = false;
            if (unsubRef.current) {
                console.log("Unmount cleanup for chatId:", chatId);
                unsubRef.current();
                unsubRef.current = () => {
                };
            }
        };
    }, [user?.id, chatIdFromRoute]);

    const handleSend = async (userText, clientId = crypto.randomUUID()) => {
        if (!chatIdFromRoute || !user?.id) return;

        if (!subscriptionReady.current) {
            pendingMessages.current.push({userText, clientId});
            console.log("Message enqueued, waiting for subscription:", {userText, clientId});
            return;
        }

        setMessages((prev) => [
            ...prev,
            {text: userText, isUser: true, pending: true, clientId},
        ]);

        try {
            console.log("Sending message to chatId:", chatIdFromRoute);
            await sendUserMessage(chatIdFromRoute, userText, clientId);
        } catch (e) {
            setMessages((prev) =>
                prev.map((m) =>
                    m.pending && m.clientId === clientId ? {...m, error: true} : m
                )
            );
            return;
        }

        setTyping(true);
        try {
            console.log("Calling AI for chatId:", chatIdFromRoute);
            await callAI(chatIdFromRoute, userText);

            // Forzar actualización con fetchMessages después de 2 segundos como respaldo
            const updateMessages = async () => {
                if (isMounted) {
                    console.log("Forcing update with fetchMessages for chatId:", chatIdFromRoute);
                    const rows = await fetchMessages(chatIdFromRoute);
                    setMessages(
                        rows.map((r) => ({
                            id: r.id,
                            text: r.content,
                            isUser: r.sender === "user",
                            created_at: r.created_at,
                        }))
                    );
                    setTyping(false);
                }
            };
            setTimeout(updateMessages, 2000); // Respaldo por si el WebSocket falla
        } catch (e) {
            console.error("AI error", e);
            if (isMounted) {
                setTyping(false);
                setMessages((prev) => [
                    ...prev,
                    {text: "No pude obtener respuesta del asistente.", isUser: false},
                ]);
            }
        }
    };

    const handleSuggestionClick = (suggestionText) => {
        handleSend(suggestionText);
    };

    return (
        <Chat>
            {messages.length === 0 ? (
                <EmptyState
                    userName={user?.name}
                    onSuggestionClick={handleSuggestionClick}
                />
            ) : (
                <Chat__messagesComponent
                    messages={messages}
                    bottomRef={bottomRef}
                    typing={typing}
                />
            )}
            <Chat__inputComponent onSend={(userText) => handleSend(userText)}/>
        </Chat>
    );
};