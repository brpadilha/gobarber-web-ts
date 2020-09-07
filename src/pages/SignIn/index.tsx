import React, { useCallback, useRef, useContext } from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { user, signIn } = useContext(AuthContext);

  console.log(user);
  // vendo o estado current do form
  const formRef = useRef<FormHandles>(null);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        // zerar os errors para quando corrigir no input de novo
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().required('Email obrigatório').email(),
          password: Yup.string().required('Senha obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });
      } catch (err) {
        // pegando as mensagens de error
        const errors = getValidationErrors(err);

        // caso encontre erros, seta nos errors
        formRef.current?.setErrors(errors);
      }

      signIn({
        email: data.email,
        password: data.password,
      });
    },

    // toda variável externa devemos utilizar aqui
    [signIn],
  );

  return (
    <>
      <Container>
        <Content>
          <img src={logoImg} alt="GoBarber" />

          <h1>Faça seu logon</h1>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </Form>

          <a href="login">
            <FiLogIn />
            Criar conta
          </a>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default SignIn;
