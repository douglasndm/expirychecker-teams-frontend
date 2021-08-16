import styled from 'styled-components';
import { darken } from 'polished';

export const Button = styled.button`
    cursor: pointer;
    align-items: center;
    align-self: center;
    padding: 22px;
    border-radius: 12px;
    margin: 15px 0;
    border: 0;
    background-color: #5856d6;
    transition: all 0.3s;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

    &:hover {
        background-color: ${darken(0.2, '#5856d6')};
    }
`;

export const ButtonText = styled.span`
    color: #fff;
    text-align: center;
`;
