import Firebase from 'firebase';

import api from '../../Services/API';

interface createAccountProps {
    name: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export async function createAccount({
    name,
    lastName,
    email,
    password,
    passwordConfirm,
}: createAccountProps): Promise<Firebase.User> {
    if (password !== passwordConfirm) {
        throw new Error('Password confirmation is invalid');
    }

    const { user } = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password,
    );

    if (!user) {
        throw new Error('Error while creating account');
    }

    await user.sendEmailVerification();

    await user.updateProfile({
        displayName: `${name} ${lastName}`,
    });

    await api.post<IUser>('/users', {
        firebaseUid: user.uid,
        email,
    });

    return user;
}
