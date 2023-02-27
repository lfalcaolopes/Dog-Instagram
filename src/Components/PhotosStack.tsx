import * as Dialog from "@radix-ui/react-dialog";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../GlobalContext";
import useFetch from "../Hooks/useFetch";
import Loading from "./Loading";
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
  const { data, loading, error, request } = useFetch<fotos[]>();
  const [comentarios, setComentarios] = useState<comentario[]>();
  const location = useLocation();

  let url: string;
  if (userContext?.dadosUser && location.pathname == "/conta/geral") {
    url = `https://dogsapi.origamid.dev/json/api/photo/?_total=6&_page=${page}&_user=${userContext.dadosUser?.id}`;
  } else {
    url = `https://dogsapi.origamid.dev/json/api/photo/?_total=6&_page=${page}&_user=0`;
  }

  useEffect(() => {
    request(url, { cache: "no-store" });
  }, [url]);

  if (data && data.length < 6) setInfinite(false);

  async function fetchComments(id: number) {
    const response = await fetch(`https://dogsapi.origamid.dev/json/api/comment/${id}`);
    const json = await response.json();
    setComentarios(json);
  }

  if (error) return <p>{`${error}`}</p>;
  if (loading) return <Loading />;
  if (data)
    return (
      <Grid>
        {data?.map((fotoData, index) => (
          <div key={fotoData.id} className={index === 1 ? "big-foto" : ""}>
            <Dialog.Root
              onOpenChange={() => {
                setComentarios(undefined);
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
  else return null;
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
