import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Logout } from 'Utils/Account/Login';
import { useAuth } from '../../../Contexts/AuthContext';
import { useTeam } from '../../../Contexts/TeamContext';

import { getUserTeams } from '../../../Utils/Team/Users';
import { setSelectedTeam } from '../../../Utils/Team/SelectedTeam';

import Loading from '../../../Components/Loading';
import { Button, ButtonText } from '../../../Components/Button/styles';

import {
    Container,
    Title,
    Content,
    EmptyText,
    ListTeamsTitle,
    ListTeams,
    TeamItemContainer,
    TeamItemTitle,
    TeamItemRole,
    Footer,
} from './styles';

const List: React.FC = () => {
    const history = useHistory();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { user } = useAuth();
    const teamContext = useTeam();

    const [teams, setTeams] = useState<Array<IUserRoles>>([]);
    const [_, setSelectedTeamRole] = useState<IUserRoles | null>(null);

    const [isManager, setIsManager] = useState<boolean>(false);

    const loadData = useCallback(async () => {
        if (!teamContext.isLoading) {
            try {
                setIsLoading(true);

                if (!user) {
                    return;
                }

                const response = await getUserTeams();

                response.forEach(item => {
                    if (item.role.toLowerCase() === 'Manager'.toLowerCase()) {
                        setIsManager(true);
                    }
                });

                const sortedTeams = response.sort((team1, team2) => {
                    if (team1.team.active && !team2.team.active) {
                        return 1;
                    }
                    if (team1.team.active && team2.team.active) {
                        return 0;
                    }
                    return -1;
                });

                setTeams(sortedTeams);
            } catch (err) {
                toast.error(err.message);
            } finally {
                setIsLoading(false);
            }
        }
    }, [teamContext.isLoading, user]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleCreateTeam = useCallback(async () => {
        console.log('Create team');
    }, []);

    const handleLogout = useCallback(async () => {
        await Logout();
        history.push('/');
    }, [history]);

    const handleSetTeam = useCallback(
        (teamId: string) => {
            const selectedTeam = teams.find(t => t.team.id === teamId);

            if (!selectedTeam) {
                toast.error('Team not found');
                return;
            }
            setSelectedTeam(selectedTeam);
            setSelectedTeamRole(selectedTeam);
            if (teamContext.reload) teamContext.reload();

            history.push('/team');
        },
        [history, teamContext, teams],
    );

    interface renderProps {
        userRole: IUserRoles;
    }

    const TeamItem = useCallback(
        ({ userRole }: renderProps) => {
            const teamToNavigate = userRole.team.id;

            let role = userRole.role.toLowerCase();

            let isPending = true;

            if (userRole.status) {
                if (userRole.status.trim().toLowerCase() === 'completed') {
                    isPending = false;
                } else if (
                    userRole.status.trim().toLowerCase() !== 'completed' &&
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
                if (userRole.team.active !== true) {
                    if (userRole.role.toLowerCase() !== 'manager') {
                        toast.error('O gerente precisa ativar o time.');
                        return;
                    }
                } else if (isPending) {
                    toast.warning(
                        'Entre no aplicativo pelo celular para concluir o processo para entrar no time',
                    );

                    return;
                }
                handleSetTeam(teamToNavigate);
            }

            return (
                <TeamItemContainer
                    isPending={isPending || !userRole.team.active}
                    onClick={handleNavigate}
                >
                    <TeamItemTitle>{userRole.team.name}</TeamItemTitle>
                    <TeamItemRole>
                        {isPending
                            ? userRole.status.toUpperCase()
                            : role.toUpperCase()}
                    </TeamItemRole>
                </TeamItemContainer>
            );
        },
        [handleSetTeam],
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
                        <TeamItem key={item.team.id} userRole={item} />
                    ))}
                </ListTeams>
            </Content>

            <Footer>
                {!isManager && (
                    <Button
                        onClick={handleCreateTeam}
                        style={{ width: 150, marginBottom: 0 }}
                    >
                        <ButtonText>Criar time</ButtonText>
                    </Button>
                )}

                <Button
                    onClick={handleLogout}
                    style={{ width: 150, marginBottom: 15 }}
                >
                    <ButtonText>Sair da conta</ButtonText>
                </Button>
            </Footer>
        </Container>
    );
};
export default List;
