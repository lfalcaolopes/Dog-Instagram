import styled from "styled-components";
import Dogs from "../Assets/dogs.svg";
import Usuario from "../Assets/usuario.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

function Header() {
  const userContext = useContext(GlobalContext);
  let nameOrLogin;
  let route;

  if (userContext?.dadosUser) {
    const name = userContext.dadosUser.user_display_name;

    nameOrLogin = name[0].toUpperCase() + name.substring(1);
    route = "/conta/geral";
  } else {
    nameOrLogin = "Login / Criar";
    route = "login";
  }

  return (
    <>
      <Wrapper>
        <div className="header-elements">
          <Link to="/">
            <img src={Dogs} alt="" />
          </Link>
        </div>
        <div className="header-elements">
          <Link to={route}>
            {nameOrLogin}
            <img src={Usuario} className="usuario-img" alt="" />
          </Link>
        </div>
      </Wrapper>
      {/* <hr /> */}
    </>
  );
}

const Wrapper = styled.div`
  padding: 0 25%;
  height: 4rem;
  z-index: 50;
  background-color: hsl(0, 0%, 90%);
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.2);

  position: sticky;
  top: 0;

  display: flex;
  justify-content: space-between;

  .header-elements {
    display: flex;
    align-items: center;
  }

  a {
    color: #454545;
    padding: 5px;
    text-decoration: none;

    .usuario-img {
      margin-left: 0.5rem;
    }
  }
`;

export default Header;
