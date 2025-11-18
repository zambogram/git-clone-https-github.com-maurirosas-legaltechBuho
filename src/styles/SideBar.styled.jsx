import styled from "styled-components";
import { colors, spacing, typography, borderRadius, shadows, transitions } from './designSystem';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SIDEBAR PRINCIPAL (60px fijo)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const SideBar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 60px;
  height: 100vh;
  background: ${colors.bgPrimary};
  border-right: 1px solid ${colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${spacing.lg} 0;
  gap: ${spacing.md};
  z-index: 1000;

  @media (max-width: 768px) {
    width: 50px;
    padding: ${spacing.md} 0;
  }
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BOTONES DEL SIDEBAR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const SideBarButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${props => props.$active ? colors.bgTertiary : 'transparent'};
  color: ${colors.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${transitions.base};
  border: none;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    color: ${colors.textPrimary};
  }

  &:hover {
    background: ${colors.bgTertiary};
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const UserButton = styled(SideBarButton)`
  margin-top: auto;
  background: ${colors.accent};
  color: ${colors.bgPrimary};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.sm};

  &:hover {
    background: ${colors.accentHover};
  }

  svg {
    color: ${colors.bgPrimary};
  }
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PANEL DE HISTORIAL (expandible)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const HistoryPanel = styled.div`
  position: fixed;
  left: 60px;
  top: 0;
  width: 280px;
  height: 100vh;
  background: ${colors.bgPrimary};
  border-right: 1px solid ${colors.border};
  transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform ${transitions.slow};
  z-index: 999;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    left: 50px;
    width: 260px;
  }

  @media (max-width: 480px) {
    width: calc(100vw - 50px);
  }
`;

export const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.lg} ${spacing.xl};
  border-bottom: 1px solid ${colors.border};
  flex-shrink: 0;
`;

export const HistoryTitle = styled.h2`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.textPrimary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${borderRadius.md};
  background: transparent;
  color: ${colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${transitions.base};
  border: none;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: ${colors.bgTertiary};
    color: ${colors.textPrimary};
  }
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LISTA DE CHATS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ChatList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${spacing.md} ${spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.gray300};
    border-radius: 3px;

    &:hover {
      background: ${colors.gray400};
    }
  }
`;

export const ChatItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md} ${spacing.lg};
  background: ${props => props.$isActive ? colors.bgTertiary : 'transparent'};
  border: none;
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: all ${transitions.base};
  text-align: left;
  width: 100%;

  &:hover {
    background: ${props => props.$isActive ? colors.bgTertiary : colors.bgSecondary};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ChatItemIcon = styled.div`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.textTertiary};

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ChatItemContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ChatItemTitle = styled.span`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.normal};
  color: ${props => props.$isActive ? colors.textPrimary : colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
`;

export const ChatItemDate = styled.span`
  font-size: ${typography.fontSize.xs};
  color: ${colors.textTertiary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EMPTY STATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const EmptyHistoryState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing['3xl']};
  text-align: center;
  color: ${colors.textTertiary};
  height: 100%;
`;

export const EmptyHistoryIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${colors.bgTertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing.lg};

  svg {
    width: 24px;
    height: 24px;
    color: ${colors.textTertiary};
  }
`;

export const EmptyHistoryText = styled.p`
  font-size: ${typography.fontSize.sm};
  color: ${colors.textTertiary};
  margin: 0;
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OVERLAY (para cerrar panel en mobile)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const PanelOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 998;
  opacity: ${props => props.$isOpen ? 1 : 0};
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
  transition: opacity ${transitions.slow};

  @media (min-width: 769px) {
    display: none;
  }
`;
