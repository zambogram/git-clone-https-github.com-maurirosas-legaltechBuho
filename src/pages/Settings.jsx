import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import { colors, spacing, typography, borderRadius, shadows, transitions } from "../styles/designSystem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faBell,
  faLanguage,
  faShieldAlt,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

export const Settings = () => {
  const { user, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("es");

  if (!user) {
    return (
      <Container>
        <EmptyMessage>Debes iniciar sesión para ver la configuración</EmptyMessage>
      </Container>
    );
  }

  const handleDeleteAccount = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      // TODO: Implementar lógica de eliminación de cuenta
      alert("Funcionalidad en desarrollo");
    }
  };

  return (
    <Container>
      <Content>
        <Header>
          <Title>Configuración</Title>
          <Subtitle>Personaliza tu experiencia en BÚHO</Subtitle>
        </Header>

        {/* Apariencia */}
        <SettingsSection>
          <SectionHeader>
            <SectionIcon>
              <FontAwesomeIcon icon={faPalette} />
            </SectionIcon>
            <SectionTitle>Apariencia</SectionTitle>
          </SectionHeader>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Tema</SettingLabel>
              <SettingDescription>Elige entre tema claro u oscuro</SettingDescription>
            </SettingInfo>
            <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Claro</option>
              <option value="dark">Oscuro (próximamente)</option>
              <option value="system">Sistema (próximamente)</option>
            </Select>
          </SettingItem>
        </SettingsSection>

        {/* Notificaciones */}
        <SettingsSection>
          <SectionHeader>
            <SectionIcon>
              <FontAwesomeIcon icon={faBell} />
            </SectionIcon>
            <SectionTitle>Notificaciones</SectionTitle>
          </SectionHeader>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Notificaciones push</SettingLabel>
              <SettingDescription>Recibe notificaciones sobre actualizaciones</SettingDescription>
            </SettingInfo>
            <Toggle>
              <ToggleInput
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <ToggleSlider $checked={notifications} />
            </Toggle>
          </SettingItem>
        </SettingsSection>

        {/* Idioma */}
        <SettingsSection>
          <SectionHeader>
            <SectionIcon>
              <FontAwesomeIcon icon={faLanguage} />
            </SectionIcon>
            <SectionTitle>Idioma</SectionTitle>
          </SectionHeader>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Idioma de la interfaz</SettingLabel>
              <SettingDescription>Selecciona el idioma de la aplicación</SettingDescription>
            </SettingInfo>
            <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="es">Español</option>
              <option value="en">English (próximamente)</option>
            </Select>
          </SettingItem>
        </SettingsSection>

        {/* Privacidad */}
        <SettingsSection>
          <SectionHeader>
            <SectionIcon>
              <FontAwesomeIcon icon={faShieldAlt} />
            </SectionIcon>
            <SectionTitle>Privacidad y Seguridad</SectionTitle>
          </SectionHeader>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Historial de conversaciones</SettingLabel>
              <SettingDescription>Todas tus conversaciones son privadas y confidenciales</SettingDescription>
            </SettingInfo>
            <InfoBadge>Activo</InfoBadge>
          </SettingItem>
        </SettingsSection>

        {/* Zona de peligro */}
        <DangerZone>
          <SectionHeader>
            <SectionIcon $danger>
              <FontAwesomeIcon icon={faTrash} />
            </SectionIcon>
            <SectionTitle>Zona de peligro</SectionTitle>
          </SectionHeader>

          <DangerItem>
            <SettingInfo>
              <SettingLabel>Eliminar cuenta</SettingLabel>
              <SettingDescription>
                Elimina permanentemente tu cuenta y todos tus datos
              </SettingDescription>
            </SettingInfo>
            <DangerButton onClick={handleDeleteAccount}>
              Eliminar cuenta
            </DangerButton>
          </DangerItem>
        </DangerZone>
      </Content>
    </Container>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STYLED COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  background: ${colors.bgPrimary};
  padding: ${spacing['4xl']};

  @media (max-width: 768px) {
    padding: ${spacing.xl};
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${spacing['2xl']};
`;

const Header = styled.div`
  margin-bottom: ${spacing.xl};
`;

const Title = styled.h1`
  font-size: ${typography.fontSize['3xl']};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.textPrimary};
  margin: 0 0 ${spacing.sm} 0;
`;

const Subtitle = styled.p`
  font-size: ${typography.fontSize.base};
  color: ${colors.textSecondary};
  margin: 0;
`;

const SettingsSection = styled.div`
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg};
  padding: ${spacing['2xl']};
  box-shadow: ${shadows.sm};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  margin-bottom: ${spacing.xl};
  padding-bottom: ${spacing.lg};
  border-bottom: 1px solid ${colors.border};
`;

const SectionIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${borderRadius.md};
  background: ${props => props.$danger ? 'rgba(239, 68, 68, 0.1)' : colors.bgSecondary};
  color: ${props => props.$danger ? '#EF4444' : colors.textTertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typography.fontSize.base};
`;

const SectionTitle = styled.h2`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.textPrimary};
  margin: 0;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.xl};
  padding: ${spacing.lg} 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${colors.border};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${spacing.md};
  }
`;

const SettingInfo = styled.div`
  flex: 1;
`;

const SettingLabel = styled.div`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.textPrimary};
  margin-bottom: 4px;
`;

const SettingDescription = styled.div`
  font-size: ${typography.fontSize.sm};
  color: ${colors.textSecondary};
  line-height: ${typography.lineHeight.relaxed};
`;

const Select = styled.select`
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.md};
  background: ${colors.bgPrimary};
  color: ${colors.textPrimary};
  font-size: ${typography.fontSize.sm};
  font-family: ${typography.fontFamily.primary};
  cursor: pointer;
  transition: all ${transitions.base};
  min-width: 180px;

  &:hover {
    border-color: ${colors.borderHover};
  }

  &:focus {
    outline: none;
    border-color: ${colors.borderFocus};
    box-shadow: ${shadows.focus};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const ToggleSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.$checked ? colors.accent : colors.gray300};
  border-radius: 24px;
  transition: all ${transitions.base};

  &::before {
    content: '';
    position: absolute;
    height: 18px;
    width: 18px;
    left: ${props => props.$checked ? '26px' : '3px'};
    bottom: 3px;
    background: ${colors.bgPrimary};
    border-radius: 50%;
    transition: all ${transitions.base};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    background: ${props => props.$checked ? colors.accentHover : colors.gray400};
  }
`;

const InfoBadge = styled.div`
  padding: ${spacing.xs} ${spacing.md};
  background: ${colors.citationBox};
  color: ${colors.accent};
  border-radius: ${borderRadius.md};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
`;

const DangerZone = styled.div`
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: ${borderRadius.lg};
  padding: ${spacing['2xl']};
`;

const DangerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.xl};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${spacing.md};
  }
`;

const DangerButton = styled.button`
  padding: ${spacing.sm} ${spacing.lg};
  background: transparent;
  color: #EF4444;
  border: 1px solid #EF4444;
  border-radius: ${borderRadius.md};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${transitions.base};
  white-space: nowrap;

  &:hover {
    background: #EF4444;
    color: ${colors.bgPrimary};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: ${spacing['5xl']};
  font-size: ${typography.fontSize.lg};
  color: ${colors.textSecondary};
`;
