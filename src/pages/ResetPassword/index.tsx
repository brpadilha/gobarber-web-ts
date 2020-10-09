import React, { useCallback, useRef } from 'react';

import { FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useHistory, useLocation } from 'react-router-dom';

import * as Yup from 'yup';
import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationConatiner } from './styles';
import api from '../../services/api';

interface ResetPasswordData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  // vendo o estado current do form
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  // para pegar o token do usuário no link
  const location = useLocation();

  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleSubmit = useCallback(
    async (data: ResetPasswordData) => {
      try {
        // zerar os errors para quando corrigir no input de novo
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        const { password, password_confirmation } = data;

        // limpando o token
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push('/');
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
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
        });
      }
    },

    // toda variável externa devemos utilizar aqui
    [addToast, history, location],
  );

  return (
    <>
      <Container>
        <Content>
          <AnimationConatiner>
            <img src={logoImg} alt="GoBarber" />

            <Form onSubmit={handleSubmit} ref={formRef}>
              <h1>Resetar senha</h1>

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
                placeholder="Confirmação da senha"
              />

              <Button type="submit">Alterar senha</Button>
            </Form>
          </AnimationConatiner>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default ResetPassword;
