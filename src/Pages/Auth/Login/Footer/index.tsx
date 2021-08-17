import React from 'react';

import { AboutContainer, CreateAccountText, Text, Link } from './styles';

const Footer: React.FC = () => (
    <AboutContainer>
        <CreateAccountText href="https://douglasndm.dev/app/d130b6f1-85a6-446c-a842-8583ee0219bd">
            Novo aqui? Crie sua conta no aplicativo
        </CreateAccountText>

        <Text>
            {`Ao usar este aplicativo você está aceitando nossos `}
            <Link href="https://douglasndm.dev/terms" target="_blank">
                Termos de uso
            </Link>
            {` e `}
            <Link href="https://douglasndm.dev/privacy" target="_blank">
                Política de Privacidade
            </Link>
            .
        </Text>
    </AboutContainer>
);

export default Footer;
