import React from 'react';

import { Container, Content, InputContainer, Input, Button } from './styles';

const Login: React.FC = () => (
    <Container>
        <form>
            <Content>
                <InputContainer>
                    <Input placeholder="Digite seu e-mail" value="asdasd" />
                </InputContainer>
                <InputContainer>
                    <Input placeholder="Digite sua senha" type="password" />
                </InputContainer>

                <Button>Entrar</Button>
            </Content>
        </form>
    </Container>
);

export default Login;
