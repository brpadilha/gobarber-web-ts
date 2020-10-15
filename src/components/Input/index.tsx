import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  // quando quer importar um tipo componente
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  // tipando o useRef para verificar se os elementos do input estão vazios
  const inputRef = useRef<HTMLInputElement>(null);
  const { defaultValue, error, fieldName, registerField } = useField(name);
  // ver quando o input estiver com focus, quando estiver digitando algo, vai ficar laranja
  const [isFocused, setIsFocused] = useState(false);
  // ver se já foi digitado algo no input, quando estiver preenchido, o ícone vai ficar laranja
  const [isFilled, setIsFilled] = useState(false);

  /*
  // Quando criar uma função dentro do componente, utilizar o useCallback
  // ele é bem similar ao useEffect
  // função para manter o ícone laranja
*/
  const handleInputBlur = useCallback(
    () => {
      setIsFocused(false);

      // !! transforma em booleano, iguala o if abaixo
      setIsFilled(!!inputRef.current?.value);

      // if (inputRef.current?.value) {
      //   setIsFilled(true)
      // } else {
      //   setIsFilled(false)
      // }
    },
    // deixar o parâmetro vazio pois só vai recriar quando algo mudar, aqui não queremos que mude
    [],
  );

  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

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
    <Container isError={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        // ganhou o foco
        onFocus={handleOnFocus}
        // perdeu o foco
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
