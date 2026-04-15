import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import ExitIcon from "../../../assets/exit.svg";
import * as S from "./styles.filterModal";

interface PropsModal {
  isOpen: boolean;
  onClose: () => void;
}

const typesParser = parseAsArrayOf(parseAsString).withDefault([]);

export const FilterModalEvents = ({ isOpen, onClose }: PropsModal) => {
  const [selectedTypes, setSelectedTypes] = useQueryState(
    "eventTypes",
    typesParser,
  );
  const [startDate, setStartDate] = useQueryState(
    "startDate",
    parseAsString.withDefault(""),
  );
  const [endDate, setEndDate] = useQueryState(
    "endDate",
    parseAsString.withDefault(""),
  );

  const isTypeSelected = (type: string) => {
    return selectedTypes?.includes(type) ?? false;
  };
  const allTypes = [
    "События",
    "Конкурс",
    "Олимпиада",
    "Стажировка",
    "Вакансия",
  ];
  const handleTypeChange = (type: string, checked: boolean) => {
    const currentTypes = selectedTypes ?? [];

    if (checked) {
      setSelectedTypes([...currentTypes, type]);
    } else {
      setSelectedTypes(currentTypes.filter((t) => t !== type));
    }
  };

  const handleApply = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <S.Overlay onClick={onClose} />

      <S.ModalContainer>
        <S.Header>
          <S.ColumnTitle>Тип ивента</S.ColumnTitle>
          <S.CloseButton onClick={onClose}>
            <img src={ExitIcon} alt="close" width={24} height={24} />
          </S.CloseButton>
        </S.Header>

        <S.Content>
          <S.Section>
            {allTypes?.slice(0, 3).map((type) => (
              <S.CheckboxLabel key={type}>
                <S.StyledCheckbox
                  type="checkbox"
                  checked={isTypeSelected(type)}
                  onChange={(e) => handleTypeChange(type, e.target.checked)}
                />
                {type}
              </S.CheckboxLabel>
            ))}
          </S.Section>
          <S.Section>
            {allTypes?.slice(3).map((type) => (
              <S.CheckboxLabel key={type}>
                <S.StyledCheckbox
                  type="checkbox"
                  checked={isTypeSelected(type)}
                  onChange={(e) => handleTypeChange(type, e.target.checked)}
                />
                {type}
              </S.CheckboxLabel>
            ))}
          </S.Section>
        </S.Content>

        <S.SectionTitle>Даты</S.SectionTitle>
        <S.Content>
          <S.InputWrapper>
            <S.InputDate
              type="date"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <S.Label>Начало</S.Label>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.InputDate
              type="date"
              value={endDate || ""}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <S.Label>Завершение</S.Label>
          </S.InputWrapper>
        </S.Content>
        <S.ApplyButton onClick={handleApply}>Применить</S.ApplyButton>
      </S.ModalContainer>
    </>
  );
};
