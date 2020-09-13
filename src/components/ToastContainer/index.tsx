import React from 'react';

import { ToastMessage } from '../../hooks/toast';
import Toast from './Toast';
import { Container } from './styles';

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
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  );
};

export default ToastContainer;
