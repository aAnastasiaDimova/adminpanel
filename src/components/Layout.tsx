import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Icon from "../assets/Icon.svg"; 
import {
  UsersIcon,
  EventsIcon,
  ManagersIcon,
  SettingsIcon,
} from '../assets/icons';

const LayoutContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const SidebarContainer = styled.div`
  width: 214px;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #09090B;
  padding-bottom: 12px;
  padding-left: 16px;
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NavItem = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${(props) => (props.active ? '#ffffff' : '#007aff')};
  background: ${(props) => (props.active ? '#007aff' : 'transparent')};
  width: 100%;
  text-align: left;

  svg {
    width: 24px;
    height: 24px;
    color: ${(props) => (props.active ? '#ffffff' : '#007AFF')};
  }
`;

const BottomUser = styled.div`
  margin-top: auto;
  padding: 54px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: #09090B;
`;

const UserIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const Content = styled.div`
  margin-left: 214px;
  
`;

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/users', label: 'Пользователи', icon: <UsersIcon /> },
    { path: '/events', label: 'Ивенты', icon: <EventsIcon /> },
    { path: '/managers', label: 'Менеджеры', icon: <ManagersIcon /> },
    { path: '/settings', label: 'Настройки', icon: <SettingsIcon /> },
  ];

  const currentPath = location.pathname;

  return (
    <LayoutContainer>
      <SidebarContainer>
        <Logo>ПАЗЛ&КОД</Logo>
        <NavList>
          {menuItems.map((item) => (
            <NavItem
              key={item.path}
              active={currentPath === item.path}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavItem>
          ))}
        </NavList>
        <BottomUser>
          <UserIcon src={Icon}/>
          <span>Alicia Koch</span>
        </BottomUser>
      </SidebarContainer>
      <Content>
        <Outlet />
      </Content>
    </LayoutContainer>
  );
};

export default Layout;