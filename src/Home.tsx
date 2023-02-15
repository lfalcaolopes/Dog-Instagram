import { useEffect, useState } from "react";
import styled from "styled-components";

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

function Home() {
  const [fotos, setFotos] = useState<fotos[]>();

  useEffect(() => {
    async function fetchFotos() {
      const response = await fetch("https://dogsapi.origamid.dev/json/api/photo");
      const json = await response.json();
      setFotos(json);
    }

    fetchFotos();
  }, []);

  return (
    <Wrapper>
      <Grid>
        {fotos?.map((foto, index) => (
          <>
            {index === 1 && (
              <div key={foto.id} className="big-foto">
                <img src={foto.src} alt={foto.title} />
              </div>
            )}
            {index !== 1 && (
              <div key={foto.id}>
                <img src={foto.src} alt={foto.title} />
              </div>
            )}
          </>
        ))}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 2rem 25%;
  flex: 1;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;

  img {
    width: 15rem;
    border-radius: 3px;
  }

  .big-foto {
    grid-area: 1 / 2 / 3 / 4;

    img {
      width: 31rem;
    }
  }
`;

export default Home;
