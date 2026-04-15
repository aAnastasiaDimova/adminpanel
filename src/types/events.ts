export type EventItem = {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  organization?: string;
  hardSkills?: Array<string> | undefined;
  position?: string;
  description?: string;
  eventType: number;
  isNew?: boolean;
  tags?: string[];
  imageUrl?: string;
  type?: string;
};
type eventType = number | undefined;
export type FormValues = Omit<EventItem, "id">;

export const eventTypeMap: Record<number, string> = {
  0: "События",
  1: "Конкурс",
  2: "Олимпиада",
  3: "Стажировка",
  4: "Вакансия",
};

export const mapEventType = (type: eventType): string => {
  if (type === undefined) return "События";
  return eventTypeMap[type] || "События";
};

export type FieldType =
  | "text"
  | "textarea"
  | "datetime-local"
  | "select"
  | "skills";

export interface IField {
  name: keyof FormValues;
  label: string;
  type: FieldType;
}

export const eventFieldsConfig: Record<number, IField[]> = {
  0: [
    { name: "title", label: "Название", type: "text" },
    { name: "organization", label: "Организация", type: "text" },
    { name: "startDate", label: "Дата начала", type: "datetime-local" },
    { name: "endDate", label: "Дата окончания", type: "datetime-local" },
    { name: "description", label: "Описание", type: "textarea" },
  ],
  1: [
    { name: "title", label: "Название", type: "text" },
    { name: "organization", label: "Организация", type: "text" },
    { name: "startDate", label: "Дата от", type: "datetime-local" },
    { name: "endDate", label: "Дата до", type: "datetime-local" },
    { name: "description", label: "Описание", type: "textarea" },
  ],
  2: [
    { name: "title", label: "Название", type: "text" },
    { name: "hardSkills", label: "Hard Skills", type: "skills" },
    { name: "startDate", label: "Дата начала", type: "datetime-local" },
    { name: "endDate", label: "Дата окончания", type: "datetime-local" },
    { name: "description", label: "Описание", type: "textarea" },
  ],
  3: [
    { name: "title", label: "Название", type: "text" },
    { name: "hardSkills", label: "Hard Skills", type: "skills" },
    { name: "position", label: "Рассматриваемая позиция", type: "text" },
    { name: "startDate", label: "Дата начала", type: "datetime-local" },
    { name: "endDate", label: "Дата окончания", type: "datetime-local" },
    { name: "description", label: "Описание", type: "textarea" },
  ],
  4: [
    { name: "title", label: "Название", type: "text" },
    { name: "position", label: "Рассматриваемая позиция", type: "text" },
    { name: "startDate", label: "Дата начала", type: "datetime-local" },
    { name: "endDate", label: "Дата окончания", type: "datetime-local" },
    { name: "description", label: "Описание", type: "textarea" },
  ],
};
