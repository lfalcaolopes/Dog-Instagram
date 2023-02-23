import { ChangeEvent, FormEvent, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AccountHeader from "../Components/AccountHeader";
import { StyledButton, StyledForm } from "../Components/MyStyledComponents";
import { GlobalContext } from "../GlobalContext";

function Post() {
  const nameRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<File>();
  const [isMissing, setIsMissing] = useState(false);
  const userContext = useContext(GlobalContext);

  const navigate = useNavigate();

  async function postPhoto(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData();

    if (img && nameRef.current?.value !== "" && weightRef.current?.value !== "" && ageRef.current?.value !== "") {
      setIsMissing(false);
      formData.append("img", img);
      formData.append("nome", nameRef.current!.value);
      formData.append("peso", weightRef.current!.value);
      formData.append("idade", ageRef.current!.value);

      await fetch("https://dogsapi.origamid.dev/json/api/photo", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + userContext?.dadosUser?.token,
        },
        body: formData,
      });

      navigate("/conta/geral");
    } else {
      setIsMissing(true);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setImg(event.target.files![0]);
  }

  return (
    <Margin>
      <Wrapper>
        <AccountHeader titleText="Poste Sua Foto" />
        <div className="grid">
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
            {isMissing && (
              <p
                style={{
                  textAlign: "center",
                  color: "#db0000",
                }}
              >
                Preencha todos os campos.
              </p>
            )}
            <StyledButton>Enviar</StyledButton>
          </StyledForm>
          <div className="img-side">{img && <img src={URL.createObjectURL(img)} />}</div>
        </div>
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

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;

    form {
      margin-top: 2rem;
    }

    .img-side {
      height: 23rem;
      width: 23rem;
      img {
        margin-top: 2rem;
        object-fit: cover;
        width: 100%;
        height: 100%;

        border-radius: 10px;
      }
    }
  }
`;

export default Post;
