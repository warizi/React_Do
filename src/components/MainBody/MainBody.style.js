import styled from "styled-components";


const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 300vw;
  height: calc(100vh - 210px);
  overflow: hidden;
`;
const CalendarContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 210px);
`;
const HistoryContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 210px);
`;
export default {
  Container,
  CalendarContainer,
  HistoryContainer,
}
