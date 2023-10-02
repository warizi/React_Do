import styled from "styled-components";
import { COLOR } from "../../styles/COLOR";

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 30px;
  padding: 5px 5px;

  & > div:nth-child(1) {
    padding: 5px 5px;
    font-size: ${({ $fontSize }) => `${$fontSize}px`};
    word-wrap: break-word;
    background-color: ${({ $highlight }) => $highlight };
    border-radius: 10px;
  }
`;

export default {
  Container,
}
