import styled from "styled-components";
import AccountHeader from "../Components/AccountHeader";

function Statistics() {
  return (
    <Wrapper>
      <AccountHeader titleText="Estatisticas" />
      <h1>Estatisticas</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  margin: 0 25%;
`;

export default Statistics;
