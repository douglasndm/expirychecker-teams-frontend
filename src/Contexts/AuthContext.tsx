import React, {
    useState,
    useEffect,
    useCallback,
    createContext,
    useContext,
} from 'react';
import Firebase from 'firebase';

import api from '../Services/API';

interface AuthContextData {
    user: Firebase.User | null;
    token: string | null;
    signed: boolean;
    initializing: boolean;
}

const AuthContext = createContext<Partial<AuthContextData>>({});

const AuthProvider: React.FC = ({ children }: any) => {
    const [initializing, setInitializing] = useState(true);

    const [isSigned, setIsSigned] = useState<boolean>(false);
    const [user, setUser] = useState<Firebase.User | null>(null);

    const onAuthStateChanged = useCallback(
        async (loggedUser: Firebase.User | null) => {
            if (loggedUser) {
                setUser(loggedUser);
                setIsSigned(true);

                if (!loggedUser.email) {
                    throw new Error('Email is required');
                }

                const token = await loggedUser.getIdToken();

                api.defaults.headers.common.Authorization = `Baerer ${token}`;
            } else {
                setIsSigned(false);
                setUser(null);
            }

            setInitializing(false);
        },
        [],
    );

    const onUserChanged = useCallback((changedUser: Firebase.User | null) => {
        if (changedUser) {
            setUser(changedUser);
        }
    }, []);

    // useEffect(() => {
    //     const subscriber = Firebase.auth().onUserChanged(onUserChanged);

    //     return subscriber;
    // }, []);

    useEffect(() => {
        const subscriber =
            Firebase.auth().onAuthStateChanged(onAuthStateChanged);

        return subscriber;
    }, []);

    return (
        <AuthContext.Provider value={{ signed: isSigned, user, initializing }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): Partial<AuthContextData> {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
