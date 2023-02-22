import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Account from "./Routes/Account";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Post from "./Routes/Post";
import SingUp from "./Routes/SingUp";
import Statistics from "./Routes/Statistics";
import { GlobalStorageProvider } from "./GlobalContext";

function App() {
  return (
    <GlobalStorageProvider>
      <BrowserRouter>
        <Wrapper>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="login/criar" element={<SingUp />} />
            <Route path="conta/geral" element={<Account />} />
            {/* <Route path="conta/estatisticas" element={<Statistics />} /> */}
            <Route path="conta/postar" element={<Post />} />
          </Routes>
          <Footer />
        </Wrapper>
      </BrowserRouter>
    </GlobalStorageProvider>
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
