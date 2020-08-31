import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  // quando quer importar um tipo componente
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null);
  const { defaultValue, error, fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      // nome do campo que vai ser o name que estamos recebendo
      name: fieldName,
      // referencia que a gente recebe
      ref: inputRef.current,
      // caminho via jquery que é o value.
      // document.querySelector('input').value
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input defaultValue={defaultValue} ref={inputRef} {...rest} />
    </Container>
  );
};

export default Input;
