import { styled } from "styled-components";
import { COLOR } from "../../styles/COLOR";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  width: 100%;
  height: 90px;
  z-index: 3000;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding-top: 5px;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? COLOR.black : COLOR.background};
`;
const Palette = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
  position: absolute;
  transition: 0.4s;
  top: ${({ $active }) => $active === 'highlighter' ? '-90px' : '300px'};
  left: calc((100% - 300px) / 2);
  width: 300px;
  height: 60px;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? COLOR.black : COLOR.background};
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  z-index: 2000;
`;

const PrevContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  width: 100%;
  height: 90px;
  padding-top: 5px;
  z-index: 2998;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);

  & > div {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;  
    background-color: ${({ $isDarkMode }) => $isDarkMode ? COLOR.black : COLOR.background};
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2), 0 0 5px 0 rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transition: 0.2s;
  }
`;
const PrevPen = styled.div`
  ${({ $selectedTool }) => $selectedTool === 'pen' ? 'transform: translateY(-30px);' : ''}
`;
const PrevHL = styled.div`
  ${({ $selectedTool }) => $selectedTool === 'highlighter' ? 'transform: translateY(-30px);' : ''}
`;
const PrevEraser = styled.div`
  ${({ $selectedTool }) => $selectedTool === 'eraser' ? 'transform: translateY(-30px);' : ''}
`
// eslint-disable-next-line
export default {
  Container,
  Palette,
  PrevContainer,
  PrevPen,
  PrevHL,
  PrevEraser,
}
