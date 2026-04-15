import type { EventItem, FormValues } from "../../types/events";
import apiClient from "../axios";
import {
  CREATE_EVENT,
  DELETE_EVENT,
  GET_EVENT,
  GET_EVENTS,
  UPDATE_EVENT,
} from "../endpoints";

export const getEvents = async (): Promise<EventItem[]> => {
  const response = await apiClient.get(GET_EVENTS);
  return response.data;
};
export const getEventsById = async (id: string): Promise<EventItem> => {
  const response = await apiClient.get(`${GET_EVENT}/${id}`);
  return response.data;
};
export const changeEventById = async (
  id: string,
  data: EventItem,
): Promise<EventItem> => {
  await apiClient.put(`${UPDATE_EVENT}/${id}`, data);
  return data;
};
export const createEvent = async (data: FormValues): Promise<FormValues> => {
  await apiClient.post(CREATE_EVENT, data);
  return data;
};
export const deleteEventById = async (id: string): Promise<void> => {
  await apiClient.delete(`${DELETE_EVENT}/${id}`);
};
