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
      <hr />
    </>
  );
}

const Wrapper = styled.section`
  margin: 0 25%;
  height: 4rem;

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

  hr {
    /* border: 0;
    height: 1px;
    background-image: -webkit-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
    background-image: -moz-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
    background-image: -ms-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
    background-image: -o-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0); */

    /* -webkit-box-shadow: 0px 9px 11px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 9px 11px -10px rgba(0, 0, 0, 0.75); */
  }
`;

export default Header;
