
import { useNavigate } from 'react-router-dom';

const useAuthService = () => {
  const navigate = useNavigate();

  const handleUnauthorized = () => {
    navigate('/login');
  };

  return { handleUnauthorized };
};

export default useAuthService;
