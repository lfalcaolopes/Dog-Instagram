import { FormEvent, useRef } from "react";
import styled from "styled-components";
import dogHat from "../Assets/login.jpg";
import { StyledForm, StyledTitle, StyledButton } from "../Components/MyStyledComponents";

function SingUp() {
  const userRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const username = userRef.current?.value;
    const email = emailRef.current?.value;
    const password = passRef.current?.value;

    const response = await fetch(`https://dogsapi.origamid.dev/json/api/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    const json = await response.json();

    console.log(json);
  }

  return (
    <Wrapper>
      <div className="image-side">
        <img src={dogHat} alt="Dog with a hat" />
      </div>
      <div className="form-side">
        <StyledTitle>Cadastre-se</StyledTitle>
        <StyledForm onSubmit={handleSubmit}>
          <label>
            <p>Usuário</p>
            <input type="text" ref={userRef} size={40} />
          </label>
          <label>
            <p>Email</p>
            <input type="text" ref={emailRef} size={40} />
          </label>
          <label>
            <p>Senha</p>
            <input type="text" ref={passRef} size={40} />
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
