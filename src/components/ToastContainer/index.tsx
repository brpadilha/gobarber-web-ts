import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { Container, Toast } from './styles';

/* Propriedades 
hasDescription -> estiliza o componente Toast para quando não tem descrição
type -> estiliza a cor do toast */

const ToastContainer: React.FC = () => {
  return (
    <Container>
      <Toast hasDescription>
        <FiAlertCircle />
        <div>
          <strong>Aconteceu um erro</strong>
          <p>Não foi possível fazer login na aplicação</p>

          <button type="button">
            <FiXCircle size={20} />
          </button>
        </div>
      </Toast>

      <Toast type="success" hasDescription={false}>
        <FiAlertCircle />
        <div>
          <strong>Aconteceu um erro</strong>

          <button type="button">
            <FiXCircle size={20} />
          </button>
        </div>
      </Toast>
      <Toast type="error" hasDescription>
        <FiAlertCircle />
        <div>
          <strong>Aconteceu um erro</strong>
          <p>Não foi possível fazer login na aplicação</p>

          <button type="button">
            <FiXCircle size={20} />
          </button>
        </div>
      </Toast>
    </Container>
  );
};

export default ToastContainer;
