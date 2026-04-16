import type { Course, Direction, UserRole } from "./user";

export const DIRECTION_LABELS: Record<Direction, string> = {
  0: "Frontend",
  1: "Backend",
};

export const COURSE_LABELS: Record<Course, string> = {
  1: "1 курс",
  2: "2 курс",
  3: "3 курс",
  4: "4 курс",
};

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  0: "Студент",
  1: "Ментор",
  2: "Администратор",
};