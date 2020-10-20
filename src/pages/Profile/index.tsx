import React, { useCallback, useRef } from 'react';

import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

// useHistory é para redirecionar para a pagina de login depois de fazer o cadastro pelo componente
import { Link, useHistory } from 'react-router-dom';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

// se conseguir cadastrar toast de success
import { useToast } from '../../hooks/toast';

import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hooks/auth';

interface signUpFormData {
  name: string;
  email: string;
  passowrd: string;
}

const Profile: React.FC = () => {
  const { addToast } = useToast();

  // vendo o estado current do form
  const formRef = useRef<FormHandles>(null);
  // redirecionar para o login quando cadastrar
  const history = useHistory();

  const { user } = useAuth();

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
        <header>
          <div>
            <Link to="/dashboard">
              <FiArrowLeft />
            </Link>
          </div>
        </header>

        <Content>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              name: user.name,
              email: user.email,
            }}
          >
            <AvatarInput>
              <img
                src="https://avatars0.githubusercontent.com/u/37818334?s=460&u=e20caeb3543058fc044ad564275f8777aeb512ad&v=4"
                alt={user.name}
              />
              <button type="button">
                <FiCamera />
              </button>
            </AvatarInput>
            <h1>Meu perfil</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              containerStyle={{ marginTop: 24 }}
              name="old_password"
              icon={FiLock}
              type="password"
              placeholder="Senha atual"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmar senha"
            />

            <Button type="submit">Confirmar mudanças</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Profile;
