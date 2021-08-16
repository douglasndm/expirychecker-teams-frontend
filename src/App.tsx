import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './Services/Firebase';

import { AuthProvider } from './Contexts/AuthContext';
import { TeamProvider } from './Contexts/TeamContext';

import Routes from './routes';

import GlobalStyles from './Styles/Global';

const App: React.FC = () => (
    <>
        <GlobalStyles />
        <AuthProvider>
            <TeamProvider>
                <Routes />
            </TeamProvider>
        </AuthProvider>
        <ToastContainer />
    </>
);

export default App;
