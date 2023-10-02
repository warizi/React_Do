import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 210px);
  background-color: blue;
`;

const CalendarContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vw;
  background-color: green;
  margin: 0 auto;
`;

const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  width: 100%;
  height: 100%;
  background-color: red;
  text-align: center;

  & > div {
    line-height: calc(100vw / 7);
    background-color: yellow;
  }
`;

const NoticeContainer = styled.div`
  position: absolute;
  top: 120px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 210px);
  background-color: white;
  z-index: 6000;
`;
export default {
  Container,
  CalendarContainer,
  CalendarHeader,
  NoticeContainer,
}
