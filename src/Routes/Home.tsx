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

  async function handleModalOpen(id: number) {
    const response = await fetch(`https://dogsapi.origamid.dev/json/api/comment/${id}`);
    const json = await response.json();
    console.log(json);
    setComentarios(json);
  }

  return (
    <Wrapper>
      <Grid>
        {fotos?.map((fotoData, index) => (
          <div key={fotoData.id} className={index === 1 ? "big-foto" : ""}>
            <Dialog.Root
              onOpenChange={() => {
                handleModalOpen(fotoData.id);
              }}
            >
              <Dialog.Trigger asChild>
                <img src={fotoData.src} alt={fotoData.title} />
              </Dialog.Trigger>
              <PhotoModal fotoData={fotoData} comentarios={comentarios} />
            </Dialog.Root>
          </div>
        ))}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 2rem 25%;
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
  }
`;

export default Home;
