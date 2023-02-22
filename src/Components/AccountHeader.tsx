import styled from "styled-components";
import { StyledTitle, StyledAccountButtons } from "./MyStyledComponents";
import { MouseEvent, ReactNode, useContext, useEffect, useState } from "react";
import { Adicionar } from "../Assets/adicionar";
import { Feed } from "../Assets/feed";
import { Estatisticas } from "../Assets/estatisticas";
import { Sair } from "../Assets/sair";
import { NavLink, Outlet } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

interface props {
  titleText: string;
}

function AccountHeader({ titleText }: props) {
  const buttons = document.querySelectorAll("button");
  const [clickedButton, setClickedButton] = useState<HTMLAnchorElement>();
  const userContext = useContext(GlobalContext);

  useEffect(() => {
    buttons.forEach((otherButton) => {
      otherButton.classList.remove("active");
    });
    clickedButton?.classList.add("active");
  }, [clickedButton]);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    setClickedButton(event.currentTarget);
    if (event.currentTarget.className === "exit") {
      userContext?.setDadosUser(undefined);
    }
  }

  return (
    <Wrapper>
      <StyledTitle>{titleText}</StyledTitle>
      <StyledAccountButtons>
        <NavLink to="/conta/geral" onClick={handleClick}>
          {({ isActive }: { isActive: boolean }) => <Feed fill={isActive ? "#fb1" : ""} />}
        </NavLink>
        <NavLink to="/conta/postar" onClick={handleClick}>
          {({ isActive }: { isActive: boolean }) => <Adicionar fill={isActive ? "#fb1" : ""} />}
        </NavLink>
        <NavLink to="/login" className="exit" onClick={handleClick}>
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
