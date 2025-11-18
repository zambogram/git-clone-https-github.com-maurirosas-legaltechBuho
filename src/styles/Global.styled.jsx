import { createGlobalStyle } from 'styled-components';
import { colors, typography, spacing } from './designSystem';

export const GlobalStyles = createGlobalStyle`
  // Import Google Fonts
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    overflow: hidden;
  }

  body {
    font-family: ${typography.fontFamily.primary};
    font-size: ${typography.fontSize.base};
    line-height: ${typography.lineHeight.normal};
    color: ${colors.textPrimary};
    background: ${colors.bgPrimary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    height: 100%;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  input, textarea {
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  // Custom scrollbar (estilo Claude.ai)
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.gray300};
    border-radius: 4px;

    &:hover {
      background: ${colors.gray400};
    }
  }

  // Firefox scrollbar
  * {
    scrollbar-width: thin;
    scrollbar-color: ${colors.gray300} transparent;
  }
`;

// Mantener exportación del MainContentWrapper para compatibilidad
import styled from 'styled-components';

export const MainContentWrapper = styled.div`
  flex-grow: 1;
  transition: margin-left 0.3s ease-in-out;
  width: 75%;
`;

// Exportar GlobalStyle como alias para compatibilidad
export const GlobalStyle = GlobalStyles;
