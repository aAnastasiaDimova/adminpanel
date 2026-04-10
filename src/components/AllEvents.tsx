import type { EventItem } from "../types/events";
import { useStore } from "../store/storeProvider";
import { observer } from "mobx-react-lite";
import { useEvents } from "../hooks/events/useEvents";
import { Loader } from "./loader";
import { EventSection } from "./EventSection";
import { PageContainer } from "../styles/global";
import { HeaderPage } from "./HeaderPage";
import { Pagination } from "./pagination";
import { EventsContainer } from "../styles/styles.events";

const AllEvents = observer(() => {
  const { eventsStore } = useStore();
  const { isLoading } = useEvents();

  const events = eventsStore.events;

  const allTypes = [
    "Олимпиада",
    "Конкурс",
    "Стажировка",
    "Вакансия",
    "События",
  ];

  const eventsByType: Record<string, EventItem[]> = {};
  allTypes.forEach((type) => {
    eventsByType[type] = events.filter((e) => e.type === type);
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PageContainer>
      <HeaderPage title="Ивенты" textButton="Создать ивент" />
      <EventsContainer>
        <EventSection events={events} />
      </EventsContainer>
      <Pagination />
    </PageContainer>
  );
});

export default AllEvents;
