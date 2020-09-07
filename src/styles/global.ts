import { createGlobalStyle } from 'styled-components';
// yarn add @types/styled-components

export default createGlobalStyle`
  * {
    margin:0;
    padding: 0;
    box-sizing: border-box;
    outline:0;
  }

  body {
    background: #312E38;
    color: #FFF;
    -webkit-font-smoothing: antialiased;
    /* deixa as letras mais bonitas */
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }
  
  h1,h2,h3,h4,h5,h6, strong{
    font-weight:500;
  }

  button {
    cursor: pointer;
    /* coloca mãozinha quando passa em cima do botão */
  }
  

`;
