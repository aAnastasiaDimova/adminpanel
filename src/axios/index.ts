import { getCurrentUser, signIn, signOut } from "./requests/auth";
import { getEvents } from "./requests/events";

export const API = {
  auth: {
    signIn,
    signOut,
    getCurrentUser,
  },
  events: {
    getEvents,
  },
};
