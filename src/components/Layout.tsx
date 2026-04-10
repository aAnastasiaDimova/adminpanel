import { useState } from "react";
import {
  EventsIcon,
  ManagersIcon,
  SettingsIcon,
  UsersIcon,
} from "../assets/icons";
import * as S from "../styles/styles.bottomMenu";
import { Link, Outlet, useLocation } from "react-router-dom";
const ChevronLeft = () => <S.ChevronButton>{"<"}</S.ChevronButton>;
const ChevronRight = () => <S.ChevronButton>{">"}</S.ChevronButton>;
export const Layout = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const menuItems = [
    { path: "/users", label: "Пользователи", icon: <UsersIcon /> },
    { path: "/events", label: "Ивенты", icon: <EventsIcon /> },
    { path: "/managers", label: "Менеджеры", icon: <ManagersIcon /> },
    { path: "/settings", label: "Настройки", icon: <SettingsIcon /> },
  ];
  return (
    <>
      <Outlet />
      <S.Bottom>
        <S.BottomNav>
          {menuItems.map((item) => {
            return (
              <Link to={item.path} style={{ textDecoration: "none" }}>
                <S.NavItem
                  active={activeTab === item.path}
                  onClick={() => setActiveTab(item.path)}
                >
                  {item.icon}
                  {activeTab === item.path && <span>{item.label}</span>}
                </S.NavItem>
              </Link>
            );
          })}
        </S.BottomNav>
        <ChevronLeft />
        <ChevronRight />
      </S.Bottom>
    </>
  );
};
