import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import UserContext from '../context/UserContext';

export default function StatusPage() {
  const { token } = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  const fetchWorkouts = async () => {
    try {
      const res = await api.get('/workouts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkouts(res.data.workouts || res.data); // Depending on your backend structure
    } catch (err) {
      console.error('Failed to fetch workouts', err);
      alert('Unable to fetch workouts.');
    }
  };

  const toggleStatus = async (id) => {
    try {
      await api.patch(`/workouts/completeWorkoutStatus/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchWorkouts(); // Refresh list
    } catch (err) {
      console.error('Failed to toggle workout status', err);
      alert('Unable to update workout status.');
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchWorkouts();
    }
  }, [token]);

  return (
    <div className="container my-5 ">
      <h2 className="text-primary mb-4">Workout Status</h2>

      {workouts.length === 0 ? (
        <p className="text-muted">No workouts found.</p>
      ) : (
        <div className="list-group">
          {workouts.map((workout) => (
            <div
              key={workout._id}
              className={`list-group-item bg-transparent shadow-lg text-light d-flex justify-content-between align-items-center ${
                workout.completed ? 'list-group-item-success' : ''
              }`}
            >
              <div>
                <strong>{workout.name}</strong> <br />
                <small>Duration: {workout.duration} mins</small>
              </div>
              <button
                className={`btn btn-sm fw-bold ${
                  workout.completed ? 'btn-outline-danger' : 'btn-outline-success'
                }`}
                onClick={() => toggleStatus(workout._id)}
              >
                {workout.completed ? 'Mark Incomplete ❌' : 'Mark Complete ✅'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
