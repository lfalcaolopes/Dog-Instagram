import styled from "styled-components";

const StyledForm = styled.form`
  display: grid;
  gap: 1.5rem;
  justify-items: start;
  margin-bottom: 1.5rem;

  input[type="text"],
  input[type="password"],
  input[type="email"] {
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    margin-top: 0.5rem;
    box-shadow: 2px 3px 10px #666666;
    z-index: 0;

    font-size: 1rem;
    color: #454545;
  }

  input[type="file"] {
    font-size: 1rem;
  }
`;

const StyledTitle = styled.h2`
  position: relative;
  font-family: "Libre Baskerville", serif;
  color: #2e2e2e;
  font-size: 3rem;
  z-index: 2;

  margin: 3rem 0 1.5rem;

  &:after {
    content: "";
    background-color: #fb1;
    height: 1.5rem;
    width: 2rem;
    border-radius: 5px;

    position: absolute;
    bottom: 0px;
    left: -10px;
    z-index: -1;
  }
`;

const StyledButton = styled.button`
  display: block;
  background-color: #fb1;
  font-size: 1.2rem;
  color: #764701;
  box-shadow: 2px 3px 10px #666666;
  border: none;
  border-radius: 5px;
  padding: 10px 20px 10px 20px;
  z-index: 0;
  transition-duration: 0.3s;
  transition-property: box-shadow;

  position: relative;

  &:before {
    content: "";
    position: absolute;
    border: #fb1 solid 2px;
    border-radius: 5px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    transition-duration: 0.3s;
    transition-property: top, right, bottom, left;
  }

  &:hover:before,
  &:focus:before,
  &:active:before {
    z-index: -1;
    background-color: #ffbc1139;

    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
  }

  &:hover,
  &:focus,
  &:active {
    box-shadow: none;
  }
`;

const StyledAccountButtons = styled.div`
  margin: 3rem 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  a {
    background-color: white;
    border-radius: 3px;
    padding: 5px;
    z-index: 0;
    border: #fff solid 1px;
    cursor: pointer;

    &:hover,
    &:focus {
      background: hsl(0, 0%, 100%);
      box-shadow: 0 0 0 2px hsl(0, 0%, 50%);
      border-color: #000;
    }
  }
  .active,
  .active:hover,
  .active:focus {
    background: #fff;
    box-shadow: 0 0 0 3px #fea;
    border-color: #fb1;
  }
`;

export { StyledForm, StyledTitle, StyledButton, StyledAccountButtons };
