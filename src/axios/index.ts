import { getCurrentUser, signIn, signOut } from "./requests/auth";
import { getAllUsers } from "./requests/users";
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
  },
  events: {
    getEvents,
    getEventsById,
    changeEventById,
    createEvent,
    deleteEventById,
  },
};