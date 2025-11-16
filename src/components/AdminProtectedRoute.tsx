import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin-hasan');
    }
  }, [navigate]);

  const isAuth = localStorage.getItem('adminAuth');
  
  if (!isAuth) {
    return null;
  }

  return <>{children}</>;
}