import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import { StyledTitle } from "./MyStyledComponents";
import Visualizacao from "../Assets/visualizacao-black.svg";
import CommentsScroll from "./CommentsScroll";

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

function PhotoModal({ fotoData, comentarios }: { fotoData: fotos; comentarios: comentario[] | undefined }) {
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
      }
    }

    .data-side {
      margin: 2rem;
      min-width: 15rem;
      font-family: "Roboto", sans-serif;

      h2 {
        margin-top: 1.5rem;
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

      .comentarios {
      }
    }
  }
  .DialogContent:focus {
    outline: none;
  }
`;

export default PhotoModal;
