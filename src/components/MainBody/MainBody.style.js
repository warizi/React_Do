import styled from "styled-components";


const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 300vw;
  height: calc(100vh - 245px);
  overflow: hidden;
  transition: 0.2s;
  transform: ${({ $page }) => {
    switch($page) {
      case 'calendar': return 'translateX(0)';
      case 'home': return 'translateX(-100vw)';
      case 'history': return 'translateX(-200vw)';
      default: return;
    }
  }};
`;
const CalendarContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 245px);
`;
const HistoryContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 245px);
`;
export default {
  Container,
  CalendarContainer,
  HistoryContainer,
}
