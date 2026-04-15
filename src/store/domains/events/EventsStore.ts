import { makeAutoObservable, runInAction } from "mobx";
import type { EventItem } from "../../../types/events";

class EventsStore {
  events: EventItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadEvents(events: EventItem[]) {
    try {
      const data = events;
      runInAction(() => {
        this.events = data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  getEventById(id: string): EventItem | undefined {
    return this.events.find((i) => i.id === id);
  }

  getEventsByType(type: string): EventItem[] | undefined {
    return this.events.filter((i) => i.type === type);
  }
  addEvent(data: EventItem) {
    return (this.events = [...this.events, data]);
  }
  updateEvent(data: EventItem) {
    const index = this.events.findIndex((i) => i.id === data.id);
    if (index !== -1) {
      this.events[index] = data;
    }
  }
  deleteEvent(id: string) {
    this.events = this.events.filter((event) => event.id !== id);
  }
}
export default EventsStore;
