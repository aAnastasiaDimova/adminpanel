import React from 'react';
import styled from '@emotion/styled';

import ExitIcon from "../assets/exit.svg";


const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  right: 15%;
  top: 184px;
  width: 480px;
  height: 326px;          
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #aad3ff;
  z-index: 1001;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 20px 30px 0px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const ColumnTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #09090B;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

`;

const Content = styled.div`
  position: relative;
  flex: 1;
  padding: 22px 60px 0px; 
  display: flex;
  gap: 7px;  
  z-index: 2;      
`;

const Section = styled.div`
  flex: 1;
`;

const SectionTitle = styled.p`
  font-weight: 600;
  color: #09090B;
  margin-bottom: 12px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 18px;
  cursor: pointer;
  font-size: 14px;
  color: #111827;
  padding: 4px 0;
`;

const StyledCheckbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #007AFF;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  position: relative;

  &:checked {
    background: white;
  }

  &:checked::after {
    content: '✓';
    position: absolute;
    color: #007AFF;
    font-size: 16px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -52%);
  }
`;

const BottomBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 3;
   padding: 22px 30px 20px 60px; 
`;

const ApplyButton = styled.button`
  height: 40px;
  background: linear-gradient(135deg, #7086F3, #1E7EE8);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 65px;
  font-size: 14px;
  font-weight: 500;
  align-self: flex-end;
    cursor: pointer;
  
`;


const FilterModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose} />

      <ModalContainer>
        <Header>
          <ColumnTitle>Проект</ColumnTitle>
          <ColumnTitle>Курс</ColumnTitle>
          <CloseButton onClick={onClose}>
            <img src={ExitIcon} alt="close" width={24} height={24} />
          </CloseButton>
        </Header>

        <Content>
         <Section>
            <CheckboxLabel>
              <StyledCheckbox type="checkbox" defaultChecked /> ПАЗЛ
            </CheckboxLabel>
            <CheckboxLabel>
              <StyledCheckbox type="checkbox" defaultChecked /> КОД
            </CheckboxLabel>
          </Section>

          <Section>
            {[1, 2, 3, 4].map((n) => (
              <CheckboxLabel key={n}>
                <StyledCheckbox type="checkbox" defaultChecked /> {n}
              </CheckboxLabel>
            ))}
          </Section>
        </Content>


        <BottomBar>
          <div>
            <SectionTitle>Направление</SectionTitle>
            <CheckboxLabel>
              <StyledCheckbox type="checkbox" defaultChecked /> Frontend
            </CheckboxLabel>
            <CheckboxLabel>
              <StyledCheckbox type="checkbox" defaultChecked /> Backend
            </CheckboxLabel>
            <CheckboxLabel>
              <StyledCheckbox type="checkbox" defaultChecked /> UX/UI Дизайн
            </CheckboxLabel>
          </div>

          <ApplyButton onClick={onClose}>Применить</ApplyButton>
        </BottomBar>
      </ModalContainer>
    </>
  );
};

export default FilterModal;