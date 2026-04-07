import { FilterIcon } from "../assets/icons";
import * as S from "../styles/styles.header";
import SearchIconSrc from "../assets/search.svg";
import PlusIconSrc from "../assets/plus.svg";

interface HeaderProps {
  title: string;
  textButton: string;
}

export const HeaderPage = ({ title, textButton }: HeaderProps) => {
  return (
    <>
      <S.Header>{title}</S.Header>
      <S.Controls>
        <S.SearchWrapper>
          <S.SearchIconWrapper>
            <img src={SearchIconSrc} alt="search" width={20} height={20} />
          </S.SearchIconWrapper>
          <S.SearchInput placeholder="Поиск" />
        </S.SearchWrapper>

        <S.FilterButton>
          <FilterIcon />
        </S.FilterButton>

        <S.AddButton>
          <img src={PlusIconSrc} alt="add" width={20} height={20} />
          {textButton}
        </S.AddButton>
      </S.Controls>
    </>
  );
};
