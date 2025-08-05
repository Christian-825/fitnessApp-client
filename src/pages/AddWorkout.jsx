import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import UserContext from '../context/UserContext';
import AddWorkoutForm from '../components/AddWorkoutForm';

export default function AddWorkout() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.token) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="container my-5">
     
      <div className="text-end">
        <NavLink to="/workouts" className="btn btn-sm btn-secondary mb-3">Go back</NavLink>
      </div>
      <AddWorkoutForm />
    </div>
  );
}
