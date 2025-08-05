import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import UserContext from '../context/UserContext';

export default function Login() {
  const { setNewToken } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/login', { email, password });
      setNewToken(res.data.access);
      navigate('/');
    } catch (err) {
      alert('Invalid login');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 shadow-lg" style={{ maxWidth: '1000px', borderRadius: '20px', overflow: 'hidden' }}>
        
        {/* Left Column - Welcome Message or Image */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-light p-5 ">
          <h1 className="display-4 fw-bold text-center">Welcome!</h1>
          <p className="lead text-center">Log in or sign up to start your fitness journey.</p>
        </div>

        {/* Right Column - Login Form */}
        <div className="col-md-6 bg-transparent border border-secondary text-light p-5">
          <form onSubmit={handleLogin}>
            <h2 className="mb-4 text-center">Login</h2>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100 mb-3">Login</button>
            <p>Not a member? <Link to="/register" className="text-white text-decoration-underline">Register now!</Link></p>

          </form>
        </div>

      </div>
    </div>
  );
}
