import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { EventItem } from "../../types/events";
import * as S from "../../styles/styles.eventsCard";
import { observer } from "mobx-react-lite";
import { formatDate } from "../../utils/formatDate";
import { getTimeToStart } from "../../utils/getTimeToStart";

type EventCardProps = EventItem;

const EventCard: React.FC<EventCardProps> = observer(
  ({ id, title, type, startDate, imageUrl }) => {
    const navigate = useNavigate();
    const [timeRemaining, setTimeRemaining] = useState<string>("");

    useEffect(() => {
      const updateTimer = () => {
        setTimeRemaining(getTimeToStart(startDate));
      };
      updateTimer();
      const interval = setInterval(updateTimer, 60000);
      return () => clearInterval(interval);
    }, [startDate]);

    return (
      <S.EventCardContainer onClick={() => navigate(`/events/${id}`)}>
        <S.EventsTimer>{timeRemaining}</S.EventsTimer>
        <S.EventImage imageUrl={imageUrl} eventType={type ? type : ""} />
        <S.EventInfo>
          <S.EventTitle>{title}</S.EventTitle>
          <S.DateText>{formatDate(startDate)}</S.DateText>
        </S.EventInfo>
      </S.EventCardContainer>
    );
  },
);

export default EventCard;
