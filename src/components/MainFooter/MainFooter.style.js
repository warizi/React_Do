import { styled } from "styled-components";
import { COLOR } from "../../styles/COLOR";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 35px;
  width: 100%;
  height: 125px;
  z-index: 100;
`;
const Palette = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
  position: absolute;
  transition: 0.3s;
  top: ${({ $active }) => $active === 'highlighter' ? '-70px' : '300px'};
  left: calc((100% - 300px) / 2);
  width: 300px;
  height: 60px;
  background-color: ${COLOR.background};
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  z-index: 101;
`;
// eslint-disable-next-line
export default {
  Container,
  Palette,
}
