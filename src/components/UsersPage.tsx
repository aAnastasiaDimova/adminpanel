import React from "react";

import { ContentWrapper, PageContainer } from "../styles/global";
import FilterModal from "./FilterModal";
import { HeaderPage } from "./HeaderPage";

import { UsersTable } from "./users/UsersTable";
import { UsersPagination } from "./users/UsersPagination";
import { useUsersPage } from "../hooks/account/useUsersPage";
import { Loader } from "./loader";

import StudentModal from "./StudentModal";

const UsersPage: React.FC = () => {
  const {
    currentRows,
    totalPages,
    currentPage,

    isLoading,
    error,

    filters,
    isFilterOpen,

    isUserModalOpen,
    modalMode,
    selectedUserId,

    openFilterModal,
    closeFilterModal,
    applyFilters,

    openCreateModal,
    openDetailsModal,
    closeUserModal,

    handlePageChange,

    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
  } = useUsersPage();

  return (
    <PageContainer>
      <HeaderPage
        title="Пользователи"
        textButton="Добавить пользователя"
        onClickFilter={openFilterModal}
        onClickAddModal={openCreateModal} // 🔥
      />

      {isLoading && <Loader />}
      {error && <div>{error}</div>}

      <ContentWrapper>
        {!isLoading && !error && (
          <>
            <UsersTable rows={currentRows} onRowClick={openDetailsModal} />

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
        <StudentModal
          isOpen={isUserModalOpen}
          onClose={closeUserModal}
          mode={modalMode}
          studentId={selectedUserId}
          onCreate={handleCreateUser}
          onUpdate={handleUpdateUser}
          onDelete={handleDeleteUser}
        />
      </ContentWrapper>
    </PageContainer>
  );
};

export default UsersPage;
