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
  width: 100%;
  min-height: 30px;
  border-bottom: 1px dashed #000;
  padding: 8px 10px;
  gap: 10px;
  transition: 0.2s;
  overflow: hidden;
  background-color: ${COLOR.background};
  transform: ${({ $isUpdate }) => $isUpdate ? 'translateY(-10px)' : 'none' };
  ${({ $isUpdate }) => $isUpdate ? 'box-shadow: 0 20px 10px rgba(0, 0, 0, 0.3)' : '' };
  ${({ $isUpdate }) => $isUpdate ? 'z-index: 1205' : 'z-index: 1200' };

  & p {
    position: relative;
    padding: 5px;
    background-color: ${({ $highlight }) => $highlight ? $highlight : 'none' };
    color: ${({ $checked }) => $checked ? '#9d9d9d' : '#000' };
    width: calc(100% - 30px);
    word-wrap: break-word;
    font-size: ${({ $fontSize }) => `${$fontSize}px` };
    text-decoration: ${({ $checked }) => $checked ? 'line-through' : 'none' };
    border-radius: 10px;
  }

  & textarea {
    width: calc(100% - 30px);
    font-size: ${({ $fontSize }) => `${$fontSize}px` };
    border: none;
    resize: none;
    height: auto;
    overflow: hidden;
    outline: none;
    background-color: #FFFDF6;
  }
`;

const CheckBox = styled.div`
  position: relative;
  width: ${({ $fontSize }) => getCheckboxSizeFromFontSize($fontSize).size};
  height: ${({ $fontSize }) => getCheckboxSizeFromFontSize($fontSize).size};
  border: ${({ $fontSize }) => getCheckboxSizeFromFontSize($fontSize).border} solid ${({ $checked }) => $checked ? '#d9d9d9' : '#000' };
  border-radius: ${({ $fontSize }) => getCheckboxSizeFromFontSize($fontSize).radius};
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;

  & div {
    position: absolute;
    display: ${({ $checked }) => $checked ? 'block' : 'none' };
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    background-color: ${({ $checked }) => $checked ? '#d9d9d9' : '#000' };
    border-radius: 5px;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  transition: 0.2s;
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
  background-color: ${COLOR.background};
  opacity: 0.5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1201;
`;
// eslint-disable-next-line
export default {
  Cotnainer,
  CheckBox,
  DeleteButton,
  CancelBackground,
}
