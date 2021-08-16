import React, { useState, useCallback } from 'react';
import firebase from 'firebase';
import { toast } from 'react-toastify';

import { Container, Content, InputContainer, Input, Button } from './styles';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                const { user } = await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password);

                const token = await user?.getIdTokenResult();

                localStorage.setItem('userToken', token?.token || '');
            } catch (err) {
                toast.error(err.message);
            }
        },
        [email, password],
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

                    <Button type="submit">Entrar</Button>
                </Content>
            </form>
        </Container>
    );
};

export default Login;
