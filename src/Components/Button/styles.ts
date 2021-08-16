import styled, { css } from 'styled-components';
import { darken } from 'polished';

interface ButtonProps {
    isLoading?: boolean;
}

export const Button = styled.button<ButtonProps>`
    cursor: pointer;
    align-items: center;
    align-self: center;
    padding: 22px;
    border-radius: 8px;
    margin: 15px 0;
    border: 0;
    background-color: #5856d6;
    transition: all 0.3s;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

    max-width: 100px;
    max-height: 75px;

    width: 80px;
    height: 60px;
    &:hover {
        background-color: ${darken(0.2, '#5856d6')};
    }

    ${props =>
        props.isLoading &&
        css`
            padding: 0;
        `}
`;

export const ButtonText = styled.span`
    color: #fff;
    text-align: center;
`;
