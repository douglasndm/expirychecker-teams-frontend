import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    flex: 1;
    display: flex;
    background-color: #5856d6;

    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: stretch;
`;

export const LogoContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const LogoImage = styled.img`
    width: 250px;
    height: 250px;
`;

export const LogoText = styled.h1`
    font-family: 'Open Sans', sans-serif;
    font-size: 36px;
    text-transform: uppercase;
    color: #ffffff;
    text-align: center;
`;

export const LogoLink = styled.a`
    text-decoration: none;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 50vw;
    height: 100vh;
    justify-content: space-between;
    padding: 5%;
    background-color: #f6f6f6;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

export const FormContainer = styled.form`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const LoginTitle = styled.h2`
    font-family: 'Open Sans', sans-serif;
    font-size: 28px;
    margin-bottom: 15px;
    font-weight: 400;
`;

export const InputContainer = styled.div`
    width: 100%;
    display: flex;
    background-color: #ffffff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
`;

export const Input = styled.input`
    flex: 1;
    border: 0;
    background-color: #ffffff;
    padding: 5px;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
`;

export const Button = styled.button`
    margin-top: 10px;
    align-self: center;
    padding: 15px 25px;
    border-radius: 8px;
    border: 0;
    background-color: #5856d6;
    color: #fff;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        background-color: ${darken(0.2, '#5856d6')};
    }
`;

export const AboutContainer = styled.div`
    margin: 30px 15px;
    display: flex;
    flex-direction: column;
    text-align: center;
`;
export const Text = styled.span`
    text-align: center;
    font-size: 14px;
    font-family: 'Open Sans', sans-serify;
`;

export const CreateAccountText = styled.a`
    margin-bottom: 15px;
    color: #5856d6;
    font-family: 'Open Sans';
    font-weight: bold;
    font-size: 15px;
    text-decoration: none;
    font-family: 'Open Sans', sans-serif;
    cursor: pointer;
`;

export const Link = styled.a`
    font-size: 14px;
    color: #5856d6;
    text-decoration: none;
    font-family: 'Open Sans', sans-serify;
    font-weight: bold;
`;
