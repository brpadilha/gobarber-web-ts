import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { Container, Toast } from './styles';

import { ToastMessage } from '../../hooks/toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

/* Propriedades 
hasDescription -> estiliza o componente Toast para quando não tem descrição
type -> estiliza a cor do toast */

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map((message) => (
        <Toast
          key={message.id}
          type={message.type}
          hasDescription={!!message.description}
        >
          <FiAlertCircle />
          <div>
            <strong>{message.title}</strong>
            {message.description && <p>{message.description}</p>}

            <button type="button">
              <FiXCircle size={20} />
            </button>
          </div>
        </Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;
