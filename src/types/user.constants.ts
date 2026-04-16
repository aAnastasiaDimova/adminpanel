import type { Course, Direction, UserRole } from "./user";

export const DIRECTION_LABELS: Record<Direction, string> = {
  0: "Frontend",
  1: "Backend",
};

export const COURSE_LABELS: Record<Course, string> = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
};

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  0: "Студент",
  1: "Ментор",
  2: "Администратор",
};

export const PROJECT_OPTIONS = ["ПАЗЛ", "КОД"] as const;