import React, { useState } from 'react';
import { teamService } from '../services/api';

function AddTeam({ onTeamAdded }) {
  const [teamData, setTeamData] = useState({
    name: '',
    captain: '',
    players: '',
    matches_played: 0,
    matches_won: 0
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Format players as array
    const formattedData = {
      ...teamData,
      players: teamData.players.split(',').map(player => player.trim())
    };
    
    try {
      const result = await teamService.createTeam(formattedData);
      setLoading(false);
      setTeamData({
        name: '',
        captain: '',
        players: '',
        matches_played: 0,
        matches_won: 0
      });
      if (onTeamAdded) onTeamAdded(result);
    } catch (error) {
      console.error('Error creating team:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add New Team</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Team Name:</label>
          <input 
            type="text" 
            name="name" 
            value={teamData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Captain:</label>
          <input 
            type="text" 
            name="captain" 
            value={teamData.captain} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Players (comma separated):</label>
          <input 
            type="text" 
            name="players" 
            value={teamData.players} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Team'}
        </button>
      </form>
    </div>
  );
}

export default AddTeam;