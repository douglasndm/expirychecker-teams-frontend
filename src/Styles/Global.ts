import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    input:focus, textarea:focus, select:focus{
        outline: none;
    }
`;
