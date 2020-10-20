import React, { useCallback, useRef } from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Link, useHistory } from 'react-router-dom';

import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationConatiner } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  // useAuth é usando o contexto global do usuário logado
  const { signIn } = useAuth();

  const { addToast } = useToast();

  const history = useHistory();

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

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // pegando as mensagens de error
          const errors = getValidationErrors(err);

          // caso encontre erros, seta nos errors
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });

        // disparar um toast
      }
    },

    // toda variável externa devemos utilizar aqui
    [signIn, addToast, history],
  );

  return (
    <>
      <Container>
        <Content>
          <AnimationConatiner>
            <img src={logoImg} alt="GoBarber" />

            <Form onSubmit={handleSubmit} ref={formRef}>
              <Input name="email" icon={FiMail} placeholder="E-mail" />
              <h1>Faça seu logon</h1>

              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />

              <Button type="submit">Entrar</Button>

              <Link to="/forgot-password">Esqueci minha senha</Link>
            </Form>

            <Link to="/signup">
              <FiLogIn />
              Criar conta
            </Link>
          </AnimationConatiner>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default SignIn;
