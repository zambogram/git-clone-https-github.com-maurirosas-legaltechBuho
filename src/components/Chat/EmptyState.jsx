import styled from 'styled-components';
import { colors, spacing, typography, borderRadius, shadows, transitions } from '../../styles/designSystem';

const EmptyState = ({ userName, onSuggestionClick }) => {
  const suggestions = [
    {
      id: 1,
      text: "Explícame la prescripción adquisitiva",
      category: "Civil"
    },
    {
      id: 2,
      text: "¿Cuáles son los plazos para un recurso de revocatoria?",
      category: "Administrativo"
    },
    {
      id: 3,
      text: "Derechos laborales en despido injustificado",
      category: "Laboral"
    },
    {
      id: 4,
      text: "¿Qué dice el TCP sobre el debido proceso?",
      category: "Constitucional"
    }
  ];

  return (
    <Container>
      <Content>
        <WelcomeSection>
          <Title>Bienvenido a BÚHO</Title>
          <Subtitle>Dr. {userName || 'Abogado'}</Subtitle>
          <Description>
            Asistente legal especializado en legislación boliviana
          </Description>
        </WelcomeSection>

        <SuggestionsGrid>
          {suggestions.map((suggestion) => (
            <SuggestionCard
              key={suggestion.id}
              onClick={() => onSuggestionClick(suggestion.text)}
            >
              <SuggestionCategory>{suggestion.category}</SuggestionCategory>
              <SuggestionText>{suggestion.text}</SuggestionText>
            </SuggestionCard>
          ))}
        </SuggestionsGrid>
      </Content>
    </Container>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STYLED COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: ${spacing['3xl']};
  background: ${colors.bgPrimary};

  @media (max-width: 768px) {
    padding: ${spacing.xl};
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing['4xl']};
`;

const WelcomeSection = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const Title = styled.h1`
  font-size: ${typography.fontSize['4xl']};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.textPrimary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${typography.fontSize['3xl']};
  }
`;

const Subtitle = styled.h2`
  font-size: ${typography.fontSize['4xl']};
  font-weight: ${typography.fontWeight.normal};
  color: ${colors.textSecondary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${typography.fontSize['3xl']};
  }
`;

const Description = styled.p`
  font-size: ${typography.fontSize.base};
  color: ${colors.textTertiary};
  margin-top: ${spacing.sm};
`;

const SuggestionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing.lg};
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${spacing.md};
  }
`;

const SuggestionCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${spacing.sm};
  padding: ${spacing.lg};
  background: ${colors.bgPrimary};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg};
  cursor: pointer;
  transition: all ${transitions.base};
  text-align: left;

  &:hover {
    background: ${colors.bgSecondary};
    border-color: ${colors.borderHover};
    transform: translateY(-2px);
    box-shadow: ${shadows.md};
  }

  &:active {
    transform: translateY(0);
  }
`;

const SuggestionCategory = styled.span`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.accent};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SuggestionText = styled.span`
  font-size: ${typography.fontSize.sm};
  color: ${colors.textPrimary};
  line-height: ${typography.lineHeight.relaxed};
`;

export default EmptyState;
