import styled from "styled-components";
import { COLOR } from "../../../styles/COLOR";

const Container = styled.div`
  width: 95%;
  padding: 10px 10px 0 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgb(70, 70, 70)' : COLOR.background};
  border-radius: 10px;
  text-align: center;
  margin: 10px auto;
  height: fit-content;
  overflow: hidden;  
  transition: 0.2s;
  transition-delay: 0.25s;
  transform: ${({ $isActive }) => $isActive ? 'translateY(0)' : 'translateY(20px)'};

  & > h3 {
    font-size: 12px;
    margin-bottom: 10px;
  }

  & p {
    font-size: ${({ $fontSize }) => `${$fontSize}px` };
    border-bottom: 1px dashed ${COLOR.black};
    line-height: 30px;
  }
  & div {
    margin: 10px 0;
  }
  & button {
    width: 40%;
    height: 30px;
    border: none;
    border-radius: 10px;
    margin-bottom: 10px;    
    background-color: ${({ $isDarkMode }) => $isDarkMode ? COLOR.background : COLOR.black};
    color: ${({ $isDarkMode }) => $isDarkMode ? COLOR.black : COLOR.white};
    cursor: pointer;
  }
  & button + button {
    margin-left: 10px;
  }

`;

export default {
  Container,
};
