import { useRef } from "react";
import styled from "styled-components";
import AccountHeader from "../Components/AccountHeader";
import { StyledButton, StyledForm } from "../Components/MyStyledComponents";

function Post() {
  const nameRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <Wrapper>
      <AccountHeader titleText="Poste Sua Foto" />
      <StyledForm>
        <label>
          <p>Nome</p>
          <div className="input-hover">
            <input type="text" ref={nameRef} size={40} />
          </div>
        </label>
        <label>
          <p>Peso</p>
          <input type="text" ref={weightRef} size={40} />
        </label>
        <label>
          <p>Idade</p>
          <input type="text" ref={ageRef} size={40} />
        </label>
        <input type="file" ref={fileRef} />
        <StyledButton>Enviar</StyledButton>
      </StyledForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  margin: 0 25%;

  form {
    margin-top: 2rem;
  }
`;

export default Post;