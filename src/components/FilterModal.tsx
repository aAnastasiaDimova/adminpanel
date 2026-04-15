import React from "react";
import ExitIcon from "../assets/exit.svg";
import * as S from "../styles/styles.filterModal";

const FilterModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <S.Overlay onClick={onClose} />

      <S.ModalContainer>
        <S.Header>
          <S.ColumnTitle>Проект</S.ColumnTitle>
          <S.ColumnTitle>Курс</S.ColumnTitle>
          <S.CloseButton onClick={onClose}>
            <img src={ExitIcon} alt="close" width={24} height={24} />
          </S.CloseButton>
        </S.Header>

        <S.Content>
          <S.Section>
            <S.CheckboxLabel>
              <S.StyledCheckbox type="checkbox" defaultChecked /> ПАЗЛ
            </S.CheckboxLabel>
            <S.CheckboxLabel>
              <S.StyledCheckbox type="checkbox" defaultChecked /> КОД
            </S.CheckboxLabel>
          </S.Section>

          <S.Section>
            {[1, 2, 3, 4].map((n) => (
              <S.CheckboxLabel key={n}>
                <S.StyledCheckbox type="checkbox" defaultChecked /> {n}
              </S.CheckboxLabel>
            ))}
          </S.Section>
        </S.Content>

        <S.BottomBar>
          <div>
            <S.SectionTitle>Направление</S.SectionTitle>
            <S.CheckboxLabel>
              <S.StyledCheckbox type="checkbox" defaultChecked /> Frontend
            </S.CheckboxLabel>
            <S.CheckboxLabel>
              <S.StyledCheckbox type="checkbox" defaultChecked /> Backend
            </S.CheckboxLabel>
            <S.CheckboxLabel>
              <S.StyledCheckbox type="checkbox" defaultChecked /> UX/UI Дизайн
            </S.CheckboxLabel>
          </div>

          <S.ApplyButton onClick={onClose}>Применить</S.ApplyButton>
        </S.BottomBar>
      </S.ModalContainer>
    </>
  );
};

export default FilterModal;
