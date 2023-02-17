import styled from "styled-components";
import AccountHeader from "../Components/AccountHeader";

function Account() {
  return (
    <Wrapper>
      <AccountHeader titleText="Minha Conta" />
      <h1>account</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  margin: 0 25%;
`;

export default Account;
