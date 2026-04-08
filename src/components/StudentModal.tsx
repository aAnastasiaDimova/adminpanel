import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import ArrowBackIcon from "../assets/arrow-back.svg";
import PencilIcon from "../assets/pencil.svg";
import DeleteIcon from "../assets/delete.svg";
import PlusIconSrc from "../assets/plus.svg";
import AvatarSrc from "../assets/Avatar.png";

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
  box-sizing: border-box;
`;

const ConfirmOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
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
  width: 380px;
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
  background: linear-gradient(135deg, #7086F3, #1E7EE8);
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
  background: linear-gradient(to bottom, #1E7EE8, #3a55dd);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActionIconButton2 = styled(ActionIconButton)`
  background: linear-gradient(to bottom, #DC8234 0%, #D65A30 17%, #D03635 65%, #BA2E32 100%);
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FullWidthField = styled.div` width: 100%; `;
const Grid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 20px; `;
const FullWidth = styled.div` grid-column: span 2; `;

const Field = styled.div`
  position: relative;
  margin-top: 12px;
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
  border: ${(p) => (p.disabled ? "1px solid #A2ACB0" : p.isFocused ? "2px solid #007AFF" : "1px solid #A2ACB0")};
  border-radius: 10px;
  background: #ffffff; /* Белый фон всегда */
  color: #09090b;
  font-size: 15px;
  box-sizing: border-box;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "text")};
  &:focus { outline: none; border: 2px solid #007aff; }
`;

const Select = styled.select<{ disabled?: boolean }>`
  width: 100%;
  padding: 16px;
  border: ${(p) => (p.disabled ? "1px solid #A2ACB0" : "1px solid #A2ACB0")};
  border-radius: 10px;
  background: #ffffff;
  color: #09090b;
  font-size: 15px;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
`;

const TextareaWrapper = styled.div<{ disabled?: boolean }>`
  padding: 16px;
  border: ${(p) => (p.disabled ? "1px solid #A2ACB0" : "1px solid #A2ACB0")};
  border-radius: 10px;
  background: #ffffff;
`;

const Textarea = styled.textarea<{ disabled?: boolean }>`
  width: 100%;
  min-height: 100px;
  border: none;
  outline: none;
  resize: vertical;
  background: transparent;
  font-size: 15px;
  color: #09090b;
  font-family: inherit;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "text")};
`;

const CheckboxGroup = styled.div<{ disabled?: boolean }>`
  border: ${(p) => (p.disabled ? "1px solid #A2ACB0" : "1px solid #A2ACB0")};
  border-radius: 10px;
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
  background: ${(p) => (p.checked ? "rgba(96, 165, 250, 0.12)" : "transparent")};
  border: 1.5px solid ${(p) => (p.checked ? "#60a5fa" : "#78797e")};
  color: ${(p) => (p.checked ? "#60a5fa" : "#09090b")};
`;

const TagsBox = styled.div<{ disabled?: boolean }>`
  border: ${(p) => (p.disabled ? "1px solid #A2ACB0" : "1px solid #A2ACB0")};
  border-radius: 10px;
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
  margin-top: 32px;
`;

const CancelButton = styled.button`
  background: #e5393533;
  color: #e53935b2;
  border: none;
  border-radius: 12px;
  padding: 12px 145px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
`;

const SaveButton = styled.button`
  background: #007aff;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 145px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
`;

export interface Student {
  fio: string;
  directionTags: string[];
  age: string;
  course: string;
  website: string;
  username: string;
  email: string;
  phone: string;
  about: string;
  techStack: string[];
  project: string;
  group: string;
  badges: string[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  student?: Student | null;
  onSave?: (updated: Student) => void;
  onDelete?: (fio: string) => void;
  isNew?: boolean;
}

const AVAILABLE_DIRECTIONS = ["Frontend", "Backend", "UX/UI"];

const StudentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  student,
  onSave,
  onDelete,
  isNew = false,
}) => {
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [formData, setFormData] = useState<Student>({
    fio: "",
    directionTags: ["Frontend"],
    age: "",
    course: "",
    website: "",
    username: "",
    email: "",
    phone: "",
    about: "",
    techStack: [],
    project: "ПАЗЛ",
    group: "",
    badges: [],
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
      setMode("view");
    } else if (isNew) {
      setFormData({
        fio: "",
        directionTags: ["Frontend"],
        age: "",
        course: "2 курс",
        website: "",
        username: "",
        email: "",
        phone: "",
        about: "",
        techStack: [],
        project: "ПАЗЛ",
        group: "",
        badges: [],
      });
      setMode("edit");
    }
  }, [student, isNew]);

  const handleSave = () => {
    onSave?.(formData);
    setMode("view");
  };

  const handleCancel = () => {
    if (student) setFormData(student);
    setMode("view");
  };

  const toggleDirection = (dir: string) => {
    if (mode === "view") return;
    setFormData((prev) => ({
      ...prev,
      directionTags: prev.directionTags.includes(dir)
        ? prev.directionTags.filter((d) => d !== dir)
        : [...prev.directionTags, dir],
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <HeaderLeft>
              <BackButton onClick={onClose}>
                <img src={ArrowBackIcon} alt="назад" width={24} height={24} />
              </BackButton>
              <Title>{isNew ? "Новый пользователь" : "Пользователь"}</Title>
            </HeaderLeft>

            {!isNew && mode === "view" && (
              <HeaderActions>
                <ActionIconButton onClick={() => setMode("edit")}>
                  <img src={PencilIcon} alt="редактировать" width={16} height={16} />
                </ActionIconButton>
                <ActionIconButton2 onClick={() => setShowDeleteConfirm(true)}>
                  <img src={DeleteIcon} alt="удалить" width={16} height={16} />
                </ActionIconButton2>
              </HeaderActions>
            )}
          </ModalHeader>

          <AvatarWrapper>
            <Avatar src={AvatarSrc} alt="avatar" />
          </AvatarWrapper>

          <Form>
            <FullWidthField>
              <Field>
                <FieldLabel isFocused={focusedField === "fio"}>ФИО</FieldLabel>
                <Input
                  value={formData.fio}
                  onChange={(e) => setFormData({ ...formData, fio: e.target.value })}
                  onFocus={() => setFocusedField("fio")}
                  onBlur={() => setFocusedField(null)}
                  disabled={mode === "view"}
                  placeholder=" "
                />
              </Field>
            </FullWidthField>

            <FullWidthField>
              <Field>
                <FieldLabel>Направление</FieldLabel>
                <CheckboxGroup disabled={mode === "view"}>
                  <CheckboxList>
                    {AVAILABLE_DIRECTIONS.map((dir) => (
                      <CheckboxItem
                        key={dir}
                        checked={formData.directionTags.includes(dir)}
                        disabled={mode === "view"}
                        onClick={() => toggleDirection(dir)}
                      >
                        <input
                          type="checkbox"
                          checked={formData.directionTags.includes(dir)}
                          readOnly
                        />
                        <span>{dir}</span>
                      </CheckboxItem>
                    ))}
                  </CheckboxList>
                </CheckboxGroup>
              </Field>
            </FullWidthField>

            <Grid>
              <Field>
                <FieldLabel isFocused={focusedField === "age"}>Возраст</FieldLabel>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  onFocus={() => setFocusedField("age")}
                  onBlur={() => setFocusedField(null)}
                  disabled={mode === "view"}
                />
              </Field>

              <Field>
                <FieldLabel>Курс</FieldLabel>
                <Select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  disabled={mode === "view"}
                >
                  <option value="1 курс">1 курс</option>
                  <option value="2 курс">2 курс</option>
                  <option value="3 курс">3 курс</option>
                  <option value="4 курс">4 курс</option>
                </Select>
              </Field>

              <Field>
                <FieldLabel isFocused={focusedField === "website"}>Ссылка на портфолио</FieldLabel>
                <Input
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  onFocus={() => setFocusedField("website")}
                  onBlur={() => setFocusedField(null)}
                  disabled={mode === "view"}
                />
              </Field>

              <Field>
                <FieldLabel isFocused={focusedField === "username"}>Username</FieldLabel>
                <Input
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField(null)}
                  disabled={mode === "view"}
                />
              </Field>

              <Field>
                <FieldLabel isFocused={focusedField === "email"}>Почта</FieldLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  disabled={mode === "view"}
                />
              </Field>

              <Field>
                <FieldLabel isFocused={focusedField === "phone"}>Телефон</FieldLabel>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  disabled={mode === "view"}
                />
              </Field>

              <Field>
                <FieldLabel isFocused={focusedField === "project"}>Проект</FieldLabel>
                <Input
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  onFocus={() => setFocusedField("project")}
                  onBlur={() => setFocusedField(null)}
                  disabled={mode === "view"}
                />
              </Field>

              <Field>
                <FieldLabel isFocused={focusedField === "group"}>Группа</FieldLabel>
                <Input
                  value={formData.group}
                  onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                  onFocus={() => setFocusedField("group")}
                  onBlur={() => setFocusedField(null)}
                  disabled={mode === "view"}
                />
              </Field>
            </Grid>

            <FullWidth>
              <Field>
                <FieldLabel isFocused={focusedField === "about"}>О себе</FieldLabel>
                <TextareaWrapper disabled={mode === "view"}>
                  <Textarea
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    disabled={mode === "view"}
                  />
                </TextareaWrapper>
              </Field>
            </FullWidth>

            <FullWidth>
              <Field>
                <FieldLabel>Стек технологий</FieldLabel>
                <TagsBox disabled={mode === "view"}>
                  {formData.techStack.map((tag, i) => (
                    <TechTag key={i}>
                      #{tag}
                      {mode === "edit" && (
                        <RemoveTag
                          onClick={() =>
                            setFormData((p) => ({
                              ...p,
                              techStack: p.techStack.filter((t) => t !== tag),
                            }))
                          }
                        >
                          ×
                        </RemoveTag>
                      )}
                    </TechTag>
                  ))}
                </TagsBox>
                {mode === "edit" && (
                  <Input
                    placeholder="Напишите технологию и нажмите Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value.trim()) {
                        const val = e.currentTarget.value.trim();
                        if (!formData.techStack.includes(val)) {
                          setFormData((p) => ({
                            ...p,
                            techStack: [...p.techStack, val],
                          }));
                        }
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                )}
              </Field>
            </FullWidth>
          </Form>

          <ModalFooter>
            {mode === "edit" ? (
              <>
                <CancelButton onClick={handleCancel}>Отменить изменения</CancelButton>
                <SaveButton onClick={handleSave}>
                  <img src={PlusIconSrc} width={16} height={16} style={{ marginRight: "6px" }} />
                  Сохранить
                </SaveButton>
              </>
            ) : ( 
            null
            )}
          </ModalFooter>
        </ModalContainer>
      </Overlay>

      {showDeleteConfirm && (
        <ConfirmOverlay onClick={() => setShowDeleteConfirm(false)}>
          <ConfirmDialog onClick={(e) => e.stopPropagation()}>
            <ConfirmTitle>Удалить пользователя?</ConfirmTitle>
            <ConfirmButtons>
            <ConfirmDeleteBtn onClick={() => onDelete?.(formData.fio)}>
                Да, удалить
              </ConfirmDeleteBtn>
              <ConfirmCancelBtn onClick={() => setShowDeleteConfirm(false)}>
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