import styled from "styled-components";
import { COLOR } from "../../styles/COLOR";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: calc(100vh - 210px);
  overflow: scroll;
  z-index: 101;
  padding: 0 20px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 40px);
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  padding: 5px;

  & > p {
    line-height: 30px;
    height: 30px;
    padding: 0 10px;
    margin-bottom: 5px;
    color: ${COLOR.gray};
    border-radius: 10px;
  }
`;

const MarginTop = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;
export default {
  Container,
  ItemContainer,
  MarginTop,
}
