import React, { useState } from "react";
import styled from "@emotion/styled";

import { initialTableData } from "../hooks/mock.userdata";
import { PageContainer } from "../styles/global";
import AddStudentModal, { type NewStudent } from "./AddStudentModal";
import StudentModal, { type Student } from "./StudentModal";
import FilterModal from "./FilterModal";
import { HeaderPage } from "./HeaderPage";
// import { Pagination } from "./pagination";

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
  padding: 16px 16px;
  border-bottom: 1px solid #aad3ff;
`;

const Th1 = styled(Th)`
  text-align: center;
`;

const Td = styled.td`
  padding: 16px 16px;
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
  justify-content: center;
  text-align: center;
`;

const Badge = styled.span`
  background: #e4e4e97e;
  color: #111827;
  font-size: 13px;
  padding: 10px 10px;
  margin: -10px 0px;
  border-radius: 9999px;
  white-space: nowrap;
  font-weight: 600;
  border-radius: 8px;
`;

const GroupText = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: #111827;
  font-size: 14px;
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
  background: ${(props) => (props.active ? "#007aff" : "#d1d5db")};
`;

const ITEMS_PER_PAGE = 10;

const UsersPage: React.FC = () => {
  const [students, setStudents] = useState(initialTableData);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const totalPages = Math.ceil(students.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentData = students.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openStudentModal = (row: any) => {
    const fullStudent: Student = {
      fio: row.fio,
      project: row.project,
      badges: row.badges,
      group: row.group,
      directionTags: row.badges.map((b: string) => b.split(" ")[0]),
      course:
        row.badges.length > 0
          ? `${row.badges[0].split(" ")[1]} курс`
          : "2 курс",
      age: "20",
      website: "sigidingo",
      username: "sigidingo",
      email: "sigidingo@gmail.com",
      phone: "89619710510",
      about:
        "Привет! Меня зовут Ярослав, и я увлекаюсь программированием и путешествиями. В свободное время люблю читать книги и изучать новые языки. Мечтаю посетить Японию и попробовать настоящие суши!",
      techStack: ["React", "Python", "RestApi", "Tilda", "Paskal"],
    };
    setSelectedStudent(fullStudent);
    setIsStudentModalOpen(true);
  };

  const handleSaveStudent = (updated: Student) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.fio === updated.fio
          ? {
              fio: updated.fio,
              project: updated.project,
              badges:
                updated.badges ||
                updated.directionTags.map(
                  (dir) => `${dir} ${updated.course.split(" ")[0]}`,
                ),
              group: updated.group,
            }
          : s,
      ),
    );
    setSelectedStudent(updated);
  };

  const handleDeleteStudent = (fio: string) => {
    setStudents((prev) => prev.filter((s) => s.fio !== fio));
    setIsStudentModalOpen(false);
  };

  const handleAddStudent = (newStudent: NewStudent) => {
    const newRow = {
      fio: newStudent.fio,
      project: newStudent.project,
      badges: newStudent.badges,
      group: newStudent.group,
    };
    setStudents((prev) => [newRow, ...prev]);
    setCurrentPage(0);
  };

  return (
    <PageContainer>
      <HeaderPage
        title="Пользователи"
        textButton="Добавить пользователя"
        onClickFilter={() => setIsFilterOpen(true)}
        onClickAddModal={() => setIsAddModalOpen(true)}
      />

      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <Th>ФИО</Th>
              <Th>Проект</Th>
              <Th1>Направление, курс</Th1>
              <Th>Группа</Th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <Tr
                key={index}
                onClick={() => openStudentModal(row)}
                style={{ cursor: "pointer" }}
              >
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

      <Pagination>
        {Array.from({ length: totalPages }).map((_, i) => (
          <Dot key={i} active={i === currentPage} />
        ))}
      </Pagination>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* <BottomNav
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}

      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        student={selectedStudent}
        onSave={handleSaveStudent}
        onDelete={handleDeleteStudent}
      />

      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStudent={handleAddStudent}
      />
    </PageContainer>
  );
};

export default UsersPage;
