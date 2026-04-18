import { useParams } from "react-router-dom";
import { useStore } from "../../../store/storeProvider";
import { ContentWrapper, PageContainer } from "../../../styles/global";
import { HeaderEvent } from "../eventForm/HeaderEvent";
import { EventPreview } from "./EventPreview.tsx";

export const FormPreviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const { eventsStore } = useStore();
  const event = eventsStore.getEventById(id ? id : "");
  return (
    <PageContainer>
      <HeaderEvent title={event?.type ? event?.type : ""} />
      <ContentWrapper>
        <EventPreview event={event} />
      </ContentWrapper>
    </PageContainer>
  );
};
