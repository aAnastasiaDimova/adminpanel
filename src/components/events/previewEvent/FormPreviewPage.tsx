import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../../store/storeProvider";
import { PageContainer } from "../../../styles/global";
import { HeaderEvent } from "../eventForm/HeaderEvent";
import { useEventForm } from "../../../hooks/events/useEventForm";

export const FormPreviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const { eventsStore } = useStore();
  const event = eventsStore.getEventById(id ? id : "");
  const { handleDelete } = useEventForm(event);
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("edit");
  };
  return (
    <PageContainer>
      <HeaderEvent title="" />
      <button onClick={handleDelete}>Удалить</button>
      <button onClick={handleEdit}>Редактировать</button>
    </PageContainer>
  );
};
