import React from "react";

import type { UserTableRow } from "../../types/user";

import styled from "@emotion/styled";

export const TableWrapper = styled.div`
  border: 1px solid #aad3ff;
  border-radius: 12px;
  overflow: auto;
  margin-top: 25px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  background: white;
  color: #71717a;
  font-weight: 500;
  font-size: 14px;
  text-align: left;
  padding: 16px;
  border-bottom: 1px solid #aad3ff;
`;

export const ThCenter = styled(Th)`
  text-align: center;
`;

export const Td = styled.td`
  padding: 5px 16px;
  border-bottom: 1px solid #aad3ff;
  color: #111827;
  font-size: 15px;
  vertical-align: middle;
`;

export const TdCenter = styled(Td)`
  text-align: center;
`;

export const Tr = styled.tr`
  &:last-child td {
    border-bottom: none;
  }
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

export const Badge = styled.span`
  background: #f2f2f3;
  color: #2f2f35;
  font-size: 13px;
  line-height: 1;
  padding: 12px 16px;
  border-radius: 10px;
  white-space: nowrap;
  font-weight: 600;
`;
type UsersTableProps = {
  rows: UserTableRow[];
  onRowClick: (userId: string) => void;
};

export const UsersTable: React.FC<UsersTableProps> = ({
  rows,
  onRowClick,
}) => {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <Th>ФИО</Th>
            <ThCenter>Username</ThCenter>
            <ThCenter>Проект</ThCenter>
            <ThCenter>Направление, курс</ThCenter>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <Tr
              key={row.id}
              onClick={() => onRowClick(row.id)}
              style={{ cursor: "pointer" }}
            >
              <Td>{row.fio}</Td>

              <TdCenter>{row.username}</TdCenter>

              <TdCenter>{row.project}</TdCenter>

              <TdCenter>
                <BadgeContainer>
                  {row.badges.map((badge, index) => (
                    <Badge key={`${badge}-${index}`}>{badge}</Badge>
                  ))}
                </BadgeContainer>
              </TdCenter>
            </Tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};