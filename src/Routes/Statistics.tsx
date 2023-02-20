import styled from "styled-components";
import AccountHeader from "../Components/AccountHeader";

function Statistics() {
  return (
    <Margin>
      <Wrapper>
        <AccountHeader titleText="Estatisticas" />
        <h1>Estatisticas</h1>
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

export default Statistics;
