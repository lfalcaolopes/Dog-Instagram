import * as Dialog from "@radix-ui/react-dialog";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../GlobalContext";
import useFetch from "../Hooks/useFetch";
import PhotoModal from "./PhotoModal";

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

function PhotosStack({ page, setInfinite }: { page: number; setInfinite: Function }) {
  const userContext = useContext(GlobalContext);
  const [fotos, setFotos] = useState<fotos[] | null>();
  const [comentarios, setComentarios] = useState<comentario[]>();
  const location = useLocation();
  let url: string;
  if (userContext?.dadosUser && location.pathname == "/conta/geral") {
    url = `https://dogsapi.origamid.dev/json/api/photo/?_total=6&_page=${page}&_user=${userContext.dadosUser?.id}`;
  } else {
    url = `https://dogsapi.origamid.dev/json/api/photo/?_total=6&_page=${page}&_user=0`;
  }

  // const { data, error, loading, response } = useFetch<fotos[]>(url, {
  //   cache: "no-store",
  // });

  // setFotos(data);

  useEffect(() => {
    const { data, error, loading, response } = useFetch<fotos[]>("https://api.example.com/users", {
      cache: "no-store",
    });

    setFotos(data);
  }, []);

  // useEffect(() => {
  //   async function fetchFotos() {
  //     let url: string;
  //     if (userContext?.dadosUser && location.pathname == "/conta/geral") {
  //       url = `https://dogsapi.origamid.dev/json/api/photo/?_total=6&_page=${page}&_user=${userContext.dadosUser?.id}`;
  //     } else {
  //       url = `https://dogsapi.origamid.dev/json/api/photo/?_total=6&_page=${page}&_user=0`;
  //     }
  //     const response = await fetch(url, {
  //       cache: "no-store",
  //     });

  //     const json = await response.json();
  //     setFotos(json);
  //   }

  //   fetchFotos();
  // }, []);

  // const { data, error } = useFetch<fotos[]>(url, {
  //   cache: "no-store",
  // });

  // setFotos(data);

  async function fetchComments(id: number) {
    const response = await fetch(`https://dogsapi.origamid.dev/json/api/comment/${id}`);
    const json = await response.json();
    setComentarios(json);
  }

  return (
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
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;

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

export default PhotosStack;
