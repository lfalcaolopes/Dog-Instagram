import { useContext, useState } from "react";
import styled from "styled-components";
import AccountHeader from "../Components/AccountHeader";
import { GlobalContext } from "../GlobalContext";

function Account() {
  const userContext = useContext(GlobalContext);
  const [id, setId] = useState<number>();

  async function fetchUserPosts() {
    const responseUser = await fetch(`https://dogsapi.origamid.dev/json/api/user`, {
      headers: {
        Authorization: `Bearer ${userContext?.dadosUser?.token}`,
      },
    });

    const jsonUser = await responseUser.json();
    setId(jsonUser.id);
  }

  return (
    <Margin>
      <Wrapper>
        <AccountHeader titleText="Minha Conta" />
        <h1>account</h1>
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
