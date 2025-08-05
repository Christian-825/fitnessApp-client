import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import UserContext from '../context/UserContext';

export default function Workouts() {
  const { token } = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  const fetchWorkouts = async () => {
    try {
      const res = await api.get('/workouts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Fetched workouts:', res.data); // Debug log
      setWorkouts(res.data.workouts);
    } catch (err) {
      console.error('Failed to fetch workouts:', err);
      alert('Failed to fetch workouts');
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchWorkouts();
    }
    console.log("Current token:", token);
  }, [token]);

  return (
    <div className="container-fluid py-5 px-3" style={{ minHeight: '100vh' }}>
      <div className="container text-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary">My Workouts</h2>
          <button
            className="btn btn-primary rounded-pill px-4"
            onClick={() => navigate('/addWorkout')}
          >
            + Add Workout
          </button>
        </div>

        {workouts.length === 0 ? (
          <div className="text-center text-muted">
            <p>No workouts yet.</p>
          </div>
        ) : (
          <div className="row">
            {workouts.map((w) => (
              <div className="col-md-6 col-lg-4 mb-4" key={w._id}>
                <div className="card bg-body-secondary text-light shadow h-100">
                  <div className="card-body shadow-lg">
                    <h5 className="card-title text-primary">{w.name}</h5>
                    <p className="card-text text-dark">Duration: {w.duration} minutes</p>
                    {/* Edit Workout Button */}
                            <button
                              className="btn btn-outline-info btn-sm mt-3"
                              onClick={() => navigate(`/UpdateWorkout/${w._id}`)}
                            >
                              ✏️ Edit
                            </button>                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
