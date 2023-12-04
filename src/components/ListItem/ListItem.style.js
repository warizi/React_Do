import { styled } from "styled-components";
import { COLOR } from "../../styles/COLOR";

const getCheckboxSizeFromFontSize = (fontSize) => {
  if(fontSize > 15) return { size: '35px', border: '3px', radius: '10px'};
  return { 
    size: `${fontSize * 2}px`, 
    border: `${fontSize * 0.2}px`, 
    radius: `${fontSize * 2/3}px`
  }
}

const Cotnainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: calc(100% - 10px);
  min-height: 30px;
  padding: 8px 10px;
  gap: 10px;
  transition: 0.2s;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 10px;
  border: 0.5px solid ${COLOR.gray};
  /* box-shadow: 0 0 4px rgba(0, 0, 0, 0.2); */
  background-color: ${({ $isDarkMode }) => $isDarkMode ? COLOR.black : COLOR.background };
  transform: ${({ $isUpdate }) => $isUpdate ? 'translateY(-10px)' : 'none' };
  ${({ $isUpdate }) => $isUpdate ? 'box-shadow: 0 20px 10px rgba(0, 0, 0, 0.3)' : '' };
  ${({ $isUpdate }) => $isUpdate ? 'z-index: 1205' : 'z-index: 1200' };

  & p {
    position: relative;
    padding: 5px;
    background-color: ${({ $highlight }) => $highlight ? $highlight : 'none' };
    color: ${({ $checked, $isDarkMode }) => $checked ? '#9d9d9d' : $isDarkMode ? 'white' : COLOR.black };
    width: calc(100% - 40px);
    word-wrap: break-word;
    font-size: ${({ $fontSize }) => `${$fontSize}px` };
    text-decoration: ${({ $checked }) => $checked ? 'line-through' : 'none' };
    border-radius: 10px;
  }

  & textarea {
    width: calc(100% - 30px);
    padding: 5px;
    border-radius: 10px;
    background-color: ${({ $highlight }) => $highlight !== 'none' ? $highlight : 'rgba(0, 0, 0, 0)' };
    font-size: ${({ $fontSize }) => `${$fontSize}px` };
    border: none;
    resize: none;
    height: auto;
    overflow: hidden;
    outline: none;
    color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : COLOR.black };
  }
`;

const CheckBox = styled.div`
  position: relative;
  width: ${({ $fontSize }) => getCheckboxSizeFromFontSize($fontSize).size};
  height: ${({ $fontSize }) => getCheckboxSizeFromFontSize($fontSize).size};
  border: ${({ $fontSize }) => getCheckboxSizeFromFontSize($fontSize).border} solid ${({ $checked }) => $checked ? '#d9d9d9' : '#000' };
  border-radius: ${({ $fontSize }) => getCheckboxSizeFromFontSize($fontSize).radius};
  background-color: rgba(0, 0, 0, 0);
  border-color: ${({ $isDarkMode, $checked }) => $isDarkMode ? $checked ? 'rgb(100, 100, 100)' : 'rgb(120, 120, 120)' : $checked ? '#d9d9d9' : '#000' };
  cursor: pointer;

  & div {
    position: absolute;
    display: ${({ $checked }) => $checked ? 'block' : 'none' };
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    background-color: ${({ $checked, $isDarkMode }) => $checked ? $isDarkMode? 'rgb(100, 100, 100)' : '#d9d9d9' : '#000' };
    border-radius: 5px;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  transition: 0.3s;
  top: 50%;
  right: ${({ $active }) => $active === 'eraser' ? '1px' : '-60px'};
  transform: translateY(-50%);
  width: 50px;
  height: 80%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 10px;
  background-color: #FF4D4D;
  color: #ffffff;
  cursor: pointer;
`;

const CancelBackground = styled.div`
  position: fixed;
  display: ${({ $isUpdate }) => $isUpdate ? 'block' : 'none' };
  background-color: ${({ $isDarkMode }) => $isDarkMode ? COLOR.black : COLOR.background};
  opacity: 0.5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1201;
`;

const MarginBottom = styled.div`
  width: 100%;
  height: 5px;
`;
// eslint-disable-next-line
export default {
  Cotnainer,
  CheckBox,
  DeleteButton,
  CancelBackground,
  MarginBottom,
}
