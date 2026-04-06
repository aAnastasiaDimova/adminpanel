import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

import {
  UsersIcon,
  EventsIcon,
  ManagersIcon,
  SettingsIcon,
} from '../assets/icons';

const BottomNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: Inter;
`;

const BottomNavStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 5px 7px;
  background: #007aff;
  border-radius: 99px;
  max-width: 345px;
`;

const NavItem = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  background: ${(props) => (props.active ? '#ffffff' : '#007AFF')};
  color: ${(props) => (props.active ? '#007AFF' : '#ffffff')};
  min-width: ${(props) => (props.active ? '160px' : '52px')};
`;

const ChevronButton = styled.button`
  width: 54px;
  height: 54px;
  background: #007aff;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 24px;
  font-weight: 500;
`;



interface BottomNavProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, totalPages, onPageChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/users', label: 'Пользователи', icon: <UsersIcon /> },
    { path: '/events', label: 'Ивенты', icon: <EventsIcon /> },
    { path: '/managers', label: 'Менеджеры', icon: <ManagersIcon /> },
    { path: '/settings', label: 'Настройки', icon: <SettingsIcon /> },
  ];

  return (
    <BottomNavContainer>
      <BottomNavStyled>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavItem
              key={item.path}
              active={isActive}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              {isActive && <span>{item.label}</span>}
            </NavItem>
          );
        })}
      </BottomNavStyled>


      <ChevronButton 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        &lt;
      </ChevronButton>

      <ChevronButton 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        &gt;
      </ChevronButton>
    </BottomNavContainer>
  );
};

export default BottomNav;