import { ChangeEvent, FormEvent, useContext, useRef, useState } from "react";
import styled from "styled-components";
import AccountHeader from "../Components/AccountHeader";
import { StyledButton, StyledForm } from "../Components/MyStyledComponents";
import { GlobalContext } from "../GlobalContext";

function Post() {
  const nameRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<File>();
  const userContext = useContext(GlobalContext);

  async function postPhoto(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData();

    if (img && nameRef.current && weightRef.current && ageRef.current) {
      formData.append("img", img);
      formData.append("nome", nameRef.current.value);
      formData.append("peso", weightRef.current.value);
      formData.append("idade", ageRef.current.value);
    }

    const response = await fetch("https://dogsapi.origamid.dev/json/api/photo", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userContext?.dadosUser?.token,
      },
      body: formData,
    });

    const json = response.json();

    console.log(json);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setImg(event.target.files![0]);
  }

  return (
    <Margin>
      <Wrapper>
        <AccountHeader titleText="Poste Sua Foto" />
        <StyledForm onSubmit={postPhoto}>
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
          <input type="file" onChange={handleChange} />
          <StyledButton>Enviar</StyledButton>
        </StyledForm>
      </Wrapper>
    </Margin>
  );
}

const Margin = styled.div`
  flex: 1;
`;

const Wrapper = styled.div`
  max-width: 50rem;
  padding: 0 2rem;
  margin: 0 auto;

  form {
    margin-top: 2rem;
  }
`;

export default Post;
