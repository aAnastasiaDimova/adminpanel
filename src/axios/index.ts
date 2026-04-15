import { getCurrentUser, signIn, signOut } from "./requests/auth";
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
  events: {
    getEvents,
    getEventsById,
    changeEventById,
    createEvent,
    deleteEventById,
  },
};
