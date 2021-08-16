import React, { useState, useEffect, useCallback } from 'react';

import { toast } from 'react-toastify';
import Loading from '../../../Components/Loading';
import Button from '../../../Components/Button';

import {
    Container,
    Title,
    Content,
    EmptyText,
    ListTeamsTitle,
    ListTeams,
    ListItem,
    TeamItemContainer,
    TeamItemTitle,
    TeamItemRole,
    Footer,
} from './styles';

const List: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [teams, setTeams] = useState<Array<IUserRoles>>([]);
    const [selectedTeamRole, setSelectedTeamRole] = useState<IUserRoles | null>(
        null,
    );

    const [isManager, setIsManager] = useState<boolean>(false);

    const handleCreateTeam = useCallback(async () => {
        console.log('Create team');
    }, []);

    const handleLogout = useCallback(async () => {
        console.log('User logout');
    }, []);

    const handleNavigateToEnterCode = useCallback((userRole: IUserRoles) => {
        // navigate('EnterTeam', { userRole });
    }, []);

    const handleSetTeam = useCallback(
        (teamId: string) => {
            const selectedTeam = teams.find(t => t.team.id === teamId);

            if (!selectedTeam) {
                toast.error('Team not found');
                return;
            }

            setSelectedTeamRole(selectedTeam);
        },
        [teams],
    );

    interface renderProps {
        item: IUserRoles;
    }

    const renderCategory = useCallback(
        ({ item }: renderProps) => {
            const teamToNavigate = item.team.id;

            let role = item.role.toLowerCase();

            let isPending = true;

            if (item.status) {
                if (item.status.trim().toLowerCase() === 'completed') {
                    isPending = false;
                } else if (
                    item.status.trim().toLowerCase() !== 'completed' &&
                    role === 'manager'
                ) {
                    isPending = false;
                }
            } else if (role === 'manager') {
                isPending = false;
            }

            if (role === 'manager') {
                role = 'Gerente';
            }
            if (role === 'supervisor') {
                role = 'Supervisor';
            }
            if (role === 'repositor') {
                role = 'Repositor';
            }

            function handleNavigate() {
                if (item.team.active !== true) {
                    if (item.role.toLowerCase() !== 'manager') {
                        toast.error('O gerente precisa ativar o time.');
                        return;
                    }
                } else if (isPending) {
                    handleNavigateToEnterCode(item);
                    return;
                }
                handleSetTeam(teamToNavigate);
            }

            return (
                <TeamItemContainer
                    isPending={isPending || !item.team.active}
                    onClick={handleNavigate}
                >
                    <TeamItemTitle>{item.team.name}</TeamItemTitle>
                    <TeamItemRole>
                        {isPending
                            ? item.status.toUpperCase()
                            : role.toUpperCase()}
                    </TeamItemRole>
                </TeamItemContainer>
            );
        },
        [handleNavigateToEnterCode, handleSetTeam],
    );

    return isLoading ? (
        <Loading />
    ) : (
        <Container>
            <Title>Selecione um time</Title>

            <Content>
                {teams.length <= 0 && (
                    <EmptyText>
                        Você não está em nenhum time no momento
                    </EmptyText>
                )}
                {teams.length > 0 && <ListTeamsTitle>Times</ListTeamsTitle>}

                <ListTeams>
                    {teams.map(item => (
                        <ListItem key={item.team.id}>{item.team}</ListItem>
                    ))}
                </ListTeams>
            </Content>

            <Footer>
                {!isManager && (
                    <Button
                        text="Criar time"
                        onPress={handleCreateTeam}
                        contentStyle={{ width: 150, marginBottom: 0 }}
                    />
                )}

                <Button
                    text="Sair da conta"
                    onPress={handleLogout}
                    contentStyle={{ width: 150 }}
                />
            </Footer>
        </Container>
    );
};
export default List;
