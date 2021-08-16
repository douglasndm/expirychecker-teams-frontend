import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import Lottie from 'lottie-web';
import { toast } from 'react-toastify';

import { Button, ButtonText } from '../../../Components/Button/styles';

import { Container, Content, InputContainer, Input } from './styles';

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
            <form onSubmit={handleLogin}>
                <Content>
                    <InputContainer>
                        <Input
                            placeholder="Digite seu e-mail"
                            type="email"
                            value={email}
                            onChange={handleOnEmailChange}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            placeholder="Digite sua senha"
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
                </Content>
            </form>
        </Container>
    );
};

export default Login;
