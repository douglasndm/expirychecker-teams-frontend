import React, { useState, useCallback } from 'react';

import { Button, ButtonText } from '../../../../Components/Button/styles';

import { FormContainer, LoginTitle, InputContainer, Input } from '../styles';

const CreateAccount: React.FC = () => {
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');

    const handleNameChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
        [],
    );
    const handleLastNameChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value),
        [],
    );
    const handleEmailChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value.trim()),
        [],
    );

    const handlePasswordChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
        [],
    );

    const handlePasswordConfirmChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setPasswordConfirm(e.target.value),
        [],
    );

    const handleCreateAccount = useCallback(async () => {
        try {
            setIsCreating(true);
        } finally {
            setIsCreating(false);
        }
    }, []);
    return (
        <>
            <FormContainer onSubmit={handleCreateAccount}>
                <LoginTitle>Criar conta</LoginTitle>

                <InputContainer>
                    <Input
                        placeholder="Nome"
                        autoCapitalize="words"
                        value={name}
                        onChange={handleNameChange}
                    />
                </InputContainer>

                <InputContainer>
                    <Input
                        placeholder="Sobrenome"
                        autoCapitalize="words"
                        value={lastName}
                        onChange={handleLastNameChange}
                    />
                </InputContainer>

                <InputContainer>
                    <Input
                        placeholder="E-mail"
                        autoCapitalize="none"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </InputContainer>

                <InputContainer>
                    <Input
                        placeholder="Senha"
                        autoCapitalize="none"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </InputContainer>

                <InputContainer>
                    <Input
                        placeholder="Confirmação da senha"
                        autoCapitalize="none"
                        value={passwordConfirm}
                        onChange={handlePasswordConfirmChange}
                    />
                </InputContainer>

                <Button disabled={isCreating} isLoading={isCreating}>
                    <ButtonText>{isCreating ? 'Criando' : 'Criar'}</ButtonText>
                </Button>
            </FormContainer>
        </>
    );
};

export default CreateAccount;
