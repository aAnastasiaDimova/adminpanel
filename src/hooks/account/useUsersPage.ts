import { useEffect, useMemo, useState } from "react";
import { API } from "../../axios/index";
import type { UserDto, UserFormValues, UsersFilters } from "../../types/user";
import { mapUserToTableRow, getMockProject } from "../../types/user.mappers";

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
  const [users, setUsers] = useState<UserDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<UsersFilters>(defaultFilters);

  const [currentPage, setCurrentPage] = useState(0);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await API.users.getAllUsers();
        setUsers(data);
      } catch (err) {
        if (
          typeof err === "object" &&
          err !== null &&
          "message" in err &&
          typeof err.message === "string"
        ) {
          setError(err.message);
        } else {
          setError("Не удалось загрузить пользователей");
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadUsers();
  }, []);

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

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => {
      const nextUsers = prev.filter((user) => user.id !== userId);
      const nextFiltered = nextUsers.filter((user) =>
        matchesFilters(user, filters),
      );
      const nextTotalPages = Math.ceil(nextFiltered.length / ITEMS_PER_PAGE);

      if (currentPage >= nextTotalPages && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }

      return nextUsers;
    });

    closeUserModal();
  };

  const handleSaveUser = (updatedUser: UserDto) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
  };

  const handleAddUser = (formValues: UserFormValues) => {
    const newUser: UserDto = {
      id: crypto.randomUUID(),
      username: formValues.username,
      email: formValues.email,
      name: formValues.name,
      surname: formValues.surname,
      patronymic: formValues.patronymic || null,
      description: formValues.description || null,
      telegramLink: formValues.telegramLink,
      portfolioLink: formValues.portfolioLink,
      isSubscribedToNotifications: formValues.isSubscribedToNotifications,
      age: formValues.age,
      directions: formValues.directions,
      course: formValues.course,
      skills: formValues.skills,
      userRole: formValues.userRole,
      avatarUrl: formValues.avatarUrl || null,
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentPage(0);
    closeAddModal();
  };

  return {
    currentRows,
    totalPages,
    currentPage,
    selectedUser,
    isLoading,
    error,
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
    handleDeleteUser,
    handleSaveUser,
    handleAddUser,
  };
};