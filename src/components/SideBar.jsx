import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPlus,
  faUser,
  faX,
  faMessage,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";
import {
  SideBar,
  SideBarButton,
  UserButton,
  HistoryPanel,
  HistoryHeader,
  HistoryTitle,
  CloseButton,
  ChatList,
  ChatItem,
  ChatItemIcon,
  ChatItemContent,
  ChatItemTitle,
  ChatItemDate,
  EmptyHistoryState,
  EmptyHistoryIcon,
  EmptyHistoryText,
  PanelOverlay,
} from "../styles/SideBar.styled";
import { createNewChat, getChatsByUser } from "../services/chatService.js";
import { AuthContext } from "../context/AuthContext";

export const SideBarComponent = () => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Cargar chats del usuario
  useEffect(() => {
    if (!user?.id) return;

    getChatsByUser(user.id)
      .then(setChats)
      .catch((error) => {
        console.error("Error al obtener los chats:", error);
      });
  }, [user]);

  // Crear nuevo chat
  const handleNewChat = async () => {
    if (!user?.id) return;

    try {
      const newChat = await createNewChat(user.id);
      setChats((prev) => [{ id: newChat.id, title: newChat.title, created_at: newChat.created_at }, ...prev]);
      navigate(`/Chat/${newChat.id}`);
      setHistoryOpen(false); // Cerrar panel después de crear
    } catch (err) {
      console.error("Error al crear nuevo chat:", err);
    }
  };

  // Toggle del historial
  const toggleHistory = () => {
    setHistoryOpen((prev) => !prev);
  };

  // Navegar a un chat y cerrar panel
  const handleChatClick = (chatId) => {
    navigate(`/Chat/${chatId}`);
    setHistoryOpen(false);
  };

  // Obtener ID del chat activo
  const activeChatId = location.pathname.split("/").pop();

  // Formatear fecha relativa
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `Hace ${diffMins}min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;

    return date.toLocaleDateString("es-BO", {
      day: "numeric",
      month: "short",
    });
  };

  // Obtener inicial del usuario
  const getUserInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <>
      {/* SIDEBAR PRINCIPAL - 60px */}
      <SideBar>
        {/* Botón Toggle */}
        <SideBarButton
          onClick={toggleHistory}
          $active={historyOpen}
          aria-label="Toggle historial"
          title="Historial de chats"
        >
          <FontAwesomeIcon icon={faBars} />
        </SideBarButton>

        {/* Botón Nuevo Chat */}
        <SideBarButton
          onClick={handleNewChat}
          aria-label="Nuevo chat"
          title="Crear nuevo chat"
        >
          <FontAwesomeIcon icon={faPlus} />
        </SideBarButton>

        {/* Botón Usuario */}
        <UserButton
          aria-label="Usuario"
          title={user?.name || "Usuario"}
        >
          {getUserInitial()}
        </UserButton>
      </SideBar>

      {/* PANEL DE HISTORIAL - Expandible */}
      <HistoryPanel $isOpen={historyOpen}>
        {/* Header */}
        <HistoryHeader>
          <HistoryTitle>Historial</HistoryTitle>
          <CloseButton
            onClick={() => setHistoryOpen(false)}
            aria-label="Cerrar historial"
          >
            <FontAwesomeIcon icon={faX} />
          </CloseButton>
        </HistoryHeader>

        {/* Lista de Chats */}
        <ChatList>
          {chats.length === 0 ? (
            // Empty State
            <EmptyHistoryState>
              <EmptyHistoryIcon>
                <FontAwesomeIcon icon={faInbox} />
              </EmptyHistoryIcon>
              <EmptyHistoryText>
                No hay conversaciones aún
              </EmptyHistoryText>
            </EmptyHistoryState>
          ) : (
            // Lista de chats
            chats.map((chat) => (
              <ChatItem
                key={chat.id}
                onClick={() => handleChatClick(chat.id)}
                $isActive={chat.id === activeChatId}
              >
                <ChatItemIcon>
                  <FontAwesomeIcon icon={faMessage} />
                </ChatItemIcon>
                <ChatItemContent>
                  <ChatItemTitle $isActive={chat.id === activeChatId}>
                    {chat.title || "Chat sin título"}
                  </ChatItemTitle>
                  <ChatItemDate>
                    {formatDate(chat.created_at)}
                  </ChatItemDate>
                </ChatItemContent>
              </ChatItem>
            ))
          )}
        </ChatList>
      </HistoryPanel>

      {/* OVERLAY (solo mobile) */}
      <PanelOverlay
        $isOpen={historyOpen}
        onClick={() => setHistoryOpen(false)}
      />
    </>
  );
};
