import { styled } from "styled-components";

const Container = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  cursor: pointer;
`;

export default {
  Container,
}
