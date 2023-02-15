import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import SingUp from "./SingUp";

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="login/criar" element={<SingUp />} />
        </Routes>
        <Footer />
      </Wrapper>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  min-height: calc(100vh + 7rem);
  background-color: hsl(0, 0%, 90%);
  font-family: "Roboto", sans-serif;
`;

export default App;
