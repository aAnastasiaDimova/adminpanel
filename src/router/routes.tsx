import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import { Layout } from "../components/Layout";
import UsersPage from "../components/UsersPage";
import { useStore } from "../store/storeProvider";
import { useUser } from "../hooks/account/useUser";
import { Loader } from "../components/loader";
import AllEvents from "../components/AllEvents";

// eslint-disable-next-line react-refresh/only-export-components
const ProtectedRoute = () => {
  const { managerStore } = useStore();
  const { isLoading } = useUser();

  if (isLoading) return <Loader />;

  if (!managerStore.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const routes = [
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/users",
            element: <UsersPage />,
          },
          {
            path: "/events",
            element: <AllEvents />,
          },
          {
            path: "/events/:id",
            element: <div style={{ padding: "40px" }}>Редактровать ивент</div>,
          },
          {
            path: "/managers",
            element: <div style={{ padding: "40px" }}>Страница Менеджеры</div>,
          },
          {
            path: "/settings",
            element: <div style={{ padding: "40px" }}>Страница Настройки</div>,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
];
