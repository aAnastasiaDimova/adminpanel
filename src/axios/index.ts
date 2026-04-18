import { getCurrentUser, signIn, signOut } from "./requests/auth";
import { getAllUsers, getUserById, registerUser, updateUser } from "./requests/users";
import {
  changeEventById,
  createEvent,
  deleteEventById,
  getEvents,
  getEventsById,
} from "./requests/events";

export const API = {
  auth: {
    signIn,
    signOut,
    getCurrentUser,
  },
  users: {
    getAllUsers,
    getUserById,
    updateUser,
    registerUser
  },
  events: {
    getEvents,
    getEventsById,
    changeEventById,
    createEvent,
    deleteEventById,
  },
};
