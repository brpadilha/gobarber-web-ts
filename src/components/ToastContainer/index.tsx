import React from 'react';

import { useTransition } from 'react-spring';

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
  const messagesWithTransictions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <Container>
      {messagesWithTransictions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
