import styled, { keyframes } from 'styled-components';
import { colors, spacing, typography, borderRadius, shadows, transitions } from './designSystem';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONTAINER PRINCIPAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const Chat = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${colors.bgPrimary};
  position: relative;
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MESSAGES CONTAINER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const Chat__messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${spacing['3xl']} ${spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${spacing['2xl']};
  max-width: 900px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: ${spacing.xl} ${spacing.lg};
    gap: ${spacing.xl};
  }
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MESSAGE BUBBLES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const messageIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const Chat__messageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.md};
  animation: ${messageIn} 0.3s ease-out;

  ${props => props.$isUser ? `
    flex-direction: row-reverse;
    justify-content: flex-start;
  ` : `
    flex-direction: row;
  `}
`;

export const Chat__message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.md};
  animation: ${messageIn} 0.3s ease-out;

  ${props => props.$isUser ? `
    flex-direction: row-reverse;
    justify-content: flex-start;
  ` : `
    flex-direction: row;
  `}
`;

export const MessageIcon = styled.div`
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  background: ${props => props.$isUser ? colors.accent : colors.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.bgPrimary};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.sm};
  flex-shrink: 0;

  img, svg {
    width: 18px;
    height: 18px;
  }
`;

export const MessageContent = styled.div`
  max-width: 75%;
  padding: ${props => props.$isUser ? spacing.lg : '0'};
  background: ${props => props.$isUser ? colors.userBubble : 'transparent'};
  border-radius: ${props => props.$isUser ? borderRadius.xl : '0'};
  color: ${colors.textPrimary};
  font-size: ${typography.fontSize.base};
  line-height: ${typography.lineHeight.relaxed};
  word-wrap: break-word;

  @media (max-width: 768px) {
    max-width: 85%;
  }

  // Markdown styling
  p {
    margin: 0 0 ${spacing.md} 0;
    &:last-child {
      margin-bottom: 0;
    }
  }

  ul, ol {
    margin: ${spacing.sm} 0;
    padding-left: ${spacing['2xl']};
  }

  li {
    margin: ${spacing.xs} 0;
  }

  strong {
    font-weight: ${typography.fontWeight.semibold};
  }

  em {
    font-style: italic;
  }

  code {
    background: ${colors.bgTertiary};
    padding: 2px 6px;
    border-radius: ${borderRadius.sm};
    font-size: ${typography.fontSize.sm};
    font-family: ${typography.fontFamily.mono};
    color: ${colors.textPrimary};
  }

  pre {
    background: ${colors.bgTertiary};
    padding: ${spacing.lg};
    border-radius: ${borderRadius.md};
    overflow-x: auto;
    margin: ${spacing.md} 0;

    code {
      background: none;
      padding: 0;
      font-size: ${typography.fontSize.sm};
    }
  }

  blockquote {
    border-left: 3px solid ${colors.border};
    padding-left: ${spacing.lg};
    margin: ${spacing.md} 0;
    color: ${colors.textSecondary};
  }
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CITATION BOX (para citas legales)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const CitationBox = styled.div`
  background: ${colors.citationBox};
  border-left: 3px solid ${colors.citationBorder};
  padding: ${spacing.md} ${spacing.lg};
  margin: ${spacing.md} 0;
  border-radius: ${borderRadius.md};
  font-size: ${typography.fontSize.sm};
  color: ${colors.textSecondary};
  font-style: italic;
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TYPING INDICATOR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const blink = keyframes`
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const TypingBubble = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md} 0;

  span {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${colors.accent};
    animation: ${blink} 1.4s infinite ease-in-out;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHAT INPUT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ChatInputWrapper = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${spacing.xl};
  background: ${colors.bgPrimary};
  border-top: 1px solid ${colors.border};

  @media (max-width: 768px) {
    padding: ${spacing.lg};
  }
`;

export const ChatInputContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  gap: ${spacing.md};
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg};
  padding: ${spacing.md} ${spacing.lg};
  transition: border-color ${transitions.base}, box-shadow ${transitions.base};

  &:focus-within {
    border-color: ${colors.borderFocus};
    box-shadow: ${shadows.focus};
  }
`;

export const ChatInputField = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  font-size: ${typography.fontSize.base};
  font-family: ${typography.fontFamily.primary};
  color: ${colors.textPrimary};
  background: transparent;
  max-height: 200px;
  overflow-y: auto;
  line-height: ${typography.lineHeight.normal};

  &::placeholder {
    color: ${colors.textPlaceholder};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ChatInputButton = styled.button`
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: ${borderRadius.md};
  background: ${props => props.$hasValue ? colors.accent : colors.bgTertiary};
  color: ${props => props.$hasValue ? colors.bgPrimary : colors.textTertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.$hasValue ? 'pointer' : 'not-allowed'};
  transition: all ${transitions.base};
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: ${props => props.$hasValue ? colors.accentHover : colors.bgTertiary};
    transform: ${props => props.$hasValue ? 'scale(1.05)' : 'none'};
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LEGACY EXPORTS (mantener compatibilidad)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ChatComponentWrapper = styled.div`
  flex-grow: 1;
  transition: all 0.3s ease;
`;

export const ChatContainer = styled.div`
  display: flex;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  width: 100%;
`;
