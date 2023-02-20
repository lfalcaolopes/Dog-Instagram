import styled from "styled-components";
import AccountHeader from "../Components/AccountHeader";

function Account() {
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
