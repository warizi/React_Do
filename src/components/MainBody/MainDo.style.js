import { styled } from "styled-components";
import { COLOR } from "../../styles/COLOR";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: calc(100vh - 210px);
  z-index: 101;
  padding: 5px 0 0;
`;
const ListContainer = styled.div`
  position: relative;
  width: 100vw;
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
  gap: 5px;
  transition: 0.3s;
  height: ${({ $tool }) => $tool ? '50px' : '0px'};

  & input {
    width: 85%;
    height: 40px;
    border: none;
    border-radius: 10px;
    padding: 0 15px;
    font-size: 16px;
    outline: none;
    font-size: ${({ $fontSize }) => `${$fontSize}px` };
    -webkit-appearance: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);    
    z-index: 1302;
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
    z-index: 1302;
  }
`;
const CancelBackground = styled.div`
  position: fixed;
  display: ${({ $selectedTool }) => $selectedTool === 'pen' ? 'block' : 'none'};
  top: 120px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 210px);
  background-color: ${({ $isDarkMode }) => $isDarkMode ? COLOR.black : COLOR.background};
  opacity: 0.5;
  z-index: 1301;

`;
const SuspenseContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`;

const MarginTop = styled.div`
  width: 100%;
  margin-bottom: 4px;
`;
const MarginBottom = styled.div`
  width: 100%;
  height: 100px;
`;
// eslint-disable-next-line
export default {
  Container,
  InputContainer,
  ListContainer,
  CancelBackground,
  SuspenseContainer,
  MarginTop,
  MarginBottom,
}
