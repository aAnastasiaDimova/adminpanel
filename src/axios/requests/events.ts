import type { EventItem } from "../../types/events";
import apiClient from "../axios";
import { GET_EVENTS } from "../endpoints";

////////// Взаимодействие с ивентами //////////

// Получение всех ивентов
export const getEvents = async (): Promise<EventItem[]> => {
  const response = await apiClient.get(GET_EVENTS);
  return response.data;
};
