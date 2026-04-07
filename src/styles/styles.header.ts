import styled from "@emotion/styled";

export const Header = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #09090b;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

export const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const SearchInput = styled.input`
  width: 90%;
  padding: 11px 16px 10px 48px;
  border: 1px solid #aad3ff;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  &::placeholder {
    color: #71717a;
  }
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
`;

export const FilterButton = styled.button`
  width: 48px;
  height: 48px;
  background: #007aff;
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const AddButton = styled.button`
  height: 48px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;
