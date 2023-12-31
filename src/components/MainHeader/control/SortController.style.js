import styled from "styled-components";
import { COLOR } from "../../../styles/COLOR";


const Container = styled.div`
  border-radius: 10px;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgb(70, 70, 70)' : COLOR.background};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  width: 95%;
  padding: 10px 10px 0 10px;
  text-align: center;
  margin: 10px auto;
  height: fit-content;
  overflow: hidden;
  transition: 0.3s;
  transition-delay: 0.2s;
  transform: ${({ $isActive }) => $isActive ? 'translateY(0)' : 'translateY(20px)'};
  & > h3 {
    font-size: 12px;
    margin-bottom: 10px;
  }
  & > div {
    display: flex;
    flex-direction: column;
  }
  & > button {
    width: 50%;
    height: 30px;
    border: none;
    border-radius: 10px;
    margin-bottom: 10px;
    background-color: ${({ $isDarkMode }) => $isDarkMode ? COLOR.background : COLOR.black};
    color: ${({ $isDarkMode }) => $isDarkMode ? COLOR.black : COLOR.white};
    cursor: pointer;
  }
`;

const SortListItem = styled.div`
  border-radius: 10px;
  height: 30px;
  width: 100%;
  background-color: ${({ $color }) => $color};
  ${({ $color }) => {
    if($color === 'none') {
      return `
        border: 1px solid #9d9d9d; 
      `;
    }
  }};
  margin-bottom: 10px;
`;
export default {
  Container,
  SortListItem,
};

