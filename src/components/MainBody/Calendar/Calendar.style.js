import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 210px);
`;

const CalendarContainer = styled.div`
  position: relative;
  width: 100vw;
  max-width: 700px;
  height: calc(100vh - 210px);
  max-height: 700px;
  margin: 0 auto;
`;

const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  width: 100%;
  background-color: red;
  text-align: center;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vw / 7 - 10px);
    max-height: 100px;
    background-color: white;
    font-size: 12px;
    border-radius: 10px;
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
