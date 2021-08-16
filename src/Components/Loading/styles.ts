import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    background: ${props => props.theme.colors.background};
    justify-content: center;
`;

export const LoadingText = styled.span`
    color: ${props => props.theme.colors.text};
    margin-top: 15px;
    font-size: 28px;
    text-align: center;
`;
