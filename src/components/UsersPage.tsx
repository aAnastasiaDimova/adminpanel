import React from "react";
import styled from "@emotion/styled";

import { tableData } from "../hooks/mock.userdata";
import { HeaderPage } from "./HeaderPage";
import { PageContainer } from "../styles/global";
import { Pagination } from "./pagination";

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

const UsersPage: React.FC = () => {
  return (
    <PageContainer>
      <HeaderPage title="Пользователи" textButton="Добавить пользователя" />
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
                    {row.badges.map((b, i) => (
                      <Badge key={i}>{b}</Badge>
                    ))}
                  </BadgeContainer>
                </Td>
                <Td>
                  <GroupText>
                    {row.group.split(" ").map((word, i) => (
                      <GroupWord key={i}>{word}</GroupWord>
                    ))}
                  </GroupText>
                </Td>
              </Tr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
      <Pagination />
    </PageContainer>
  );
};

export default UsersPage;
