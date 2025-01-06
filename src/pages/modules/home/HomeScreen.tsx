import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth/useUser';

const HomeScreen = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    } else if (!authLoading && isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, authLoading, navigate]);

  return (
    <div className="bg-light" data-testid="home-screen">
      <button className="btn btn-neutral">hola</button>
      <button className="btn btn-neutral">Home</button>
    </div>
  );
};

export default HomeScreen;
