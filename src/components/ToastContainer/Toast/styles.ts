import styled, { css } from 'styled-components';
// para o elemento react sping funcionar nao pode usar o componente somente como uma div, mas como uma animated div
import { animated } from 'react-spring';

interface ContainerProps {
  // tipo da mensagem
  type?: 'success' | 'error' | 'info';

  // verifica se a toast tem mensagem ou nao
  hasDescription: number;
}

const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,

  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,

  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  /* desgrudar os toasts */
  & + div {
    margin-top: 8px;
  }

  background: #ebf8ff;
  color: #3178b7;

  /* verifica se o tipo contem no toastTypeVariations como erro ou success, se nao mostra a info */
  ${(props) => toastTypeVariations[props.type || 'info']}

  /* pega o fgv (icone ) que está dentro do toast */
  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8px;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 8px;
    top: 15px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${(props) =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
