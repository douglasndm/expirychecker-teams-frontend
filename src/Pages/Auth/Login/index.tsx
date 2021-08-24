import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import Lottie from 'lottie-web';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button, ButtonText } from '../../../Components/Button/styles';

import CreateAccount from './CreateAccount';

import {
    Container,
    LogoContainer,
    LogoImage,
    LogoText,
    LogoLink,
    Content,
    FormContainer,
    LoginTitle,
    InputContainer,
    Input,
    AboutContainer,
    CreateAccountText,
    Text,
    Link,
} from './styles';

const Login: React.FC = () => {
    const history = useHistory();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isLogging, setIsLogging] = useState<boolean>(false);
    const [isCreateAccount, setIsCreateAccount] = useState(false);

    useEffect(() => {
        Lottie.loadAnimation({
            container: document.getElementById(
                'loading_button',
            ) as HTMLDivElement,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/Assets/Animations/loading.json',
        });
    }, []);

    const handleLogin = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setIsLogging(true);
            try {
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .email('O e-mail não é válido')
                        .required('Digite seu e-mail'),
                    password: Yup.string().required('Digite sua senha'),
                });

                await schema.validate({ email, password });

                toast('Entrando...');

                const { user } = await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password);

                const token = await user?.getIdTokenResult();

                localStorage.setItem('userToken', token?.token || '');

                history.push('/teams/list');
            } catch (err) {
                toast.error(err.message);
            } finally {
                setIsLogging(false);
            }
        },
        [email, history, password],
    );

    const handleOnEmailChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value.trim());
        },
        [],
    );

    const handleOnPasswordChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
        },
        [],
    );

    const handleSwitchCreateAccount = useCallback(() => {
        setIsCreateAccount(!isCreateAccount);
    }, [isCreateAccount]);

    return (
        <Container>
            <LogoContainer>
                <LogoLink href="https://douglasndm.dev/app/d130b6f1-85a6-446c-a842-8583ee0219bd">
                    <LogoImage
                        src={`${process.env.PUBLIC_URL}/Assets/Images/logo.png`}
                    />
                    <LogoText>Times</LogoText>
                </LogoLink>
            </LogoContainer>

            <Content>
                {isCreateAccount ? (
                    <CreateAccount />
                ) : (
                    <>
                        <FormContainer onSubmit={handleLogin}>
                            <LoginTitle>Entre na sua conta</LoginTitle>
                            <InputContainer>
                                <Input
                                    placeholder="E-mail"
                                    type="email"
                                    value={email}
                                    onChange={handleOnEmailChange}
                                />
                            </InputContainer>
                            <InputContainer>
                                <Input
                                    placeholder="Senha"
                                    type="password"
                                    value={password}
                                    onChange={handleOnPasswordChange}
                                />
                            </InputContainer>

                            <Button disabled={isLogging} isLoading={isLogging}>
                                {isLogging ? (
                                    <div id="loading_button" />
                                ) : (
                                    <ButtonText>Entrar</ButtonText>
                                )}
                            </Button>
                        </FormContainer>
                    </>
                )}

                <AboutContainer>
                    <CreateAccountText onClick={handleSwitchCreateAccount}>
                        {isCreateAccount
                            ? 'Já tem conta? Entre na sua conta'
                            : 'Novo aqui? Crie sua conta no aplicativo'}
                    </CreateAccountText>

                    <Text>
                        {`Ao usar este aplicativo você está aceitando nossos `}
                        <Link
                            href="https://douglasndm.dev/terms"
                            target="_blank"
                        >
                            Termos de uso
                        </Link>
                        {` e `}
                        <Link
                            href="https://douglasndm.dev/privacy"
                            target="_blank"
                        >
                            Política de Privacidade
                        </Link>
                        .
                    </Text>
                </AboutContainer>
            </Content>
        </Container>
    );
};

export default Login;
