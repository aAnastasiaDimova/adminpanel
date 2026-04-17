import { COURSE_LABELS, DIRECTION_LABELS } from "./user.constants";
import type { UserDto, UserFormValues, UserTableRow } from "./user";

export const getUserFio = (user: UserDto): string =>
  [user.surname, user.name, user.patronymic].filter(Boolean).join(" ");

export const getMockProject = (user: UserDto): string => {
  return user.course <= 2 ? "ПАЗЛ" : "КОД";
};

export const mapUserToTableRow = (user: UserDto): UserTableRow => {
  const directions = user.directions ?? [];
  const courseLabel = COURSE_LABELS[user.course] ?? `${user.course} курс`;

  const badges =
    directions.length > 0
      ? directions.map(
          (direction) => `${DIRECTION_LABELS[direction]} ${courseLabel}`,
        )
      : [`Не указано ${courseLabel}`];

  return {
    id: user.id,
    fio: getUserFio(user),
    username: user.username,
    project: getMockProject(user),
    badges,
    age: user.age ?? null,
    telegramLink: user.telegramLink,
  };
};

export const mapUserToFormValues = (user: UserDto): UserFormValues => ({
  username: user.username,
  email: user.email,
  name: user.name,
  surname: user.surname,
  patronymic: user.patronymic ?? "",
  description: user.description ?? "",
  telegramLink: user.telegramLink,
  portfolioLink: user.portfolioLink,
  isSubscribedToNotifications: user.isSubscribedToNotifications,
  age: user.age ?? null,
  directions: user.directions,
  course: user.course,
  skills: user.skills,
  userRole: user.userRole,
  avatarUrl: user.avatarUrl ?? "",
});