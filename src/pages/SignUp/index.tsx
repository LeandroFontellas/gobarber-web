import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup'; // validador
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});
        // schema de validacao
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Minimo 6 digitos'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastrado realizado!',
          description: 'Você já pode fazer seu logon no GoBarber',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const getErrors = getValidationErrors(error);
          formRef.current?.setErrors(getErrors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: ' Ocorreu um erro ao fazer o cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{ name: 'leandro' }}
          >
            <h1>Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input
              name="email"
              icon={FiMail}
              type="email"
              placeholder="E-mail"
            />
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
  );
};

export default SignUp;
