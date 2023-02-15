import styled from "styled-components";
import DogsFooter from "../Assets/dogs-footer.svg";

function Footer() {
  return (
    <Wrapper>
      <div className="footer-elements">
        <img src={DogsFooter} alt="" />
        <p>Alguns direitos reservados © Lucas Falcão</p>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 7rem;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #764701;
  background-color: #fb1;

  .footer-elements {
    text-align: center;

    img {
      margin-bottom: 10px;
    }
  }
`;

export default Footer;
