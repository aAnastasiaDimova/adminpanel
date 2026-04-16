import { COURSE_LABELS, DIRECTION_LABELS } from "./user.constants";
import type { UserDto, UserTableRow } from "./user";

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