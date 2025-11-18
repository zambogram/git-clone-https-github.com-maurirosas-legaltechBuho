import React from "react";
import ReactMarkdown from "react-markdown";
import { Chat__message, MessageIcon, MessageContent, CitationBox } from "../../styles/Chat.styled";
import { Logo__imgComponent_chat } from "../Logo__chat";

export const Chat__messageComponent = ({ text, isUser }) => {
  // Función para detectar y renderizar citas legales
  const renderContentWithCitations = (text) => {
    if (!text) return null;

    // Regex para detectar patrones de citas legales
    const citationPattern = /(Ley \d+[\w-]*|Art\. \d+.*?(?=\n|$)|Artículo \d+.*?(?=\n|$)|Código [\w\s]+:)/gi;

    const parts = text.split(citationPattern);
    const matches = text.match(citationPattern) || [];

    const elements = [];
    let matchIndex = 0;

    parts.forEach((part, index) => {
      if (part && part.trim()) {
        // Es texto normal
        elements.push(
          <ReactMarkdown key={`text-${index}`}>
            {part}
          </ReactMarkdown>
        );
      }

      // Agregar cita si corresponde
      if (matchIndex < matches.length) {
        elements.push(
          <CitationBox key={`cite-${matchIndex}`}>
            {matches[matchIndex]}
          </CitationBox>
        );
        matchIndex++;
      }
    });

    return elements;
  };

  // Extraer inicial del usuario o usar default
  const getUserInitial = () => {
    return 'U';
  };

  return (
    <Chat__message $isUser={isUser}>
      <MessageIcon $isUser={isUser}>
        {isUser ? (
          <span>{getUserInitial()}</span>
        ) : (
          <Logo__imgComponent_chat size={18} color="white" />
        )}
      </MessageIcon>

      <MessageContent $isUser={isUser}>
        {isUser ? (
          // Mensajes del usuario: texto plano
          text
        ) : (
          // Mensajes del asistente: markdown con citas destacadas
          renderContentWithCitations(text)
        )}
      </MessageContent>
    </Chat__message>
  );
};
