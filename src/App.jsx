import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { UserProvider } from './context/UserContext';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddWorkout from './pages/AddWorkout';
import Workouts from './pages/Workouts';
import UpdateWorkout from './pages/UpdateWorkout';
import WorkoutStatus from './pages/WorkoutStatus';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const setNewToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = () => !!token;

  return (
    <UserProvider value={{ token, setNewToken, clearToken, isAuthenticated }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addWorkout" element={<AddWorkout />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/updateWorkout/:id" element={<UpdateWorkout />} />
        <Route path="/workouts/status" element={<WorkoutStatus />} />

      </Routes>
    </UserProvider>
  );
}

export default App;
