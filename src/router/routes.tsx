import { Navigate, Outlet } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import UsersPage from '../components/UsersPage';


const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const routes = [
  {
    path: '/login',
    element: <LoginPage />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/users',
        element: <UsersPage />,
      },
      {
        path: '/events',
        element: <div style={{ padding: '40px' }}>Страница Ивенты</div>,
      },
      {
        path: '/managers',
        element: <div style={{ padding: '40px' }}>Страница Менеджеры</div>,
      },
      {
        path: '/settings',
        element: <div style={{ padding: '40px' }}>Страница Настройки</div>,
      },
      {
        path: '/',                   
        element: <Navigate to="/users" replace />,
      },
    ],
  },

  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
];