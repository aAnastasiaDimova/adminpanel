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
    user.directions.some((direction) =>
      filters.directions.includes(direction)
    );

  return matchesProject && matchesCourse && matchesDirection;
};

type ModalMode = "create" | "details";

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

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const filteredUsers = useMemo(
    () => users.filter((user) => matchesFilters(user, filters)),
    [users, filters]
  );

  const tableRows = useMemo(
    () => filteredUsers.map(mapUserToTableRow),
    [filteredUsers]
  );

  const totalPages = Math.ceil(tableRows.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentRows = tableRows.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedUserId(null);
    setIsUserModalOpen(true);
  };

  const openDetailsModal = (userId: string) => {
    setModalMode("details");
    setSelectedUserId(userId);
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setSelectedUserId(null);
  };

  const openFilterModal = () => setIsFilterOpen(true);
  const closeFilterModal = () => setIsFilterOpen(false);

  const applyFilters = (nextFilters: UsersFilters) => {
    setFilters(nextFilters);
    setCurrentPage(0);
  };

  const handlePageChange = (page: number) => {
    if (page < 0 || page >= totalPages) return;
    setCurrentPage(page);
  };

  const handleCreateUser = async (data: UserFormValues) => {
    console.log("create", data);
    closeUserModal();
  };

  const handleUpdateUser = async (id: string, data: UserFormValues) => {
    console.log("update", id, data);
  };

  const handleDeleteUser = async (id: string) => {
    console.log("delete", id);
    closeUserModal();
  };

  return {
    currentRows,
    totalPages,
    currentPage,

    isLoading,
    error: errorMessage,

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
  };
};