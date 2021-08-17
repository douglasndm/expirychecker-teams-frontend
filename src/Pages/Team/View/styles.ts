import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: #f6f6f6;
    padding: 2% 3%;
`;

export const PageHeader = styled.header`
    flex-direction: row;
`;

export const PageTitle = styled.h1`
    font-size: 28px;
    font-weight: bold;
    font-family: 'Open Sans', sans-serif;
`;

export const PageContent = styled.div`
    padding: 15px 16px 100px;
`;

export const TeamHeaderContainer = styled.div`
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const TeamName = styled.h2`
    font-family: 'Open Sans', sans-serif;
    font-size: 23px;
    font-weight: bold;
    flex: 1;
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    padding: 20px 15px;
    border-radius: 12px;
    margin-bottom: 15px;
`;

export const SectionTitle = styled.h3`
    font-family: 'Open Sans', sans-serif;
    font-size: 21px;
    font-weight: bold;
`;

export const SubscriptionDescription = styled.span`
    margin-top: 10px;
    font-family: 'Open Sans', sans-serif;
`;
