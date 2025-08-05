import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function Home() {
  const { token } = useContext(UserContext);

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100 flex-column flex-md-row">

        {/* Left Panel: View workout status */}
        <div className="order-2 col-md-5 d-flex flex-column align-items-center justify-content-center border-md-end border-secondary shadow-lg text-white py-5 px-4">
          <div className="text-center">
            <i className="bi bi-person-circle mb-3" style={{ fontSize: '4rem', color: '#0d6efd' }}></i>
          </div>

          <div className="w-100" style={{ maxWidth: '400px' }}>
            {token ? (
              <Link to="/workouts/status" className="btn btn-primary btn-lg w-100 rounded-pill mb-3">
                ⏳ View Progress
              </Link>
            ) : (
              <Link to="/login" className="btn btn-success btn-lg w-100 rounded-pill mb-3">
                🔐 Login
              </Link>
            )}

            <Link to="/workouts" className="btn btn-outline-light btn-lg w-100 rounded-pill">
              📝 View Workouts
            </Link>
          </div>
        </div>

        {/* Right Panel: Welcome Message */}
        <div className="order-1 col-md-7 d-flex align-items-center justify-content-center text-white text-center text-md-end py-5 px-4">
          <div>
            {token ? (
              <>
                <h1 className="display-2 fw-bold">Hi, Champ!</h1>
                <p className="fs-5 text-light">
                  Glad to see you back. Let’s crush another workout today!
                </p>
              </>
            ) : (
              <>
                <h1 className="display-2 fw-bold">Welcome.</h1>
                <p className="fs-5 text-light">
                  Start logging your workouts, stay consistent, and reach your goals.
                </p>
                <p className="mt-3">
                  Not a member?{' '}
                  <Link to="/register" className="text-white text-decoration-underline">
                    Register now
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
