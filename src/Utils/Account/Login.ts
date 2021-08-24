import Firebase from 'firebase';

export async function Logout(): Promise<void> {
    localStorage.removeItem('userToken');
    localStorage.removeItem('selectedTeam');
    await Firebase.auth().signOut();
}
