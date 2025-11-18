import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import { colors, spacing, typography, borderRadius, shadows } from "../styles/designSystem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faCalendar } from "@fortawesome/free-solid-svg-icons";

export const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <Container>
        <EmptyMessage>Debes iniciar sesión para ver tu perfil</EmptyMessage>
      </Container>
    );
  }

  // Formatear fecha de registro (simulada)
  const memberSince = "Noviembre 2025";

  return (
    <Container>
      <Content>
        <Header>
          <Title>Mi Perfil</Title>
          <Subtitle>Información de tu cuenta</Subtitle>
        </Header>

        <ProfileCard>
          <AvatarSection>
            {user.avatar ? (
              <Avatar src={user.avatar} alt={user.name} />
            ) : (
              <AvatarPlaceholder>
                {user.name?.charAt(0).toUpperCase() || "U"}
              </AvatarPlaceholder>
            )}
            <UserName>{user.name || "Usuario"}</UserName>
            <UserRole>Abogado</UserRole>
          </AvatarSection>

          <InfoSection>
            <InfoItem>
              <InfoIcon>
                <FontAwesomeIcon icon={faUser} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Nombre completo</InfoLabel>
                <InfoValue>{user.name || "No disponible"}</InfoValue>
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <FontAwesomeIcon icon={faEnvelope} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Correo electrónico</InfoLabel>
                <InfoValue>{user.email}</InfoValue>
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <FontAwesomeIcon icon={faCalendar} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Miembro desde</InfoLabel>
                <InfoValue>{memberSince}</InfoValue>
              </InfoContent>
            </InfoItem>
          </InfoSection>
        </ProfileCard>

        <StatsCard>
          <StatsTitle>Estadísticas de Uso</StatsTitle>
          <StatsGrid>
            <StatItem>
              <StatValue>0</StatValue>
              <StatLabel>Consultas realizadas</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>0</StatValue>
              <StatLabel>Chats activos</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>0</StatValue>
              <StatLabel>Citas legales</StatLabel>
            </StatItem>
          </StatsGrid>
        </StatsCard>
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

const ProfileCard = styled.div`
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg};
  padding: ${spacing['3xl']};
  box-shadow: ${shadows.sm};

  @media (max-width: 768px) {
    padding: ${spacing.xl};
  }
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${spacing['2xl']};
  border-bottom: 1px solid ${colors.border};
  margin-bottom: ${spacing['2xl']};
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: ${spacing.lg};
  border: 3px solid ${colors.border};
`;

const AvatarPlaceholder = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${colors.accent};
  color: ${colors.bgPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typography.fontSize['3xl']};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: ${spacing.lg};
  border: 3px solid ${colors.border};
`;

const UserName = styled.h2`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.textPrimary};
  margin: 0 0 ${spacing.xs} 0;
`;

const UserRole = styled.p`
  font-size: ${typography.fontSize.sm};
  color: ${colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.lg};
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: ${borderRadius.md};
  background: ${colors.bgSecondary};
  color: ${colors.textTertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typography.fontSize.base};
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: ${typography.fontSize.sm};
  color: ${colors.textSecondary};
  margin-bottom: 4px;
`;

const InfoValue = styled.div`
  font-size: ${typography.fontSize.base};
  color: ${colors.textPrimary};
  font-weight: ${typography.fontWeight.medium};
`;

const StatsCard = styled.div`
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg};
  padding: ${spacing['2xl']};
  box-shadow: ${shadows.sm};
`;

const StatsTitle = styled.h3`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.textPrimary};
  margin: 0 0 ${spacing.xl} 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${spacing.lg};
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: ${spacing.lg};
  background: ${colors.bgSecondary};
  border-radius: ${borderRadius.md};
`;

const StatValue = styled.div`
  font-size: ${typography.fontSize['3xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.accent};
  margin-bottom: ${spacing.sm};
`;

const StatLabel = styled.div`
  font-size: ${typography.fontSize.sm};
  color: ${colors.textSecondary};
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: ${spacing['5xl']};
  font-size: ${typography.fontSize.lg};
  color: ${colors.textSecondary};
`;
