import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #5e8db9;
    color: #000000;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Montserrat', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500px;
  }

  button {
    cursor: pointer;
  }
`;
