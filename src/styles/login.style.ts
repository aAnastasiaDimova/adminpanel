import styled from "@emotion/styled";
import bgrd from "../assets/bgrd.png";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${bgrd});
  background-size: cover;
  background-position: center;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 380px;
  background: white;
  border-radius: 16px;
  padding: 78px 49px;
  box-shadow: 0 115px 108.7px 0 rgba(0, 0, 0, 0.1);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 3px;
    background: linear-gradient(90deg, #7086f3, #1e7ee8);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0.2;
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 44px;
  color: #1a1a1a;
  font-weight: 600;
`;

export const Form = styled.form``;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

export const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding: 16px 18px;
  border: 2px solid #aad3ff;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  ${({ error }) => error && `border-color: #c53939;`}
`;

export const Label = styled.label`
  position: absolute;
  left: 18px;
  top: -10px;
  background: white;
  padding: 0 6px;
  font-size: 14px;
  color: #a2acb0;
  font-weight: 600;
  z-index: 1;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-top: 80px;
  background: linear-gradient(90deg, #7086f3, #1e7ee8);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  color: #c53939;
  text-align: center;
  margin: 16px 0;
  font-size: 14.5px;
`;
