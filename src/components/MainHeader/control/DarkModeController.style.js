import styled from "styled-components";
import { COLOR } from "../../../styles/COLOR";

const Container = styled.div`
  width: 95%;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgb(70, 70, 70)' : COLOR.background};
  padding: 10px 10px 0 10px;
  border-radius: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  margin: 5px auto 0;
  text-align: center;
  height: 110px;
  overflow: hidden;
  transition: 0.3s;
  transition-delay: 0.2s;
  transform: ${({ $isActive }) => $isActive ? 'translateY(0)' : 'translateY(20px)'};

  & > h3 {
    font-size: 12px;
    margin-bottom: 20px;
  }
  & > button {
    border: none;
    border-radius: 10px;
    width: 40%;
    height: 50px;
    background-color: ${({ $isDarkMode }) => $isDarkMode ? COLOR.background : COLOR.black};
    color: ${({ $isDarkMode }) => $isDarkMode ? COLOR.black : COLOR.white};
    cursor: pointer;
  }
  & > button + button {
    margin-left: 10px;
  }
`;

export default {
  Container,
};
