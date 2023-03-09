import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dogHat from "../Assets/login.jpg";
import { StyledForm, StyledTitle, StyledButton } from "../Components/MyStyledComponents";
import useFetch from "../Hooks/useFetch";

function SingUp() {
  const userRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const { error, loading, request } = useFetch();
  const [isMissing, setIsMissing] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const username = userRef.current?.value;
    const email = emailRef.current?.value;
    const password = passRef.current?.value;

    if (username !== "" && email !== "" && password !== "") {
      setIsMissing(false);
      const { response } = await request(`https://dogsapi.origamid.dev/json/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });
      if (response?.ok) navigate("/login");
    } else {
      setIsMissing(true);
    }
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
            <span>
              <input type="text" ref={userRef} />
            </span>
          </label>
          <label>
            <p>Email</p>
            <span>
              <input type="email" ref={emailRef} />
            </span>
          </label>
          <label>
            <p>Senha</p>
            <span>
              <input type="password" ref={passRef} />
            </span>
          </label>
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
          <StyledButton dloading={loading}>{loading ? "Carregando" : "Cadastrar"}</StyledButton>
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

    input {
      width: 30rem;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    .image-side {
      display: none;
    }

    .form-side {
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
    }
  }
`;

export default SingUp;
