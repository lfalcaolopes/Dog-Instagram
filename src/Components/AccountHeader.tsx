import styled from "styled-components";
import { StyledTitle, StyledAccountButtons } from "./MyStyledComponents";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { Adicionar } from "../Assets/adicionar";
import { Feed } from "../Assets/feed";
import { Sair } from "../Assets/sair";
import { NavLink, Outlet } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import MenuIcon from "./MenuIcon";

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
      <StyledAccountButtons className="buttons">
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
      <div className="drop">
        <MenuIcon />
      </div>

      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .drop {
    display: none;
    margin: 3rem 0 1.5rem 1.5rem;
  }

  @media (max-width: 600px) {
    .buttons {
      display: none;
    }

    .drop {
      display: block;
    }
  }
`;

export default AccountHeader;
