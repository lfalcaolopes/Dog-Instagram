import styled from "styled-components";
import { StyledTitle, StyledAccountButtons } from "./MyStyledComponents";
import { MouseEvent, ReactNode, useEffect, useState } from "react";
import { Adicionar } from "../Assets/adicionar";
import { Feed } from "../Assets/feed";
import { Estatisticas } from "../Assets/estatisticas";
import { Sair } from "../Assets/sair";
import { NavLink, Outlet } from "react-router-dom";

interface props {
  titleText: string;
}

function AccountHeader({ titleText }: props) {
  const buttons = document.querySelectorAll("button");
  const [clickedButton, setClickedButton] = useState<HTMLAnchorElement>();

  useEffect(() => {
    buttons.forEach((otherButton) => {
      otherButton.classList.remove("active");
    });
    clickedButton?.classList.add("active");
  }, [clickedButton]);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    console.log(event.currentTarget);
    setClickedButton(event.currentTarget);
  }

  return (
    <Wrapper>
      <StyledTitle>{titleText}</StyledTitle>
      <StyledAccountButtons>
        <NavLink to="/conta/geral" onClick={handleClick}>
          {({ isActive }: { isActive: boolean }) => <Feed fill={isActive ? "#fb1" : ""} />}
        </NavLink>
        <NavLink to="/conta/estatisticas" onClick={handleClick}>
          {({ isActive }: { isActive: boolean }) => <Estatisticas fill={isActive ? "#fb1" : ""} />}
        </NavLink>
        <NavLink to="/conta/postar" onClick={handleClick}>
          {({ isActive }: { isActive: boolean }) => <Adicionar fill={isActive ? "#fb1" : ""} />}
        </NavLink>
        <NavLink to="/login" onClick={handleClick}>
          {({ isActive }: { isActive: boolean }) => <Sair fill={isActive ? "#fb1" : ""} />}
        </NavLink>
      </StyledAccountButtons>
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default AccountHeader;
