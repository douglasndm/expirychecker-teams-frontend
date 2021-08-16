export function getSelectedTeam(): IUserRoles | null {
    const selectedTeamAsString = localStorage.getItem('selectedTeam');

    if (!selectedTeamAsString) {
        return null;
    }
    const selectedTeam: IUserRoles = JSON.parse(selectedTeamAsString);

    return selectedTeam;
}

export function setSelectedTeam(userRole: IUserRoles): void {
    localStorage.setItem('selectedTeam', JSON.stringify(userRole));
}

export function clearSelectedteam(): void {
    localStorage.removeItem('selectedTeam');
}
