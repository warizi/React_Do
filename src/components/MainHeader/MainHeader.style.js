import { styled } from "styled-components";
import { COLOR } from "../../styles/COLOR";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 120px;
  z-index: 1300;

  & h1 {
    font-size: 30px;
    margin-bottom: 20px;
  }
  & span {
    color: ${({ $isHoliday }) => {
      if(!$isHoliday) return 'inherit';
      if($isHoliday === 'sun') return '#FF4D4D';
      if($isHoliday === 'sat') return '#86BDF0';
    }};
    font-size: 16px;
  }
`;

const FlagContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  top: 20px;
  transition: 0.2s;
  right: ${({ $active }) => $active ? '0' : '-60px'};
  width: 100px;
  height: auto;
  z-index: 100;

  & div:nth-child(1) {
    position: absolute;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    transition: 0.2s;
    background-color: ${COLOR.HLNormalRed};
    box-shadow: ${({ $active }) => $active ? '0 4px 8px rgba(0, 0, 0, 0.4)' : '0 4px 8px rgba(0, 0, 0, 0.1)'};
    ${({ $activeColor }) => $activeColor === COLOR.HLNormalRed ? 'z-index: 2002' : 'z-index: 2000'};
  }
  & div:nth-child(2) {
    position: absolute;
    width: 100%;
    height: 50px;
    top: ${({ $active }) => $active ? '60px' : '0'};
    left: 0;
    transition: 0.25s;
    background-color: ${COLOR.HLNormalLBlue};
    box-shadow: ${({ $active }) => $active ? '0 4px 8px rgba(0, 0, 0, 0.4)' : '0 4px 8px rgba(0, 0, 0, 0.1)'};
    ${({ $activeColor }) => $activeColor === COLOR.HLNormalLBlue ? 'z-index: 2002' : 'z-index: 2000'};
  }
  & div:nth-child(3) {
    position: absolute;
    width: 100%;
    height: 50px;
    top: ${({ $active }) => $active ? '120px' : '0'};
    left: 0;
    transition: 0.3s;
    background-color: ${COLOR.HLNormalGreen};
    box-shadow: ${({ $active }) => $active ? '0 4px 8px rgba(0, 0, 0, 0.4)' : '0 4px 8px rgba(0, 0, 0, 0.1)'};
    ${({ $activeColor }) => $activeColor === COLOR.HLNormalGreen ? 'z-index: 2002' : 'z-index: 2000'};
  }
  & div:nth-child(4) {
    position: absolute;
    width: 100%;
    height: 50px;
    top: ${({ $active }) => $active ? '180px' : '0'};
    left: 0;
    transition: 0.35s;
    background-color: ${COLOR.HLNormalYellow};
    box-shadow: ${({ $active }) => $active ? '0 4px 8px rgba(0, 0, 0, 0.4)' : '0 4px 8px rgba(0, 0, 0, 0.1)'};
    ${({ $activeColor }) => $activeColor === COLOR.HLNormalYellow ? 'z-index: 2002' : 'z-index: 2000'};
  }
  & div:nth-child(5) {
    position: absolute;
    width: 100%;
    height: 50px;
    top: ${({ $active }) => $active ? '240px' : '0'};
    left: 0;
    transition: 0.4s;
    background-color: ${({  $activeColor, $isDarkMode }) => $activeColor === 'none' ? $isDarkMode ? 'rgb(70, 70, 70)' : 'rgb(240, 240, 240)' : $activeColor};
    box-shadow: ${({ $active }) => $active ? '0 4px 8px rgba(0, 0, 0, 0.4)' : '0 4px 8px rgba(0, 0, 0, 0.1)'};
    ${({ $activeColor }) => $activeColor === 'none' ? 'z-index: 2003' : 'z-index: 2003'};
  }

`;

const ControlContainer = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 130px 170px 120px 160px;
  grid-template-areas: 
    'z z'
    'a b' 
    'a c';
  left: 0;
  top: 0;
  align-items: center;
  width: 100%;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgba(0, 0, 0, 0.1)' : '#a0a0a015'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  overflow: scroll;
  height: calc(100vh - 90px);
  /* padding-top: 105px; */
  z-index: 3000;
  transform: ${({ $isActive }) => $isActive ? 'translateY(0)' : 'translateY(-110%)'};

  & > div:nth-child(1) {
    grid-area: a;
  }
  & > div:nth-child(2) {
    grid-area: b;
  }
  & > div:nth-child(3) {
    grid-area: c;
  }
  & > div:nth-child(4) {
    grid-area: z;
  }
`;

const PaddingTop = styled.div`
  text-align: center;
  width: 40%;
  height: 100px;
  margin: 20px;
  border-radius: 10px;
  padding: 10px 10px 0 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  margin: 5px auto 0;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? COLOR.black : COLOR.background};
  transition: 0.4s;
  transition-delay: 0.2s;
  transform: ${({ $isActive }) => $isActive ? 'translateY(0)' : 'translateY(30px)'};

  & > h2 {
    font-size: 12px;
    margin-bottom: 20px;
  }
  & > p {
    font-weight: 700;
    font-size: 16px;
    line-height: 30px;
  }
  & strong {
    font-size: 30px;
  }
`;
// eslint-disable-next-line
export default {
  Container,
  FlagContainer,
  ControlContainer,
  PaddingTop,
}
