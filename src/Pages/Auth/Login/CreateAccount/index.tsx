import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { createAccount } from 'Utils/Account/Create';

import { Button, ButtonText } from '../../../../Components/Button/styles';

import { FormContainer, LoginTitle, InputContainer, Input } from '../styles';

const CreateAccount: React.FC = () => {
    const history = useHistory();

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

    const handleCreateAccount = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const schema = Yup.object().shape({
                name: Yup.string().required('Digite o seu nome'),
                lastName: Yup.string().required('Digite seu sobrenome'),
                email: Yup.string()
                    .required('E-mail é obrigátio')
                    .email('E-mail inválido'),
                password: Yup.string().required('Digite a senha').min(6),
                passwordConfirm: Yup.string().oneOf(
                    [Yup.ref('password'), null],
                    'Confirmação da senha não corresponde a senha',
                ),
            });

            try {
                await schema.validate({
                    name,
                    lastName,
                    email,
                    password,
                    passwordConfirm,
                });
            } catch (err) {
                toast.error(err.errors[0]);
                return;
            }

            try {
                setIsCreating(true);

                const user = await createAccount({
                    name,
                    lastName,
                    email,
                    password,
                    passwordConfirm,
                });

                toast.info('Conta criada!');

                const token = await user?.getIdTokenResult();

                localStorage.setItem('userToken', token?.token || '');

                history.push('/teams/list');
            } catch (err) {
                toast.error(err.message);
            } finally {
                setIsCreating(false);
            }
        },
        [email, history, lastName, name, password, passwordConfirm],
    );
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
