import { useStore } from "../../store/storeProvider";
import { observer } from "mobx-react-lite";
import { useEvents } from "../../hooks/events/useEvents.ts";
import { Loader } from "../loader";
import { EventSection } from "./EventSection";
import { PageContainer } from "../../styles/global";
import { HeaderPage } from "../HeaderPage";
import { Pagination } from "../Pagination";
import { EventsContainer } from "../../styles/styles.events";
import { useState, useCallback, useMemo, useEffect } from "react";
import styled from "@emotion/styled";
import { useQueryState } from "nuqs";
import { FilterModalEvents } from "./modal/FilterModalEvents";
import { useNavigate } from "react-router-dom";

const AllEvents = observer(() => {
  const { isLoading } = useEvents();
  const { eventsStore } = useStore();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [typeItems, setTypeItems] = useQueryState("type", {
    defaultValue: "События",
  });

  useEffect(() => {
    eventsStore.setCurrentType(typeItems || "События");
  }, [typeItems, eventsStore]);

  const allTypes = useMemo(
    () => [
      "Все",
      "События",
      "Конкурс",
      "Олимпиада",
      "Стажировка",
      "Вакансия",
      "Архив",
    ],
    [],
  );

  const handleType = useCallback(
    (type: string) => {
      setTypeItems(type);
    },
    [setTypeItems],
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <HeaderPage
        title="Ивенты"
        textButton="Создать ивент"
        onClickFilter={() => setIsFilterOpen(true)}
        onClickAddModal={() => navigate("/events/create")}
      />
      <TypeEventsContainer>
        <TypesEvent>
          {allTypes.map((type) => (
            <TypeItem
              key={type}
              active={type === typeItems}
              onClick={() => handleType(type)}
            >
              {type}
            </TypeItem>
          ))}
        </TypesEvent>
      </TypeEventsContainer>
      <EventsContainer>
        <EventSection events={eventsStore.filteredEvents} />
      </EventsContainer>
      <Pagination />

      <FilterModalEvents
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </PageContainer>
  );
});

export default AllEvents;
const TypeEventsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 20px;
`;
const TypesEvent = styled.div`
  padding: 5px;
  display: flex;
`;
const TypeItem = styled.div<{ active?: boolean }>`
  padding: 6px 24px;
  cursor: pointer;
  ${(p) =>
    p.active &&
    `
    background: #FFFFFF;
    border: 0.5px solid #0000000A;
    box-shadow: 0px 3px 1px 0px #0000000A;
    box-shadow: 0px 3px 8px 0px #0000001F;
    border-radius: 7px;
  `}
`;
