import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import UserContext from '../context/UserContext';

export default function AddWorkoutForm() {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const res = await api.get('/users/details', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userId = res.data._id;

      await api.post(`/workouts`, {
        name,
        duration,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Workout added');
      navigate('/workouts');
    } catch (err) {
      alert('Failed to add workout');
    }
  };

  return (
    <div className="container mb-5 d-flex flex-column align-items-center" style={{ minHeight: '80vh' }}>
      
      <form onSubmit={handleAdd} className="card shadow-lg p-5 rounded-2 bg-transparent border-light" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="mb-4 text-center text-light">Add Workout</h2>
        <div className="mb-3">
          <label htmlFor="workoutName" className="form-label text-light">Workout Name</label>
          <input
            type="text"
            className="form-control"
            id="workoutName"
            placeholder="e.g., Push Ups"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="duration" className="form-label text-light">Duration (minutes)</label>
          <input
            type="number"
            className="form-control"
            id="duration"
            placeholder="e.g., 30"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            required
            min="1"
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary rounded-pill p-2">
            Add Workout
          </button>
        </div>
      </form>
    </div>
  );
}
