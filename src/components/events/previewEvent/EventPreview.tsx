import type { EventItem } from "../../../types/events";
import * as S from "../../../styles/login.style";
import * as E from "../../../styles/style.previewEvent";
import { useNavigate } from "react-router-dom";
import { useEventForm } from "../../../hooks/events/useEventForm";
import { formatDateRange } from "../../../utils/formatDateRange";
import { formatDate } from "../../../utils/formatDate";
import styled from "@emotion/styled";

export const EventPreview = ({ event }: { event: EventItem | undefined }) => {
  const { handleDelete } = useEventForm(event);
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("edit");
  };

  let dateTimeDisplay = "";
  if (event?.endDate) {
    dateTimeDisplay = formatDateRange(event.startDate, event.endDate);
  } else if (event?.startDate) {
    dateTimeDisplay = formatDate(event.startDate);
  }

  return (
    <E.PreviewPageWrapper>
      <E.PreviewContent>
        <S.ImageContainer>
          <S.Image />
          <S.Image />
          <S.Image />
          <S.Image />
        </S.ImageContainer>

        <S.Title style={{ textAlign: "left", marginBottom: "26px" }}>
          {event?.title}
        </S.Title>

        {dateTimeDisplay && <E.DateTime>{dateTimeDisplay}</E.DateTime>}

        <E.Description>{event?.description}</E.Description>

        <E.ButtonsContainer>
          <DeleteBtn type="button" onClick={handleDelete}>
            Удалить
          </DeleteBtn>
          <EditBtn type="button" onClick={handleEdit}>
            Редактировать
          </EditBtn>
        </E.ButtonsContainer>
      </E.PreviewContent>
    </E.PreviewPageWrapper>
  );
};

const DeleteBtn = styled(S.SubmitButton)`
  font-size: 17px;
  font-weight: 600;
  background: #e5393533;
  color: #e53935b2;
  width: 50%;
  margin-top: 0;

  &:hover {
    background: #e539354d;
  }
`;

const EditBtn = styled(S.SubmitButton)`
  font-size: 17px;
  font-weight: 600;
  background:
    linear-gradient(90deg, #7086f3 0%, #1e7ee8 100%),
    linear-gradient(0deg, #007aff, #007aff);
  color: white;
  width: 50%;
  margin-top: 0;
`;
