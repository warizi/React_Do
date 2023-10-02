import { styled } from "styled-components";
import { COLOR } from "../styles/COLOR";

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? COLOR.black : COLOR.background)};
  color: ${({ $isDarkMode }) => ($isDarkMode ? 'white' : COLOR.black)};
`;
export default {
  Container,
}

