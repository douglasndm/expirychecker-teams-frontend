import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './Services/Firebase';

import Routes from './routes';

import GlobalStyles from './Styles/Global';

const App: React.FC = () => (
    <>
        <GlobalStyles />
        <Routes />
        <ToastContainer />
    </>
);

export default App;
