import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// aplicando a tipagem no button
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {children}
    </Container>
  );
};

export default Button;
