import React, {useEffect, useRef, useState} from "react";
import {
    ChatInputWrapper,
    ChatInputContainer,
    ChatInputField,
    ChatInputButton,
} from "../../styles/Chat.styled";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";

export const Chat__inputComponent = ({onSend}) => {
    const [input, setInput] = useState("");
    const taRef = useRef(null);

    const autosize = () => {
        const el = taRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    };

    useEffect(() => {
        autosize();
    }, [input]);

    const handleChange = (e) => {
        setInput(e.target.value);
        requestAnimationFrame(autosize);
    };

    const handleSubmit = () => {
        const value = input.trim();
        if (!value) return;
        onSend(value);
        setInput("");
        requestAnimationFrame(() => {
            const el = taRef.current;
            if (el) el.style.height = "auto";
        });
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <ChatInputWrapper>
            <ChatInputContainer>
                <ChatInputField
                    ref={taRef}
                    rows={1}
                    placeholder="Resuelve tus dudas jurídicas"
                    value={input}
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                />
                <ChatInputButton
                    onClick={handleSubmit}
                    $hasValue={!!input.trim()}
                    aria-label="Enviar"
                >
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </ChatInputButton>
            </ChatInputContainer>
        </ChatInputWrapper>
    );
};
