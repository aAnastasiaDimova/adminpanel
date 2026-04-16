export type Direction = 0 | 1;
export type Course = 1 | 2 | 3 | 4;
export type UserRole = 0 | 1 | 2;

export type UserDto = {
  id: string;
  username: string;
  email: string;
  name: string;
  surname: string;
  patronymic?: string | null;
  description?: string | null;
  telegramLink: string;
  portfolioLink: string;
  isSubscribedToNotifications: boolean;
  age?: number | null;
  directions: Direction[];
  course: Course;
  skills: string[];
  userRole: UserRole;
  avatarUrl?: string | null;
};

export type UserTableRow = {
  id: string;
  fio: string;
  username: string;
  project: string;
  badges: string[];
};

export type UserFormValues = {
  username: string;
  email: string;
  name: string;
  surname: string;
  patronymic: string;
  description: string;
  telegramLink: string;
  portfolioLink: string;
  isSubscribedToNotifications: boolean;
  age: number | null;
  directions: (0 | 1)[];
  course: 1 | 2 | 3 | 4;
  skills: string[];
  userRole: 0 | 1 | 2;
  avatarUrl: string;
};