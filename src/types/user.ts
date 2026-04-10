export interface UserProfile {
  portfolioLink: string;
  patronymic: string;
  surname: string;
  userRole: number;
  name: string;
  telegramLink: string;
  description: string;
  id: string;
  fullName: string;
  age: number;
  direction: number;
  course?: string;
  avatarUrl?: string;
  website?: string;
  username: string;
  email: string;
  phone?: string;
  about?: string;
  techStack?: string[];
  birthDate?: string;
  university?: string;
  faculty?: string;
  graduationYear?: number;
  skills?: string[];
  experience?: string;
  location?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    telegram?: string;
  };
}
