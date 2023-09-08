import { styled } from "styled-components";
import { COLOR } from "../../styles/COLOR";

const Cotnainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  min-height: 40px;
  border-bottom: 1px dashed #000;
  padding: 10px 15px;
  gap: 10px;
  transition: 0.2s;
  background-color: ${COLOR.background};
  transform: ${({ $isUpdate }) => $isUpdate ? 'translateY(-10px)' : 'none' };
  ${({ $isUpdate }) => $isUpdate ? 'box-shadow: 0 20px 10px rgba(0, 0, 0, 0.3)' : '' };
  ${({ $isUpdate }) => $isUpdate ? 'z-index: 1205' : 'z-index: 1200' };

  & p {
    position: relative;
    padding: 5px;
    background-color: ${({ $highlight }) => $highlight ? $highlight : 'none' };
    color: ${({ $checked }) => $checked ? '#9d9d9d' : '#000' };
    width: 85%;
    word-wrap: break-word;
    font-size: 16px;
    text-decoration: ${({ $checked }) => $checked ? 'line-through' : 'none' };
    border-radius: 10px;
  }

  & textarea {
    width: 85%;
    font-size: 16px;
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
  width: 35px;
  height: 35px;
  border: 4px solid ${({ $checked }) => $checked ? '#d9d9d9' : '#000' };
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;

  & div {
    position: absolute;
    display: ${({ $checked }) => $checked ? 'block' : 'none' };
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
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
  position: absolute;
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
