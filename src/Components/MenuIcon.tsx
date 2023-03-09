import { List } from "@phosphor-icons/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import { Adicionar } from "../Assets/adicionar";
import { Feed } from "../Assets/feed";
import { Sair } from "../Assets/sair";
import { GlobalContext } from "../GlobalContext";

function MenuIcon() {
  const userContext = useContext(GlobalContext);

  function logout() {
    userContext?.setDadosUser(undefined);
  }

  return (
    <DropdownMenu.Root>
      <Menu>
        <DropdownMenu.Trigger asChild>
          <button className="IconButton" aria-label="Customise options">
            <List size={28} />
          </button>
        </DropdownMenu.Trigger>
      </Menu>

      <DropdownMenu.Portal className="portal">
        <MenuStyle>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
            <DropdownMenu.Item className="DropdownMenuItem">
              <NavLink to="/conta/geral">
                {({ isActive }: { isActive: boolean }) => (
                  <div>
                    <Feed fill={isActive ? "#fb1" : ""} />
                    <p>Minha conta</p>
                  </div>
                )}
              </NavLink>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="DropdownMenuItem">
              <NavLink to="/conta/postar">
                {({ isActive }: { isActive: boolean }) => (
                  <div>
                    <Adicionar fill={isActive ? "#fb1" : ""} />
                    <p>Postar foto</p>
                  </div>
                )}
              </NavLink>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="DropdownMenuItem">
              <NavLink to="/login" onClick={logout}>
                {({ isActive }: { isActive: boolean }) => (
                  <div>
                    <Sair fill={isActive ? "#fb1" : ""} />
                    <p>Sair</p>
                  </div>
                )}
              </NavLink>
            </DropdownMenu.Item>
            <Outlet />
          </DropdownMenu.Content>
        </MenuStyle>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

const Menu = styled.div`
  button {
    all: unset;
  }

  .IconButton {
    font-family: inherit;
    border-radius: 100%;
    height: 2.5rem;
    width: 2.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fb1;
    background-color: white;
    box-shadow: 0 2px 10px grey;
  }
  .IconButton:hover {
    background-color: #fff3d4;
  }
`;

const MenuStyle = styled.div`
  .DropdownMenuContent {
    min-width: 150px;
    background-color: white;
    border-radius: 6px;
    padding: 5px;
    box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  }

  .DropdownMenuItem {
    font-size: 1rem;
    display: flex;
    align-items: center;
    padding: 0.3rem;
    position: relative;

    font-family: "Roboto", sans-serif;

    div {
      display: flex;
      align-items: center;
      width: 100%;
    }

    svg {
      margin-right: 0.5rem;
    }

    a {
      text-decoration: none;
      justify-content: center;
      color: #2e2e2e;
      flex: 1;
    }
  }

  .DropdownMenuItem[data-highlighted] {
    background-color: #fff3d4;
  }
`;

export default MenuIcon;
