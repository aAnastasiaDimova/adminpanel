import React, { useState } from "react";
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
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
  background: none;
  border: none;
  cursor: pointer;
  background: linear-gradient(to bottom, #1E7EE8, #3a55dd);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
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
  transition: none;
`;

const Input = styled.input<{ isFocused?: boolean }>`
  width: 100%;
  padding: 16px;
  border: ${(p) => (p.isFocused ? "2px solid #007AFF" : "1px solid #A2ACB0")};
  border-radius: 10px;
  background: #ffffff;
  color: #09090b;
  font-size: 15px;
  box-sizing: border-box;
  transition: none;
  &:focus {
    border: 2px solid #007aff;
    outline: none;
  }
  &::placeholder {
    color: #A2ACB0;
  }
`;

const Select = styled.select<{ isFocused?: boolean }>`
  width: 100%;
  padding: 16px;
  border: ${(p) => (p.isFocused ? "2px solid #007AFF" : "1px solid #A2ACB0")};
  border-radius: 10px;
  background: #ffffff;
  color: #09090b;
  font-size: 15px;
  appearance: none;
background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2378797E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;
  padding-right: 40px;
  transition: none;
  &:focus {
    border: 2px solid #007aff;
    outline: none;
  }
`;

const TextareaWrapper = styled.div<{ isFocused?: boolean }>`
  padding: 16px;
  border: ${(p) => (p.isFocused ? "2px solid #007AFF" : "1px solid #A2ACB0")};
  border-radius: 10px;
  background: #ffffff;
  transition: none;
  &:focus-within {
    border: 2px solid #007aff;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  border: none;
  outline: none;
  resize: vertical;
  background: transparent;
  font-size: 15px;
  color: #09090b;
  font-family: inherit;
`;

const CheckboxGroup = styled.div<{ isFocused?: boolean }>`
  border: ${(p) => (p.isFocused ? "2px solid #007AFF" : "1px solid #A2ACB0")};
  border-radius: 10px;
  padding: 16px;
  background: #ffffff;
  margin-top: 4px;
  transition: none;
  &:focus-within {
    border: 2px solid #007aff;
  }
`;

const CheckboxList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
`;

const CheckboxItem = styled.label<{ checked: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 40px;
  font-size: 14px;
  cursor: pointer;
  background: ${(p) => (p.checked ? "rgba(96, 165, 250, 0.12)" : "transparent")};
  border: 1.5px solid ${(p) => (p.checked ? "#60a5fa" : "#78797e")};
  color: ${(p) => (p.checked ? "#60a5fa" : "#09090b")};
  input {
    accent-color: #60a5fa;
    margin: 0;
  }
  &:hover {
    background: ${(p) =>
      p.checked
        ? "rgba(96, 165, 250, 0.2)"
        : "rgba(120, 121, 126, 0.08)"};
  }
`;

const TagsBox = styled.div<{ isFocused?: boolean }>`
  border: ${(p) => (p.isFocused ? "2px solid #007AFF" : "1px solid #A2ACB0")};
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 54px;
  background: #ffffff;
  margin-top: 4px;
  transition: none;
  &:focus-within {
    border: 2px solid #007aff;
  }
`;

const TechTag = styled.span`
  padding: 6px 12px;
  background: transparent;
  border: 1.5px solid #A2ACB0;
  border-radius: 8px;
  font-size: 15px;
  color: #09090b;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const RemoveTag = styled.button`
  background: none;
  border: none;
  color: #A2ACB0;
  font-size: 18px;
  cursor: pointer;
  padding: 0 2px;
  line-height: 1;
  &:hover {
    color: #ff6b6b;
  }
`;

const TechInput = styled.input<{ isFocused?: boolean }>`
  width: 100%;
  border: ${(p) => (p.isFocused ? "2px solid #007AFF" : "1px solid #A2ACB0")};
  border-radius: 10px;
  font-size: 14px;
  background: #ffffff;
  color: #09090b;
  padding: 14px 16px;
  margin-top: 16px;
  transition: none;
  &:focus {
    border: 2px solid #007aff;
    outline: none;
  }
  &::placeholder {
    color: #A2ACB0;
  }
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
   line-height: 28px;

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
  display: inline-flex;
  align-items: center;
  line-height: 28px;

`;

export interface NewStudent {
  fio: string;
  project: string;
  badges: string[];
  group: string;
  directionTags: string[];
  course: string;
  techStack: string[];
  about: string;
  email: string;
  phone: string;
  username: string;
  website: string;
  age: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: NewStudent) => void;
}

const AVAILABLE_DIRECTIONS = ["Frontend", "Backend", "UX/UI"];

const AddStudentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onAddStudent,
}) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [directionTags, setDirectionTags] = useState<string[]>(["Frontend"]);
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [techTags, setTechTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [project, setProject] = useState("");
  const [group, setGroup] = useState("");

  const resetForm = () => {
    setFullName("");
    setDirectionTags(["Frontend"]);
    setAge("");
    setCourse("");
    setWebsite("");
    setUsername("");
    setEmail("");
    setPhone("");
    setAbout("");
    setTechTags([]);
    setTagInput("");
    setProject("");
    setGroup("");
  };

  const handleSave = () => {
    if (!fullName.trim()) {
      alert("Пожалуйста, введите ФИО");
      return;
    }
    if (directionTags.length === 0) {
      alert("Выберите хотя бы одно направление");
      return;
    }
    if (!course) {
      alert("Выберите курс");
      return;
    }
    if (!group.trim()) {
      alert("Введите группу");
      return;
    }

    const courseNumber = course.replace(/\D/g, "");
    const badges = directionTags.map((dir) => `${dir} ${courseNumber}`);
    const ageNumber = age ? parseInt(age, 10) : 0;

    const newStudent: NewStudent = {
      fio: fullName.trim(),
      project: project.trim() || "ПАЗЛ",
      badges,
      group: group.trim(),
      directionTags,
      course,
      techStack: techTags,
      about: about.trim(),
      email: email.trim(),
      phone: phone.trim(),
      username: username.trim(),
      website: website.trim(),
      age: ageNumber,
    };

    onAddStudent(newStudent);
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <HeaderLeft>
            <BackButton onClick={onClose}>
              <img src={ArrowBackIcon} alt="назад" width={24} height={24} />
            </BackButton>
            <Title>Пользователь</Title>
          </HeaderLeft>
          <HeaderActions>
            <ActionIconButton>
              <img src={PencilIcon} alt="редактировать" width={16} height={16} />
            </ActionIconButton>
            <ActionIconButton2>
              <img src={DeleteIcon} alt="удалить" width={16} height={16} />
            </ActionIconButton2>
          </HeaderActions>
        </ModalHeader>

        <AvatarWrapper>
          <Avatar src={AvatarSrc} alt="avatar" />
        </AvatarWrapper>

        <Form>
          <FullWidthField>
            <Field>
              <FieldLabel isFocused={focusedField === "fullName"}>
                ФИО
              </FieldLabel>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onFocus={() => setFocusedField("fullName")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "fullName"}
                placeholder=" "
              />
            </Field>
          </FullWidthField>

          <FullWidthField>
            <Field>
              <FieldLabel isFocused={focusedField === "direction"}>
                Направление
              </FieldLabel>
              <CheckboxGroup
                isFocused={focusedField === "direction"}
                onFocus={() => setFocusedField("direction")}
                onBlur={() => setFocusedField(null)}
              >
                <CheckboxList>
                  {AVAILABLE_DIRECTIONS.map((dir) => {
                    const checked = directionTags.includes(dir);
                    return (
                      <CheckboxItem key={dir} checked={checked}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setDirectionTags((prev) => [...prev, dir]);
                            } else {
                              setDirectionTags((prev) =>
                                prev.filter((d) => d !== dir)
                              );
                            }
                          }}
                        />
                        <span>{dir}</span>
                      </CheckboxItem>
                    );
                  })}
                </CheckboxList>
              </CheckboxGroup>
            </Field>
          </FullWidthField>

          <Grid>
            <Field>
              <FieldLabel isFocused={focusedField === "age"}>Возраст</FieldLabel>
              <Input
                type="number"
                min={14}
                max={25}
                value={age}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || (+val >= 14 && +val <= 25)) {
                    setAge(val);
                  }
                }}
                onFocus={() => setFocusedField("age")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "age"}
                placeholder=" "
              />
            </Field>

            <Field>
              <FieldLabel isFocused={focusedField === "course"}>Курс</FieldLabel>
              <Select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                onFocus={() => setFocusedField("course")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "course"}
              >
                <option value="" disabled>
                  Выбери курс
                </option>
                <option value="1 курс">1 курс</option>
                <option value="2 курс">2 курс</option>
                <option value="3 курс">3 курс</option>
                <option value="4 курс">4 курс</option>
              </Select>
            </Field>

            <Field>
              <FieldLabel isFocused={focusedField === "website"}>
                Ссылка на портфолио
              </FieldLabel>
              <Input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                onFocus={() => setFocusedField("website")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "website"}
                placeholder=""
              />
            </Field>

            <Field>
              <FieldLabel isFocused={focusedField === "username"}>
                Username
              </FieldLabel>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocusedField("username")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "username"}
                placeholder=" "
              />
            </Field>

            <Field>
              <FieldLabel isFocused={focusedField === "email"}>
                Почта
              </FieldLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "email"}
                placeholder=" "
              />
            </Field>

            <Field>
              <FieldLabel isFocused={focusedField === "phone"}>
                Телефон
              </FieldLabel>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "phone"}
                placeholder=" "
              />
            </Field>

            <Field>
              <FieldLabel isFocused={focusedField === "project"}>
                Проект
              </FieldLabel>
              <Input
                value={project}
                onChange={(e) => setProject(e.target.value)}
                onFocus={() => setFocusedField("project")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "project"}
                placeholder=" "
              />
            </Field>

            <Field>
              <FieldLabel isFocused={focusedField === "group"}>
                Группа
              </FieldLabel>
              <Input
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                onFocus={() => setFocusedField("group")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "group"}
                placeholder="например: пэз пд09"
              />
            </Field>
          </Grid>

          <FullWidth>
            <Field>
              <FieldLabel isFocused={focusedField === "about"}>
                О себе
              </FieldLabel>
              <TextareaWrapper isFocused={focusedField === "about"}>
                <Textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  onFocus={() => setFocusedField("about")}
                  onBlur={() => setFocusedField(null)}
                  rows={3}
                />
              </TextareaWrapper>
            </Field>
          </FullWidth>

          <FullWidth>
            <Field>
              <FieldLabel isFocused={focusedField === "techStack"}>
                Стек технологий
              </FieldLabel>
              <TagsBox
                isFocused={focusedField === "techStack"}
                onFocus={() => setFocusedField("techStack")}
                onBlur={() => setFocusedField(null)}
              >
                {techTags.map((tag) => (
                  <TechTag key={tag}>
                    #{tag}
                    <RemoveTag
                      onClick={() =>
                        setTechTags((prev) => prev.filter((t) => t !== tag))
                      }
                    >
                      ×
                    </RemoveTag>
                  </TechTag>
                ))}
              </TagsBox>
              <TechInput
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Напишите технологию и нажмите Enter или запятую"
                isFocused={focusedField === "techStackInput"}
                onFocus={() => setFocusedField("techStackInput")}
                onBlur={() => setFocusedField(null)}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
                    e.preventDefault();
                    const val = tagInput.trim();
                    if (!techTags.includes(val)) {
                      setTechTags([...techTags, val]);
                    }
                    setTagInput("");
                  }
                }}
              />
            </Field>
          </FullWidth>
        </Form>

        <ModalFooter>
          <CancelButton onClick={onClose}>Отменить</CancelButton>
          <SaveButton onClick={handleSave}>
            <img src={PlusIconSrc}  width={16} height={16} style={{ marginRight: '6px' }}/>
            Сохранить
          </SaveButton>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};

export default AddStudentModal;