import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 144px;
    background-color: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        height: 24px;
        width: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  justify-content: center;
  /* faz com que o content fique centralizado na tela */

  margin: -175px 0 auto;

  align-items: center;
  width: 100%;

  width: 0 auto;

  form {
    margin: 80px;
    width: 340px;
    text-align: center;

    /* para centralizar a imagem com a logo da camera */
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
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
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;

  width: 186px;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  button {
    width: 48px;
    height: 48px;
    position: absolute;
    border-radius: 50%;
    background: #ff9000;

    /* canto inferior direito */
    right: 0;
    bottom: 0;
    border: 0;

    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
