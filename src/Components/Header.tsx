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
      <Margin>
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
      </Margin>
    </>
  );
}

const Margin = styled.div`
  width: 100%;
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.2);
  background-color: hsl(0, 0%, 90%);

  position: sticky;
  top: 0;

  z-index: 50;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 2rem;
  max-width: 50rem;

  display: flex;
  justify-content: space-between;

  height: 4rem;

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
