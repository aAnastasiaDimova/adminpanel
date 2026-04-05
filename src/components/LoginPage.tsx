import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import bgrd from "../assets/bgrd.png";

const MOCK_LOGIN = "admin@mail.ru";
const MOCK_PASSWORD = "admin12345";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${bgrd});
  background-size: cover;
  background-position: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Card = styled.div`
  width: 100%;
  max-width: 380px;
  background: white;
  border-radius: 16px;
  padding: 78px 49px;
  box-shadow: 0 115px 108.7px 0 rgba(0, 0, 0, 0.1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 3px;
    background: linear-gradient(90deg, #7086F3, #1E7EE8);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0.2;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 44px;
  color: #1a1a1a;
  font-weight: 600;
`;

const Form = styled.form``;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding: 16px 18px;
  border: 2px solid #AAD3FF;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  ${({ error }) => error && `border-color: #c53939;`}
`;

const Label = styled.label`
  position: absolute;
  left: 18px;
  top: -10px;
  background: white;
  padding: 0 6px;
  font-size: 14px;
  color: #A2ACB0;
  font-weight: 600;
  z-index: 1;
`;

const SubmitButton = styled.button`
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

const ErrorMessage = styled.div`
  color: #c53939;
  text-align: center;
  margin: 16px 0;
  font-size: 14.5px;
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (login === MOCK_LOGIN && password === MOCK_PASSWORD) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/users', { replace: true });
    } else {
      setAuthMessage("Неверный логин или пароль");
    }
  };

  return (
    <Container>
      <Card>
        <Title>Вход в систему</Title>

        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              type="email"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder=" "
            />
            <Label>Почта</Label>
          </InputWrapper>

          <InputWrapper>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
            />
            <Label>Пароль</Label>
          </InputWrapper>

          {authMessage && <ErrorMessage>{authMessage}</ErrorMessage>}

          <SubmitButton type="submit">Войти</SubmitButton>
        </Form>
      </Card>
    </Container>
  );
};

export default LoginPage;