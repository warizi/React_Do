import { styled } from "styled-components";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 265px);
  z-index: 50;
`;
const ListContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
  height: 100%;
  z-index: 100;
`;
const InputContainer = styled.form`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  transition: 0.3s;
  height: ${({ $tool }) => $tool === 'pen' ? '50px' : '0px'};

  & input {
    width: 85%;
    height: 40px;
    border: none;
    border-radius: 10px;
    padding: 0 15px;
    font-size: 16px;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }

  & button {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background-color: #000;
    color: #FFF;
    font-size: 15px;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

// eslint-disable-next-line
export default {
  Container,
  InputContainer,
  ListContainer,
}
