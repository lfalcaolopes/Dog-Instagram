import styled from "styled-components";
import dogHat from "../Assets/login.jpg";
import { StyledForm, StyledTitle, StyledButton } from "../Components/MyStyledComponents";

function SingUp() {
  return (
    <Wrapper>
      <div className="image-side">
        <img src={dogHat} alt="Dog with a hat" />
      </div>
      <div className="form-side">
        <StyledTitle>Cadastre-se</StyledTitle>
        <StyledForm>
          <label>
            <p>Usuário</p>
            <input type="text" size={30} />
          </label>
          <label>
            <p>Email</p>
            <input type="text" size={30} />
          </label>
          <label>
            <p>Senha</p>
            <input type="text" size={30} />
          </label>
          <StyledButton>Cadastrar</StyledButton>
        </StyledForm>
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
  }
`;

export default SingUp;
