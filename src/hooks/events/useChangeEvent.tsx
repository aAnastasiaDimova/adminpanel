import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "../../store/storeProvider";
import { eventsKeys } from "../keys";
import { API } from "../../axios";
import { mapEventType } from "../../types/events";
import type { EventItem } from "../../types/events";

export const useChangeEvent = () => {
  const queryClient = useQueryClient();
  const { eventsStore } = useStore();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: EventItem }) => {
      const event = await API.events.changeEventById(id, data);
      const mappedEvent = {
        ...event,
        type: mapEventType(event.eventType),
      };
      return mappedEvent;
    },
    onSuccess: (updatedEvent, variables) => {
      eventsStore.updateEvent?.(updatedEvent);
      queryClient.invalidateQueries({
        queryKey: eventsKeys.byId(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: eventsKeys.all });
    },
  });
};
