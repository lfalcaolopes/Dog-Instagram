import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import { StyledButton, StyledForm, StyledTitle } from "./MyStyledComponents";
import Visualizacao from "../Assets/visualizacao-black.svg";
import CommentsScroll from "./CommentsScroll";
import { FormEvent, useContext, useRef, useState } from "react";
import { GlobalContext } from "../GlobalContext";

interface fotos {
  id: number;
  author: string;
  title: string;
  date: string;
  src: string;
  peso: string;
  idade: string;
  acessos: string;
  total_comments: string;
}

interface comentario {
  comment_author: string;
  comment_content: string;
  comment_id: string;
}

interface props {
  fotoData: fotos;
  comentarios: comentario[] | undefined;
  fetchComments: Function;
}

function PhotoModal({ fotoData, comentarios, fetchComments }: props) {
  const userContext = useContext(GlobalContext);
  const userComment = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent, id: number) {
    event.preventDefault();
    const comment = userComment.current?.value;

    if (comment !== "") {
      setLoading(true);
      await fetch(`https://dogsapi.origamid.dev/json/api/comment/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + userContext?.dadosUser?.token },
        body: JSON.stringify({ comment }),
      });

      fetchComments(id);
      if (userComment.current) userComment.current.value = "";
      setLoading(false);
    }
  }

  return (
    <Dialog.Portal>
      <Wrapper>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content asChild>
          <div className="DialogContent">
            <div className="img-side">
              <img src={fotoData.src} alt="Image" />
            </div>
            <div className="data-side">
              <div className="non-form">
                <div className="metadata">
                  <p>{`@${fotoData.author}`}</p>
                  <p>
                    <img src={Visualizacao} alt="visu" />
                    {`${fotoData.acessos}`}
                  </p>
                </div>
                <StyledTitle>{fotoData.title}</StyledTitle>
                <Dialog.Description className="dog-info">{`${fotoData.peso} Kg | ${fotoData.idade} Anos`}</Dialog.Description>
                {comentarios && <CommentsScroll comentarios={comentarios} />}
              </div>
              {userContext?.dadosUser && (
                <StyledForm
                  onSubmit={(event) => {
                    handleSubmit(event, fotoData.id);
                  }}
                >
                  <label>
                    <input placeholder="Comentário..." type="text" ref={userComment} />
                  </label>
                  <StyledButton loading={loading}>Enviar</StyledButton>
                </StyledForm>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Wrapper>
    </Dialog.Portal>
  );
}

const Wrapper = styled.div`
  .DialogOverlay {
    background-color: hsla(0, 0%, 0%, 0.2);
    position: fixed;
    inset: 0;
    z-index: 100;
  }

  .DialogContent {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;

    width: min(90vw, 60rem);

    background-color: white;
    border-radius: 5px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    overflow: hidden;

    display: grid;
    grid-template-columns: 1fr 1fr;

    .img-side {
      display: flex;

      img {
        width: 35rem;
        height: 35rem;
      }
    }

    .data-side {
      margin: 2rem;
      margin-bottom: 0rem;
      min-width: 20rem;
      font-family: "Roboto", sans-serif;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      h2 {
        margin-top: 1.5rem;
      }

      form {
        display: flex;
        justify-content: space-between;
        align-self: end;

        input {
          box-shadow: none;
          background-color: #dbdbdb;

          margin-top: 0;

          &:focus {
            box-shadow: 0 0 0 3px #fea;
          }
        }

        button {
          box-shadow: none;
          font-size: 1rem;
          padding: 10px 10px;

          &:focus,
          &:hover {
            box-shadow: 0 0 0 3px #fea;
          }
        }
      }

      .metadata {
        display: flex;
        justify-content: space-between;
        color: hsl(0, 0%, 40%);

        img {
          margin-right: 5px;
        }
      }

      .dog-info {
        font-size: 1.2rem;
        font-weight: bold;
      }
    }
  }
  .DialogContent:focus {
    outline: none;
  }
`;

export default PhotoModal;
