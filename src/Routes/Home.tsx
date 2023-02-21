import { useEffect, useState } from "react";
import styled from "styled-components";
import PhotosStack from "../Components/PhotosStack";

function Home() {
  const [pages, setPages] = useState([1]);
  const [infinite, setInfinite] = useState(true);

  useEffect(() => {
    let wait = false;
    function infiniteScroll() {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    }

    window.addEventListener("wheel", infiniteScroll);
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("wheel", infiniteScroll);
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [infinite]);

  return (
    <Wrapper>
      {pages.map((page) => (
        <PhotosStack key={page} page={page} setInfinite={setInfinite} />
      ))}
      {!infinite && (
        <p
          style={{
            textAlign: "center",
            padding: "2rem 0 4rem 0",
            color: "#888",
          }}
        >
          Não existem mais postagens.
        </p>
      )}
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

export default Home;
