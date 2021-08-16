import api from '../../Services/API';

interface APIOrganizedUser {
    id: string;
    email: string;
    roles: {
        role: 'manager' | 'supervisor' | 'repositor';
        status: 'pending' | 'completed';
        team: {
            id: string;
            name: string;
            isActive: boolean;
        };
    }[];
}

export async function getUserTeams(): Promise<Array<IUserRoles>> {
    const response = await api.get<APIOrganizedUser>(`/users`);

    if (response.data) {
        const userRoles: Array<IUserRoles> = response.data.roles.map(role => ({
            role: role.role,
            status: role.status,
            team: {
                id: role.team.id,
                name: role.team.name,
                active: role.team.isActive === true,
            },
        }));

        return userRoles;
    }

    return [];
}

interface getAllUsersFromTeamProps {
    team_id: string;
}

export async function getAllUsersFromTeam({
    team_id,
}: getAllUsersFromTeamProps): Promise<Array<IUserInTeam>> {
    const response = await api.get<Array<IUserInTeam>>(
        `/team/${team_id}/users`,
    );

    return response.data;
}

interface putUserInTeamProps {
    user_email: string;
    team_id: string;
}

interface putUserInTeamResponse {
    id: string;
    user: IUser;
    role: string;
    code: string;
    status: string;
}

export async function putUserInTeam({
    user_email,
    team_id,
}: putUserInTeamProps): Promise<putUserInTeamResponse> {
    const response = await api.post<putUserInTeamResponse>(
        `/team/${team_id}/manager/user`,
        {
            email: user_email,
        },
    );

    return response.data;
}

interface enterTeamCode {
    code: string;
    team_id: string;
}

export async function enterTeamCode({
    code,
    team_id,
}: enterTeamCode): Promise<void> {
    try {
        await api.post<putUserInTeamResponse>(`/team/${team_id}/join`, {
            code,
        });
    } catch (err) {
        if (err.message === 'Network Error') {
            throw new Error(err);
        } else if (err.response.data.message === 'Code is not valid') {
            throw new Error('Código inválido');
        } else {
            throw new Error(err);
        }
    }
}

interface removeUserFromTeamProps {
    team_id: string;
    user_id: string;
}

export async function removeUserFromTeam({
    team_id,
    user_id,
}: removeUserFromTeamProps): Promise<void> {
    await api.delete(`/team/${team_id}/manager/user/${user_id}`);
}
