import React, { useMemo } from 'react';

import { useTeam } from '../../../Contexts/TeamContext';
import Subscriptions from './Components/Subscriptions';

import {
    Container,
    PageContent,
    PageHeader,
    PageTitle,
    TeamHeaderContainer,
    TeamName,
} from './styles';

const View: React.FC = () => {
    const teamContext = useTeam();

    const isManager = useMemo(() => {
        if (teamContext.id) {
            if (teamContext.roleInTeam?.role.toLowerCase() === 'manager') {
                return true;
            }
        }
        return false;
    }, [teamContext.id, teamContext.roleInTeam]);

    return (
        <Container>
            <PageHeader>
                <PageTitle>Detalhes do time</PageTitle>
            </PageHeader>

            <PageContent>
                <TeamHeaderContainer>
                    <TeamName>{teamContext.name}</TeamName>
                </TeamHeaderContainer>

                {isManager && <Subscriptions />}
            </PageContent>
        </Container>
    );
};

export default View;
