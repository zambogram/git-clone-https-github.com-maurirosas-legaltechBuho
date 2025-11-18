import styled from "styled-components";
import { colors, spacing, typography, shadows, transitions } from './designSystem';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NAVBAR PRINCIPAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const NavbarWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  height: 64px;
  background: ${colors.bgPrimary};
  border-bottom: 1px solid ${colors.border};
  padding: 0 ${spacing.xl};
  z-index: 100;

  @media (max-width: 768px) {
    height: 56px;
    padding: 0 ${spacing.md};
  }
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TÍTULO DEL CHAT (CENTRADO)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const Span__tituloChat = styled.h1`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.textPrimary};
  margin: 0;
  text-align: center;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 ${spacing.lg};

  @media (max-width: 768px) {
    font-size: ${typography.fontSize.sm};
    padding: 0 ${spacing.md};
  }

  @media (max-width: 480px) {
    font-size: ${typography.fontSize.xs};
  }
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// USER ICON (DERECHA)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const UserIconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserIcon = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${colors.accent};
  color: ${colors.bgPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  transition: all ${transitions.base};

  &:hover {
    background: ${colors.accentHover};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: ${typography.fontSize.xs};
  }
`;

export const UserIcon__image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DROPDOWN (MENÚ USUARIO)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const DropdownWrapper = styled.div`
  position: absolute;
  top: calc(100% + ${spacing.sm});
  right: 0;
  width: 240px;
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  box-shadow: ${shadows.lg};
  overflow: hidden;
  z-index: 1000;
`;

export const DropdownHeader = styled.div`
  padding: ${spacing.lg};
  border-bottom: 1px solid ${colors.border};
`;

export const DropdownUserName = styled.div`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.textPrimary};
  margin-bottom: 2px;
`;

export const DropdownUserEmail = styled.div`
  font-size: ${typography.fontSize.xs};
  color: ${colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DropdownMenu = styled.div`
  padding: ${spacing.sm} 0;
`;

export const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md} ${spacing.lg};
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all ${transitions.base};
  text-align: left;
  color: ${colors.textPrimary};
  font-size: ${typography.fontSize.sm};

  &:hover {
    background: ${colors.bgSecondary};
  }

  &:active {
    background: ${colors.bgTertiary};
  }

  svg {
    width: 16px;
    height: 16px;
    color: ${colors.textTertiary};
  }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background: ${colors.border};
  margin: ${spacing.sm} 0;
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORTS LEGACY (para compatibilidad)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Mantener exportaciones anteriores si algún componente las usa
export const Navbar__toggle = styled.div``;
export const Toggle__img = styled.img``;
export const NavLinkWrapper = styled.div``;
export const StyledNavLink = styled.button``;
export const SidebarToggle = styled.button``;
export const SidebarButton = styled.button``;
export const Sidebar = styled.div``;
