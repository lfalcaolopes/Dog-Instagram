import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AccountHeader from "../Components/AccountHeader";
import PhotosStack from "../Components/PhotosStack";

function Account() {
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
    <Margin>
      <Wrapper>
        <AccountHeader titleText="Minha Conta" />
        {pages.map((page) => (
          <PhotosStack key={page} page={page} setInfinite={setInfinite} />
        ))}
        {!infinite && (
          <p
            style={{
              textAlign: "center",
              padding: "6rem 0 4rem 0",
              color: "#888",
            }}
          >
            Conta não possui mais postagens.
          </p>
        )}
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
`;

export default Account;
