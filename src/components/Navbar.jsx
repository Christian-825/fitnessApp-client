import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function Navbar() {
  const { token, clearToken } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark  p-3 shadow-sm">
      <Link className="navbar-brand fw-bold fs-4 text-light" to="/">🏋️‍♂️ FitnessApp</Link>
      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto d-flex align-items-center gap-3" style={{ listStyle: 'none' }}>
          {token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/workouts">Workouts</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/workouts/status">Progress</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/addWorkout">Add Workout</Link>
              </li>
              <li className="nav-item">
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => {
                    clearToken();
                    window.location.href = '/';
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link text-primary" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-primary" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
