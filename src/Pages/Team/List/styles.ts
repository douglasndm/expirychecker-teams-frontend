import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    flex: 1;
    height: 100vh;
    padding: 16px 10px 5px 10px;
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;
`;

export const Title = styled.span`
    font-size: 26px;
    margin-left: 10px;
    font-family: 'Open Sans';
    font-weight: bold;
`;

export const Content = styled.div`
    flex: 1;
`;

export const EmptyText = styled.span`
    font-family: 'Open Sans';
    font-size: 14px;
    margin: 10px 15px 0;
`;

export const ListTeamsTitle = styled.span`
    margin: 15px 15px 0;
    font-size: 18px;
    font-family: 'Open Sans';
`;

export const ListTeams = styled.ul`
    margin: 0 10px;
    margin-top: 10px;
    display: flex;
`;

interface TeamItemContainerProps {
    isPending?: boolean;
}

export const TeamItemContainer = styled.button<TeamItemContainerProps>`
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 12px;

    flex-direction: row;
    justify-content: space-between;

    flex: 1;
    border: 0;
    display: flex;

    transition: all 0.2s;

    &:hover {
        cursor: pointer;

        background-color: ${darken(0.2, '#ffffff')};
    }

    ${props =>
        props.isPending &&
        css`
            background-color: ${darken(0.13, '#ffffff')};
        `}
`;

export const TeamItemTitle = styled.span`
    font-size: 18px;
`;

export const TeamItemRole = styled.span`
    font-size: 15px;
`;

export const Footer = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
