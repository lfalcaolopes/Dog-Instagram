import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import styled from "styled-components";
import PhotoModal from "../Components/PhotoModal";

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

function Home() {
  const [fotos, setFotos] = useState<fotos[]>();
  const [comentarios, setComentarios] = useState<comentario[]>();

  useEffect(() => {
    async function fetchFotos() {
      const response = await fetch("https://dogsapi.origamid.dev/json/api/photo");
      const json = await response.json();
      setFotos(json);
    }

    fetchFotos();
  }, []);

  async function fetchComments(id: number) {
    const response = await fetch(`https://dogsapi.origamid.dev/json/api/comment/${id}`);
    const json = await response.json();
    setComentarios(json);
  }

  return (
    <Wrapper>
      <Grid>
        {fotos?.map((fotoData, index) => (
          <div key={fotoData.id} className={index === 1 ? "big-foto" : ""}>
            <Dialog.Root
              onOpenChange={() => {
                fetchComments(fotoData.id);
              }}
            >
              <Dialog.Trigger asChild>
                <img src={fotoData.src} alt={fotoData.title} />
              </Dialog.Trigger>
              <PhotoModal fotoData={fotoData} comentarios={comentarios} fetchComments={fetchComments} />
            </Dialog.Root>
          </div>
        ))}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 2rem;
  max-width: 50rem;
  flex: 1;

  img {
    cursor: pointer;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;

    border-radius: 3px;
  }

  .big-foto {
    grid-column: span 2;
    grid-row: span 2;

    img {
      height: 100%;
    }
  }
`;

export default Home;
