import { styled } from "styled-components";
import { COLOR } from "../../styles/COLOR";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 265px);
  z-index: 101;
`;
const ListContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
  height: 100%;
  z-index: 1100;
`;
const InputContainer = styled.form`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  transition: 0.2s;
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
    z-index: 1202;
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
    z-index: 1202;
  }
`;
const CancelBackground = styled.div`
  position: absolute;
  display: ${({ $selectedTool }) => $selectedTool === 'pen' ? 'block' : 'none'};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${COLOR.background};
  opacity: 0.5;
  z-index: 1201;

`;

// eslint-disable-next-line
export default {
  Container,
  InputContainer,
  ListContainer,
  CancelBackground,
}
