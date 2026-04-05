import React, { useState } from 'react';
import styled from '@emotion/styled';

import SearchIconSrc from "../assets/search.svg";
import PlusIconSrc from "../assets/plus.svg";

import {
  FilterIcon,
  UsersIcon,
  EventsIcon,
  ManagersIcon,
  SettingsIcon,
} from '../assets/icons';

const PageContainer = styled.div`
  margin: 0 auto;
  background: #ffffff;
  border-radius: 16px;
  padding: 32px 139px;
  font-family: Inter;
`;

const Header = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #09090B;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const SearchInput = styled.input`
  width: 90%;
  padding: 11px 16px 10px 48px;
  border: 1px solid #AAD3FF;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  &::placeholder { color: #71717A; }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
`;

const FilterButton = styled.button`
  width: 48px;
  height: 48px;
  background: #007aff;
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const AddButton = styled.button`
  height: 48px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const ChevronButton = styled.button`
  width: 48px;
  height: 48px;
  background: #007aff;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 20px;
  font-weight: 600;
`;

const ChevronLeft = () => <ChevronButton>&lt;</ChevronButton>;
const ChevronRight = () => <ChevronButton>&gt;</ChevronButton>;

const TableWrapper = styled.div`
  border: 1px solid #aad3ff;
  border-radius: 12px;
  overflow: auto;
  margin-top: 54px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: white;
  color: #71717a;
  font-weight: 500;
  font-size: 14px;
  text-align: left;
  padding: 16px 20px;
  border-bottom: 1px solid #aad3ff;
`;

const Td = styled.td`
  padding: 16px 20px;
  border-bottom: 1px solid #aad3ff;
  color: #111827;
  font-size: 15px;
`;

const Tr = styled.tr`
  &:last-child td {
    border-bottom: none;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Badge = styled.span`
  background: #f1f5f9;
  color: #111827;
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 9999px;
  white-space: nowrap;
`;

const GroupText = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: #111827;
  font-size: 15px;
`;

const GroupWord = styled.span`
  white-space: nowrap;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 35px 0;
`;

const Dot = styled.div<{ active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => (props.active ? '#007aff' : '#d1d5db')};
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
`;

const BottomNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #007aff;
  border-radius: 9999px;
  width: 50%;
  max-width: 520px;
`;

const NavItem = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 20px;
  border: none;
  border-radius: 99px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  background: ${(props) => (props.active ? '#ffffff' : '#007AFF')};
  color: ${(props) => (props.active ? '#007AFF' : '#ffffff')};
  min-width: ${(props) => (props.active ? '160px' : '52px')};
`;

const tableData = [
  { fio: 'Сигидин Ярослав Тимурович', project: 'ПАЗЛ', badges: ['frontend 2', 'frontend 2', 'UX/UI 2'], group: 'пэз пд09 пд09' },
  { fio: 'Сигидин Ярослав Тимурович', project: 'ПАЗЛ', badges: ['frontend 2', 'frontend 2', 'UX/UI 2'], group: 'пэз пд09 пд09' },
  { fio: 'Сигидин Ярослав Тимурович', project: 'ПАЗЛ', badges: ['frontend 2', 'UX/UI 2'], group: 'пэз пд09' },
  { fio: 'Сигидин Ярослав Тимурович', project: 'ПАЗЛ', badges: ['frontend 2', 'UX/UI 2'], group: 'пэз пд09' },
  { fio: 'Сигидин Ярослав Тимурович', project: 'ПАЗЛ', badges: ['frontend 2', 'UX/UI 2'], group: 'пэз пд09' },
  { fio: 'Сигидин Ярослав Тимурович', project: 'ПАЗЛ', badges: ['frontend 2'], group: 'пэз' },
  { fio: 'Сигидин Ярослав Тимурович', project: 'ПАЗЛ', badges: ['frontend 2', 'UX/UI 2'], group: 'пэз пд09' },
  { fio: 'Сигидин Ярослав Тимурович', project: 'ПАЗЛ', badges: ['frontend 2', 'UX/UI 2'], group: 'пэз пд09' },
  { fio: 'Сигидин Ярослав Тимурович', project: 'ПАЗЛ', badges: ['frontend 2', 'UX/UI 2'], group: 'пэз пд09' },
];

const UsersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'events' | 'managers' | 'settings'>('users');

  return (
    <PageContainer>
      <Header>Пользователи</Header>

      <Controls>
        <SearchWrapper>
          <SearchIconWrapper>
            <img src={SearchIconSrc} alt="search" width={20} height={20} />
          </SearchIconWrapper>
          <SearchInput placeholder="Поиск" />
        </SearchWrapper>

        <FilterButton>
          <FilterIcon />
        </FilterButton>

        <AddButton>
          <img src={PlusIconSrc} alt="add" width={20} height={20} />
          Добавить пользователя
        </AddButton>
      </Controls>

      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <Th>ФИО</Th>
              <Th>Проект</Th>
              <Th>Направление, курс</Th>
              <Th>Группа</Th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <Tr key={index}>
                <Td>{row.fio}</Td>
                <Td>{row.project}</Td>
                <Td>
                  <BadgeContainer>
                    {row.badges.map((b, i) => <Badge key={i}>{b}</Badge>)}
                  </BadgeContainer>
                </Td>
                <Td>
                  <GroupText>
                    {row.group.split(' ').map((word, i) => (
                      <GroupWord key={i}>{word}</GroupWord>
                    ))}
                  </GroupText>
                </Td>
              </Tr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>

      <Pagination>
        <Dot active /><Dot /><Dot /><Dot /><Dot />
      </Pagination>

      <Bottom>
        <BottomNav>
          <NavItem active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
            <UsersIcon />
            {activeTab === 'users' && <span>Пользователи</span>}
          </NavItem>
          <NavItem active={activeTab === 'events'} onClick={() => setActiveTab('events')}>
            <EventsIcon />
            {activeTab === 'events' && <span>Ивенты</span>}
          </NavItem>
          <NavItem active={activeTab === 'managers'} onClick={() => setActiveTab('managers')}>
            <ManagersIcon />
            {activeTab === 'managers' && <span>Менеджеры</span>}
          </NavItem>
          <NavItem active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
            <SettingsIcon />
            {activeTab === 'settings' && <span>Настройки</span>}
          </NavItem>
        </BottomNav>
        <ChevronLeft />
        <ChevronRight />
      </Bottom>
    </PageContainer>
  );
};

export default UsersPage;