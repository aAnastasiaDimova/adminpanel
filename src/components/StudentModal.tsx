import React from "react";
import { type UserFormValues } from "../types/user";
import styled from "@emotion/styled";
import ArrowBackIcon from "../assets/arrow-back.svg";
import PencilIcon from "../assets/pencil.svg";
import DeleteIcon from "../assets/delete.svg";
import PlusIconSrc from "../assets/plus-icon.svg";

import { useStudentModal } from "../hooks/account/useStudentModal";

// import AvatarSrc from "../assets/Avatar.png";
type ModalMode = "create" | "details";
// type ViewMode = "view" | "edit";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mode: ModalMode;
  studentId?: string | null;
  onCreate?: (data: UserFormValues) => void | Promise<void>;
  onUpdate?: (id: string, data: UserFormValues) => void | Promise<void>;
  onDelete?: (id: string) => void | Promise<void>;
}

const directionOptions: { value: 0 | 1; label: string }[] = [
  { value: 0, label: "Frontend" },
  { value: 1, label: "UX/UI" },
];

const StudentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  mode,
  studentId,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const {
    formData,
    isLoading,
    error,
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

    updateField,
    toggleDirection,
    addSkill,
    removeSkill,
    handleStartEdit,
    handleSave,
    handleDelete,
    handleCancel,
  } = useStudentModal({
    isOpen,
    mode,
    studentId,
    onClose,
    onCreate,
    onUpdate,
    onDelete,
  });

  const hasAvatar = Boolean(formData.avatarUrl);
  const showPlus = isCreateMode && !hasAvatar;
  const showFallback = !hasAvatar && !showPlus;
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Overlay>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <HeaderLeft>
              <BackButton type="button" onClick={onClose}>
                <img src={ArrowBackIcon} alt="назад" width={18} height={18} />
              </BackButton>
              <Title>
                {isCreateMode ? "Новый пользователь" : "Пользователь"}
              </Title>
            </HeaderLeft>

            {isDetailsMode && isViewMode && (
              <HeaderActions>
                <ActionIconButton type="button" onClick={handleStartEdit}>
                  <img
                    src={PencilIcon}
                    alt="редактировать"
                    width={16}
                    height={16}
                  />
                </ActionIconButton>

                <ActionIconButton2
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <img src={DeleteIcon} alt="удалить" width={16} height={16} />
                </ActionIconButton2>
              </HeaderActions>
            )}
          </ModalHeader>

          <AvatarWrapper>
            <AvatarContainer clickable={isEditMode}>
              {hasAvatar && (
                <AvatarImage src={formData.avatarUrl} alt="avatar" />
              )}

              {showPlus && <AvatarPlusIcon src={PlusIconSrc} alt="add" />}

              {showFallback && (
                <AvatarFallback>
                  {formData.name?.[0]}
                  {formData.surname?.[0]}
                </AvatarFallback>
              )}
            </AvatarContainer>
          </AvatarWrapper>

          {isLoading && <div>Загрузка...</div>}
          {!!error && <div>{error}</div>}

          {!isLoading && (
            <Form>
              <FullWidthField>
                <Field>
                  <FieldLabel isFocused={focusedField === "fullName"}>
                    ФИО
                  </FieldLabel>
                  <Input
                    value={`${formData.surname} ${formData.name} ${formData.patronymic}`.trim()}
                    onChange={(e) => {
                      const parts = e.target.value.trim().split(/\s+/);
                      updateField("surname", parts[0] ?? "");
                      updateField("name", parts[1] ?? "");
                      updateField("patronymic", parts[2] ?? "");
                    }}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                    isFocused={focusedField === "fullName"}
                    disabled={isViewMode}
                    placeholder=" "
                  />
                </Field>
              </FullWidthField>

              <FullWidthField>
                <Field>
                  <FieldLabel isFocused={focusedField === "directions"}>
                    Направление
                  </FieldLabel>
                  <CheckboxGroup disabled={isViewMode}>
                    <CheckboxList>
                      {directionOptions.map((direction) => (
                        <CheckboxItem
                          key={direction.value}
                          checked={formData.directions.includes(
                            direction.value,
                          )}
                          disabled={isViewMode}
                          onClick={() => toggleDirection(direction.value)}
                        >
                          <input
                            type="checkbox"
                            checked={formData.directions.includes(
                              direction.value,
                            )}
                            readOnly
                          />
                          <span>{direction.label}</span>
                        </CheckboxItem>
                      ))}
                    </CheckboxList>
                  </CheckboxGroup>
                </Field>
              </FullWidthField>

              <Grid>
                <Field>
                  <FieldLabel isFocused={focusedField === "age"}>
                    Возраст
                  </FieldLabel>
                  <Input
                    type="number"
                    value={formData.age ?? ""}
                    onChange={(e) =>
                      updateField(
                        "age",
                        e.target.value === "" ? null : Number(e.target.value),
                      )
                    }
                    onFocus={() => setFocusedField("age")}
                    onBlur={() => setFocusedField(null)}
                    isFocused={focusedField === "age"}
                    disabled={isViewMode}
                    placeholder=" "
                  />
                </Field>

                <Field>
                  <FieldLabel isFocused={focusedField === "course"}>
                    Курс
                  </FieldLabel>
                  <Select
                    value={formData.course}
                    onChange={(e) =>
                      updateField(
                        "course",
                        Number(e.target.value) as 1 | 2 | 3 | 4,
                      )
                    }
                    disabled={isViewMode}
                  >
                    <option value={1}>1 курс</option>
                    <option value={2}>2 курс</option>
                    <option value={3}>3 курс</option>
                    <option value={4}>4 курс</option>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel isFocused={focusedField === "portfolioLink"}>
                    Ссылка на портфолио
                  </FieldLabel>
                  <Input
                    value={formData.portfolioLink}
                    onChange={(e) =>
                      updateField("portfolioLink", e.target.value)
                    }
                    onFocus={() => setFocusedField("portfolioLink")}
                    onBlur={() => setFocusedField(null)}
                    isFocused={focusedField === "portfolioLink"}
                    disabled={isViewMode}
                    placeholder=" "
                  />
                </Field>

                <Field>
                  <FieldLabel isFocused={focusedField === "username"}>
                    Username
                  </FieldLabel>
                  <Input
                    value={formData.username}
                    onChange={(e) => updateField("username", e.target.value)}
                    onFocus={() => setFocusedField("username")}
                    onBlur={() => setFocusedField(null)}
                    isFocused={focusedField === "username"}
                    disabled={isViewMode}
                    placeholder=" "
                  />
                </Field>

                <Field>
                  <FieldLabel isFocused={focusedField === "email"}>
                    Почта
                  </FieldLabel>
                  <Input
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    isFocused={focusedField === "email"}
                    disabled={isViewMode}
                    placeholder=" "
                  />
                </Field>

                <Field>
                  <FieldLabel isFocused={focusedField === "telegramLink"}>
                    Телефон
                  </FieldLabel>
                  <Input
                    value={formData.telegramLink}
                    onChange={(e) =>
                      updateField("telegramLink", e.target.value)
                    }
                    onFocus={() => setFocusedField("telegramLink")}
                    onBlur={() => setFocusedField(null)}
                    isFocused={focusedField === "telegramLink"}
                    disabled={isViewMode}
                    placeholder=" "
                  />
                </Field>
              </Grid>

              <FullWidth>
                <Field>
                  <FieldLabel isFocused={focusedField === "description"}>
                    О себе
                  </FieldLabel>

                  <Textarea
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    onFocus={() => setFocusedField("description")}
                    onBlur={() => setFocusedField(null)}
                    isFocused={focusedField === "description"}
                    disabled={isViewMode}
                    placeholder=" "
                  />
                </Field>
              </FullWidth>

              <FullWidth>
                <Field>
                  <FieldLabel>Стек технологий</FieldLabel>

                  <TagsBox disabled={isViewMode}>
                    {formData.skills.map((skill) => (
                      <TechTag key={skill}>
                        #{skill}
                        {isEditMode && (
                          <RemoveTag
                            type="button"
                            onClick={() => removeSkill(skill)}
                          >
                            ×
                          </RemoveTag>
                        )}
                      </TechTag>
                    ))}
                  </TagsBox>
                </Field>

                {isEditMode && (
                  <Field style={{ marginTop: "20px" }}>
                    <FieldLabel isFocused={focusedField === "skillInput"}>
                      Технология
                    </FieldLabel>

                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onFocus={() => setFocusedField("skillInput")}
                      onBlur={() => setFocusedField(null)}
                      isFocused={focusedField === "skillInput"}
                      placeholder="Напишите технологию и нажмите Enter"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                  </Field>
                )}
              </FullWidth>

              <ModalFooter>
                {isEditMode && (
                  <>
                    <CancelButton type="button" onClick={handleCancel}>
                      {isCreateMode ? "Отменить" : "Удалить изменения"}
                    </CancelButton>

                    <SaveButton type="button" onClick={handleSave}>
                      Сохранить
                    </SaveButton>
                  </>
                )}
              </ModalFooter>
            </Form>
          )}
        </ModalContainer>
      </Overlay>

      {showDeleteConfirm && (
        <ConfirmOverlay onClick={() => setShowDeleteConfirm(false)}>
          <ConfirmDialog onClick={(e) => e.stopPropagation()}>
            <ConfirmTitle>Удалить пользователя?</ConfirmTitle>

            <ConfirmButtons>
              <ConfirmDeleteBtn type="button" onClick={handleDelete}>
                Да, удалить
              </ConfirmDeleteBtn>

              <ConfirmCancelBtn
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Не удалять
              </ConfirmCancelBtn>
            </ConfirmButtons>
          </ConfirmDialog>
        </ConfirmOverlay>
      )}
    </>
  );
};

export default StudentModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  overflow-y: auto;
  font-family: Inter, sans-serif;
`;

const ModalContainer = styled.div`
  background: #ffffff;
  width: 60%;
  margin: 0 auto;
  padding: 24px 24px 32px;
`;

const ConfirmOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConfirmDialog = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px 40px;
  width: 460px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

const ConfirmTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 58px 0;
  color: #09090b;
`;

const ConfirmButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ConfirmDeleteBtn = styled.button`
  background: #e5393533;
  color: #e53935b2;
  border: none;
  border-radius: 12px;
  padding: 12px 40px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
`;

const ConfirmCancelBtn = styled.button`
  background: linear-gradient(135deg, #7086f3, #1e7ee8);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 40px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BackButton = styled.button`
  width: 65px;
  height: 45px;
  background: #4378ff1a;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #09090b;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionIconButton = styled.button`
  width: 40px;
  height: 40px;
  background: linear-gradient(to bottom, #1e7ee8, #3a55dd);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActionIconButton2 = styled(ActionIconButton)`
  background: linear-gradient(
    to bottom,
    #dc8234 0%,
    #d65a30 17%,
    #d03635 65%,
    #ba2e32 100%
  );
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`;
const AvatarContainer = styled.div<{ clickable?: boolean }>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #eaf2ff;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  cursor: ${(p) => (p.clickable ? "pointer" : "default")};
`;
const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const AvatarPlusIcon = styled.img`
  width: 28px;
  height: 28px;
`;

const AvatarFallback = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #eaf2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 600;
  color: #5085ff;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FullWidthField = styled.div`
  width: 100%;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;
const FullWidth = styled.div`
  grid-column: span 2;
`;

const Field = styled.div`
  position: relative;
`;

const FieldLabel = styled.label<{ isFocused?: boolean }>`
  position: absolute;
  left: 12px;
  top: 0;
  transform: translateY(-50%);
  background: #ffffff;
  padding: 0 6px;
  color: ${(p) => (p.isFocused ? "#007AFF" : "#A2ACB0")};
  font-size: 13px;
  font-weight: 500;
  pointer-events: none;
  z-index: 2;
`;

const Input = styled.input<{ isFocused?: boolean; disabled?: boolean }>`
  width: 100%;
  padding: 16px;
  border: ${(p) =>
    p.disabled
      ? "1.5px solid #A2ACB0"
      : p.isFocused
        ? "1.5px solid #007AFF"
        : "1.5px solid #A2ACB0"};
  border-radius: 14px;
  background: #ffffff;
  color: #09090b;
  font-size: 15px;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "text")};

  &::placeholder {
    color: #c4c9cc;
  }

  &:focus {
    outline: none;
    border: 1.5px solid #007aff;
  }
`;

const Select = styled.select<{ disabled?: boolean }>`
  width: 100%;
  padding: 16px;
  border: ${(p) =>
    p.disabled ? "1.5px solid #A2ACB0" : "1.5px solid #A2ACB0"};
  border-radius: 14px;
  background: #ffffff;
  color: #09090b;
  font-size: 15px;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
`;
const Textarea = styled.textarea<{ disabled?: boolean; isFocused?: boolean }>`
  width: 100%;
  min-height: 100px;
  padding: 16px;

  border: ${(p) =>
    p.disabled
      ? "1.5px solid #A2ACB0"
      : p.isFocused
        ? "1.5px solid #007AFF"
        : "1.5px solid #A2ACB0"};

  border-radius: 14px;
  background: #ffffff;

  font-size: 15px;
  color: #09090b;
  font-family: inherit;

  resize: vertical;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "text")};

  &::placeholder {
    color: #a2acb0;
  }

  &:focus {
    outline: none;
    border: 1.5px solid #007aff;
  }
`;

const CheckboxGroup = styled.div<{ disabled?: boolean }>`
  border: ${(p) =>
    p.disabled ? "1.5px solid #A2ACB0" : "1.5px solid #A2ACB0"};
  border-radius: 14px;
  padding: 16px;
  background: #ffffff;
`;

const CheckboxList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
`;

const CheckboxItem = styled.label<{ checked: boolean; disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 40px;
  font-size: 14px;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  background: ${(p) =>
    p.checked ? "rgba(96, 165, 250, 0.12)" : "transparent"};
  border: 1.5px solid ${(p) => (p.checked ? "#60a5fa" : "#78797e")};
  color: ${(p) => (p.checked ? "#60a5fa" : "#09090b")};
`;

const TagsBox = styled.div<{ disabled?: boolean }>`
  border: ${(p) =>
    p.disabled ? "1.5px solid #A2ACB0" : "1.5px solid #A2ACB0"};
  border-radius: 14px;
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 54px;
  background: #ffffff;
`;

const TechTag = styled.span`
  padding: 8px 14px;
  background: #f1f1f1;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #09090b;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const RemoveTag = styled.button`
  background: none;
  border: none;
  color: #78797e;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const CancelButton = styled.button`
  width: 100%;
  background: #e5393533;
  color: #e53935b2;
  border: none;
  border-radius: 12px;
  padding: 12px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
`;

const SaveButton = styled.button`
  width: 100%;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
`;
