import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import UserContext from '../context/UserContext';

export default function UpdateWorkout() {
  const { id } = useParams(); // Workout ID from URL
  const { token } = useContext(UserContext);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();

  // Fetch current workout details
  const fetchWorkout = async () => {
    try {
      const res = await api.get('/workouts', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Find the workout by ID
      const workout = res.data.workouts.find(w => w._id === id);

      if (!workout) {
        alert('Workout not found');
        return navigate('/workouts');
      }

      setName(workout.name);
      setDuration(workout.duration);
    } catch (err) {
      console.error('Failed to fetch workout:', err);
      alert('Could not load workout details.');
      navigate('/workouts');
    }
  };

  useEffect(() => {
    if (token) {
      fetchWorkout();
    } else {
      navigate('/login');
    }
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/workouts/${id}`, { name, duration }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Workout updated!');
      navigate('/workouts');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update workout.');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this workout?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/workouts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Workout deleted successfully.');
      navigate('/workouts');
    } catch (err) {
      console.error('Failed to delete workout:', err);
      alert('Failed to delete workout.');
    }
  };

  return (
    <div className="container my-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg p-5 rounded-2 bg-transparent border-light" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-light mb-5">Update Workout</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label text-light">Workout Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-light">Duration (minutes)</label>
            <input
              type="number"
              className="form-control"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success px-4">Update</button>
            <button
              type="button"
              className="btn btn-danger px-4"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
