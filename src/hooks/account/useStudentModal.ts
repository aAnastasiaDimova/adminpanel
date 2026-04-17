import { useEffect, useState } from "react";
import type { UserFormValues } from "../../types/user";
import { mapUserToFormValues } from "../../types/user.mappers";
import { useUserById } from "./useUserById";

type ModalMode = "create" | "details";
type ViewMode = "view" | "edit";

type Params = {
  isOpen: boolean;
  mode: ModalMode;
  studentId?: string | null;
  onClose: () => void;
  onCreate?: (data: UserFormValues) => void | Promise<void>;
  onUpdate?: (id: string, data: UserFormValues) => void | Promise<void>;
  onDelete?: (id: string) => void | Promise<void>;
};

const createEmptyUserForm = (): UserFormValues => ({
  username: "",
  email: "",
  name: "",
  surname: "",
  patronymic: "",
  description: "",
  telegramLink: "",
  portfolioLink: "",
  isSubscribedToNotifications: false,
  age: null,
  directions: [],
  course: 1,
  skills: [],
  userRole: 0,
  avatarUrl: "",
});

export const useStudentModal = ({
  isOpen,
  mode,
  studentId,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
}: Params) => {
  const [viewMode, setViewMode] = useState<ViewMode>("view");
  const [formData, setFormData] = useState<UserFormValues>(
    createEmptyUserForm(),
  );
  const [loadedStudentId, setLoadedStudentId] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isCreateMode = mode === "create";
  const isDetailsMode = mode === "details";
  const isEditMode = viewMode === "edit";
  const isViewMode = viewMode === "view";

  const shouldLoadUser = isOpen && isDetailsMode && Boolean(studentId);
  console.log("useStudentModal:", {
    isOpen,
    isDetailsMode,
    studentId,
    shouldLoadUser,
  });
  const {
    data: loadedUser,
    isLoading,
    error,
  } = useUserById(studentId ?? null, shouldLoadUser);

  const errorMessage =
    error instanceof Error
      ? error.message
      : error
        ? "Ошибка загрузки пользователя"
        : "";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setSkillInput("");
    setFocusedField(null);
    setShowDeleteConfirm(false);

    if (isCreateMode) {
      setFormData(createEmptyUserForm());
      setLoadedStudentId(null);
      setViewMode("edit");
      return;
    }

    if (isDetailsMode) {
      setViewMode("view");
    }
  }, [isOpen, isCreateMode, isDetailsMode]);

  useEffect(() => {
    if (!loadedUser) {
      return;
    }

    setFormData(mapUserToFormValues(loadedUser));
    setLoadedStudentId(loadedUser.id);
  }, [loadedUser]);

  const updateField = <K extends keyof UserFormValues>(
    key: K,
    value: UserFormValues[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleDirection = (direction: 0 | 1) => {
    if (isViewMode) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      directions: prev.directions.includes(direction)
        ? prev.directions.filter((item) => item !== direction)
        : [...prev.directions, direction],
    }));
  };

  const addSkill = () => {
    const nextSkill = skillInput.trim();

    if (!nextSkill) {
      return;
    }

    if (formData.skills.includes(nextSkill)) {
      setSkillInput("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, nextSkill],
    }));
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item !== skill),
    }));
  };

  const handleStartEdit = () => {
    if (isDetailsMode) {
      setViewMode("edit");
    }
  };

  const handleSave = async () => {
    if (isCreateMode) {
      await onCreate?.(formData);
      onClose();
      return;
    }

    if (isDetailsMode && loadedStudentId) {
      await onUpdate?.(loadedStudentId, formData);
      setViewMode("view");
    }
  };

  const handleDelete = async () => {
    if (!loadedStudentId) {
      return;
    }

    await onDelete?.(loadedStudentId);
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleCancel = () => {
    if (isCreateMode) {
      onClose();
      return;
    }

    if (loadedUser) {
      setFormData(mapUserToFormValues(loadedUser));
    }

    setSkillInput("");
    setFocusedField(null);
    setViewMode("view");
  };

  return {
    formData,
    isLoading,
    error: errorMessage,
    skillInput,
    focusedField,
    showDeleteConfirm,

    isCreateMode,
    isDetailsMode,
    isEditMode,
    isViewMode,

    setSkillInput,
    setFocusedField,
    setShowDeleteConfirm,
    setViewMode,

    updateField,
    toggleDirection,
    addSkill,
    removeSkill,
    handleStartEdit,
    handleSave,
    handleDelete,
    handleCancel,
  };
};
