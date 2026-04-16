import React from "react";

import { PageContainer } from "../styles/global";
import FilterModal from "./FilterModal";
import { HeaderPage } from "./HeaderPage";

import { UsersTable } from "./users/UsersTable";
import { UsersPagination } from "./users/UsersPagination";
import { useUsersPage } from "../hooks/account/useUsersPage";

// import AddUserModal from "./AddStudentModal";
// import UserModal from "./StudentModal";

const UsersPage: React.FC = () => {
  const {
    currentRows,
    totalPages,
    currentPage,
    selectedUser,
    isLoading,
    error,
    isFilterOpen,
    isAddModalOpen,
    isUserModalOpen,
    filters,
    applyFilters,
    openFilterModal,
    closeFilterModal,
    openAddModal,
    closeAddModal,
    openUserModal,
    closeUserModal,

    handlePageChange,
    handleDeleteUser,
    handleSaveUser,
    handleAddUser,
  } = useUsersPage();

  return (
    <PageContainer>
      <HeaderPage
        title="Пользователи"
        textButton="Добавить пользователя"
        onClickFilter={openFilterModal}
        onClickAddModal={openAddModal}
      />

      {isLoading && <div>Загрузка пользователей...</div>}
      {error && <div>{error}</div>}

      {!isLoading && !error && (
        <>
          <UsersTable rows={currentRows} onRowClick={openUserModal} />

          <UsersPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}

      <FilterModal
        isOpen={isFilterOpen}
        value={filters}
        onClose={closeFilterModal}
        onApply={applyFilters}
      />

      {/* <UserModal
        isOpen={isUserModalOpen}
        onClose={closeUserModal}
        user={selectedUser}
        onSave={handleSaveUser}
        onDelete={handleDeleteUser}
      /> */}

      {/* <AddUserModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onAddUser={handleAddUser}
      /> */}
    </PageContainer>
  );
};

export default UsersPage;
