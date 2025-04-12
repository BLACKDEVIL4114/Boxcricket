getAllTeams: async () => {
    const response = await fetch(`${API_URL}/api/teams`);
    return response.json();
}