import { Link } from "react-router-dom";
import styled from "styled-components";
import dogHat from "../Assets/login.jpg";
import { StyledForm, StyledTitle, StyledButton } from "../Components/MyStyledComponents";

function Login() {
  return (
    <Wrapper>
      <div className="image-side">
        <img src={dogHat} alt="Dog with a hat" />
      </div>
      <div className="form-side">
        <div className="login">
          <StyledTitle>Login</StyledTitle>
          <StyledForm>
            <label>
              <p>Usuário</p>
              <div className="input-hover">
                <input type="text" size={30} />
              </div>
            </label>
            <label>
              <p>Senha</p>
              <input type="text" size={30} />
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
    a,
    button {
      font-size: 1.2rem;
      color: #454545;
    }

    .cadastro {
      margin-bottom: 2rem;

      p {
        margin-bottom: 1.5rem;
      }

      a {
        text-decoration: none;
      }
    }
  }
`;

export default Login;
