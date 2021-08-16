import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    flex: 1;
    display: flex;
    background-color: #fff;

    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 45vw;
    height: 100vh;
    justify-content: center;
    padding: 5%;
    background-color: #ededed;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

export const InputContainer = styled.div`
    display: flex;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 12px;
`;

export const Input = styled.input`
    flex: 1;
    border: 0;
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
