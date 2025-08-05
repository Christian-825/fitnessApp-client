import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import UserContext from '../context/UserContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setNewToken } = useContext(UserContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post('/users/register', {
        email,
        password,
      });

      const loginRes = await api.post('/users/login', {
        email,
        password,
      });

      setNewToken(loginRes.data.access);
      navigate('/workouts');
    } catch (err) {
      
      if (err.response?.status === 400 || err.response?.status === 409) {
        const errorMessage = err.response.data?.message || err.response.data?.error || 'Email already registered';
        alert(errorMessage);
      } else {
        alert('Registration failed. Please try again later.');
      }
    }

  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 shadow-lg" style={{ maxWidth: '1000px', borderRadius: '20px', overflow: 'hidden' }}>
        
        {/* Left Column - Welcome Text */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-light p-5">
          <h1 className="display-4 fw-bold text-center">Join Us!</h1>
          <p className="lead text-center">Start tracking your workouts and reach your goals today.</p>
        </div>

        {/* Right Column - Register Form */}
        <div className="col-md-6 bg-transparent border border-secondary p-5">
          <form onSubmit={handleRegister}>
            <h2 className="mb-4 text-center">Register</h2>
            
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>


            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Register
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
