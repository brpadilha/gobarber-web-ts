import React, { useCallback, useRef } from 'react';

import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

// useHistory é para redirecionar para a pagina de login depois de fazer o cadastro pelo componente
import { Link, useHistory } from 'react-router-dom';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

// se conseguir cadastrar toast de success
import { useToast } from '../../hooks/toast';

import { Container, Content, Background, AnimationContainer } from './styles';

interface signUpFormData {
  name: string;
  email: string;
  passowrd: string;
}

const SignUp: React.FC = () => {
  // vendo o estado current do form
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  // redirecionar para o login quando cadastrar
  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleSubmit = useCallback(
    async (data: signUpFormData) => {
      try {
        // zerar os errors para quando corrigir no input de novo
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().required('Email obrigatoŕio').email(),
          password: Yup.string().min(6, 'Mínimo de 6 dígitos'),
        });

        await schema.validate(data, { abortEarly: false });

        // requisicao para cadastrar na api
        await api.post('/users', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no GoBarber!',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // pegando as mensagens de error
          const errors = getValidationErrors(err);

          // caso encontre erros, seta nos errors
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <>
      <Container>
        <Background />
        <Content>
          <AnimationContainer>
            <img src={logoImg} alt="GoBarber" />

            <h1>Faça seu cadastro</h1>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="name" icon={FiUser} placeholder="Nome" />
              <Input name="email" icon={FiMail} placeholder="E-mail" />
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />

              <Button type="submit">Cadastrar</Button>
            </Form>

            <Link to="/">
              <FiArrowLeft />
              Voltar para login
            </Link>
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
};

export default SignUp;
