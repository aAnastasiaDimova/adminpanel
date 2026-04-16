import type { EventItem } from "../../../types/events";
import * as S from "../../../styles/login.style";

export const EventPreview = (event: EventItem) => {
  return (
    <>
      <S.ImageContainer>
        <S.Image></S.Image>
        <S.Image></S.Image>
        <S.Image></S.Image>
        <S.Image></S.Image>
      </S.ImageContainer>
    </>
  );
};
