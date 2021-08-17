import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import Lottie from 'lottie-web';
import { toast } from 'react-toastify';

import { Button, ButtonText } from '../../../Components/Button/styles';

import Footer from './Footer';

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
} from './styles';

const Login: React.FC = () => {
    const history = useHistory();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isLogging, setIsLogging] = useState<boolean>(false);

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
                const { user } = await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password);

                const token = await user?.getIdTokenResult();

                localStorage.setItem('userToken', token?.token || '');

                toast('Entrando...');

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
            setEmail(e.target.value);
        },
        [],
    );

    const handleOnPasswordChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
        },
        [],
    );

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
                <FormContainer>
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

                <Footer />
            </Content>
        </Container>
    );
};

export default Login;
