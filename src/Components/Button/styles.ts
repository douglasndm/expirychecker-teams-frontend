import styled from 'styled-components';

export const Button = styled.button`
    align-items: center;
    align-self: center;
    padding: 22px;

    background-color: ${props => props.theme.colors.accent};
    border-radius: 12px;
    margin: 15px 0;
`;

export const ButtonText = styled.span`
    color: #fff;
    text-align: center;
`;
