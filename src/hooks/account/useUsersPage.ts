import { useMemo, useState } from "react";
import { useUsers } from "./useUsers";
import type { UserDto, UserFormValues, UsersFilters } from "../../types/user";
import { getMockProject, mapUserToTableRow } from "../../types/user.mappers";

const ITEMS_PER_PAGE = 10;

const defaultFilters: UsersFilters = {
  projects: [],
  courses: [],
  directions: [],
};

const matchesFilters = (user: UserDto, filters: UsersFilters): boolean => {
  const matchesProject =
    filters.projects.length === 0 ||
    filters.projects.includes(getMockProject(user));

  const matchesCourse =
    filters.courses.length === 0 || filters.courses.includes(user.course);

  const matchesDirection =
    filters.directions.length === 0 ||
    user.directions.some((direction) => filters.directions.includes(direction));

  return matchesProject && matchesCourse && matchesDirection;
};

export const useUsersPage = () => {
  const { data: users = [], isLoading, error } = useUsers();

  const errorMessage =
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
      ? error.message
      : error
        ? "Ошибка загрузки"
        : null;
  const [filters, setFilters] = useState<UsersFilters>(defaultFilters);
  const [currentPage, setCurrentPage] = useState(0);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) ?? null,
    [users, selectedUserId],
  );

  const filteredUsers = useMemo(
    () => users.filter((user) => matchesFilters(user, filters)),
    [users, filters],
  );

  const tableRows = useMemo(
    () => filteredUsers.map(mapUserToTableRow),
    [filteredUsers],
  );

  const totalPages = Math.ceil(tableRows.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentRows = tableRows.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const openUserModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setSelectedUserId(null);
    setIsUserModalOpen(false);
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openFilterModal = () => setIsFilterOpen(true);
  const closeFilterModal = () => setIsFilterOpen(false);

  const applyFilters = (nextFilters: UsersFilters) => {
    setFilters(nextFilters);
    setCurrentPage(0);
  };

  const handlePageChange = (page: number) => {
    if (page < 0 || page >= totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  // const handleDeleteUser = (userId: string) => {
  //   closeUserModal();
  // };

  // const handleSaveUser = (updatedUser: UserDto) => {
  // };

  // const handleAddUser = (formValues: UserFormValues) => {
  //   closeAddModal();
  // };

  return {
    currentRows,
    totalPages,
    currentPage,
    selectedUser,
    isLoading,
    error: errorMessage,
    filters,

    isFilterOpen,
    isAddModalOpen,
    isUserModalOpen,

    openFilterModal,
    closeFilterModal,
    openAddModal,
    closeAddModal,
    openUserModal,
    closeUserModal,
    applyFilters,

    handlePageChange,
    // handleDeleteUser,
    // handleSaveUser,
    // handleAddUser,
  };
};
