import { ChangeEvent, FormEvent, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AccountHeader from "../Components/AccountHeader";
import { StyledButton, StyledForm } from "../Components/MyStyledComponents";
import { GlobalContext } from "../GlobalContext";
import useFetch from "../Hooks/useFetch";

function Post() {
  const nameRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<File>();
  const [isMissing, setIsMissing] = useState(false);
  const { loading, error, request } = useFetch();
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

      const { response } = await request("https://dogsapi.origamid.dev/json/api/photo", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + userContext?.dadosUser?.token,
        },
        body: formData,
      });

      if (response?.ok) navigate("/conta/geral");
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
              <span>
                <input type="text" ref={nameRef} />
              </span>
            </label>
            <label>
              <p>Peso</p>
              <span>
                <input type="text" ref={weightRef} />
              </span>
            </label>
            <label>
              <p>Idade</p>
              <span>
                <input type="text" ref={ageRef} />
              </span>
            </label>
            <input type="file" onChange={handleChange} />
            {(isMissing || error) && (
              <p
                style={{
                  fontSize: "1rem",
                  textAlign: "center",
                  color: "#db0000",
                }}
              >
                {isMissing ? (
                  "Preencha todos os campos."
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: error!.message }}></span>
                )}
              </p>
            )}
            <StyledButton dloading={loading}>{loading ? "Carregando" : "Enviar"}</StyledButton>
          </StyledForm>
          {img && (
            <div className="img-side">
              <img src={URL.createObjectURL(img)} />
            </div>
          )}
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
    display: flex;
    justify-content: space-between;

    form {
      margin-top: 2rem;

      input {
        width: 20rem;
      }
    }

    .img-side {
      height: min(23rem, 40vw);
      width: min(23rem, 40vw);
      img {
        margin-top: 2rem;
        object-fit: cover;
        width: 100%;
        height: 100%;

        border-radius: 10px;
      }
    }
  }

  @media (max-width: 768px) {
    .grid {
      flex-flow: column;
      margin-bottom: 2rem;

      label {
        width: 100%;

        span {
          display: flex;

          input {
            width: auto;
            flex: 1;
          }
        }
      }

      .img-side {
        margin: 0 auto 2rem;
        width: min(40rem, 80vw);
        height: min(40rem, 80vw);
      }
    }
  }
`;

export default Post;
