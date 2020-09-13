import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  /* forçar que o container tenha 100% do view port da tela */
  display: flex;
  align-items: stretch;
  /* vai fazer com que os itens também comportem em toda a tela */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

// animação para o container aparecer da esquerda para direita
const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const AnimationConatiner = styled.div`
  /* animation */
  animation: ${appearFromLeft} 1s;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* faz com que o content fique centralizado na tela */
  form {
    margin: 80px;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  /* > estilizar o a que vem somente no content e não um nível para dentro*/
  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    display: flex;
    align-items: center;

    transition: color 0.2s;
    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
