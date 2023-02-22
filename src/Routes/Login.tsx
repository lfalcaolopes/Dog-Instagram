import { FormEvent, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import dogHat from "../Assets/login.jpg";
import { StyledForm, StyledTitle, StyledButton } from "../Components/MyStyledComponents";
import { GlobalContext } from "../GlobalContext";

function Login() {
  const userContext = useContext(GlobalContext);
  const user = useRef<HTMLInputElement>(null);
  const pass = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const username = user.current?.value;
    const password = pass.current?.value;

    const response = await fetch(`https://dogsapi.origamid.dev/json/jwt-auth/v1/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const json = await response.json();

    const responseUser = await fetch(`https://dogsapi.origamid.dev/json/api/user`, {
      headers: {
        Authorization: `Bearer ${json.token}`,
      },
    });

    const jsonUser = await responseUser.json();

    userContext?.setDadosUser({ ...json, id: jsonUser.id });

    navigate("/conta/geral");
  }

  return (
    <Wrapper>
      <div className="image-side">
        <img src={dogHat} alt="Dog with a hat" />
      </div>
      <div className="form-side">
        <div className="login">
          <StyledTitle>Login</StyledTitle>
          <StyledForm onSubmit={handleSubmit}>
            <label>
              <p>Usuário</p>
              <input type="text" ref={user} size={40} />
            </label>
            <label>
              <p>Senha</p>
              <input type="password" ref={pass} size={40} />
            </label>
            <StyledButton>Entrar</StyledButton>
          </StyledForm>

          <a href="#">Perdeu a Senha?</a>
        </div>

        <div className="cadastro">
          <StyledTitle>Cadastre-se</StyledTitle>
          <p>Ainda não possui conta? cadastre-se</p>
          <Link to="criar">
            <StyledButton>Cadastro</StyledButton>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  .image-side {
    position: relative;

    img {
      position: absolute;
      bottom: 0px;
      object-fit: cover;
      height: 100.1%;
      width: 100%;

      overflow: hidden;
    }
  }

  .form-side {
    margin: 0 2rem;

    p,
    a {
      font-size: 1.2rem;
      color: #454545;
    }

    .cadastro {
      margin-bottom: 3rem;

      p {
        margin-bottom: 1.5rem;
      }

      a {
        text-decoration: none;
        outline: none;
      }
    }
  }
`;

export default Login;
