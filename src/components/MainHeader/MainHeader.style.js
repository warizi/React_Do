import { styled } from "styled-components";
import { COLOR } from "../../styles/COLOR";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  max-width: 1000px;
  height: 140px;
  z-index: 1300;

  & h1 {
    font-size: 30px;
    margin-bottom: 20px;
  }
  & span {
    color: ${({ $isHoliday }) => {
      if(!$isHoliday) return '#000';
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
  z-index: 2000;

  & div:nth-child(1) {
    position: absolute;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    transition: 0.2s;
    background-color: ${COLOR.HLNormalRed};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    ${({ $activeColor }) => $activeColor === COLOR.HLNormalRed ? 'z-index: 2002' : 'z-index: 2000'};
  }
  & div:nth-child(2) {
    position: absolute;
    width: 100%;
    height: 50px;
    top: ${({ $active }) => $active ? '60px' : '0'};
    left: 0;
    transition: 0.2s;
    background-color: ${COLOR.HLNormalLBlue};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    ${({ $activeColor }) => $activeColor === COLOR.HLNormalLBlue ? 'z-index: 2002' : 'z-index: 2000'};
  }
  & div:nth-child(3) {
    position: absolute;
    width: 100%;
    height: 50px;
    top: ${({ $active }) => $active ? '120px' : '0'};
    left: 0;
    transition: 0.2s;
    background-color: ${COLOR.HLNormalGreen};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    ${({ $activeColor }) => $activeColor === COLOR.HLNormalGreen ? 'z-index: 2002' : 'z-index: 2000'};
  }
  & div:nth-child(4) {
    position: absolute;
    width: 100%;
    height: 50px;
    top: ${({ $active }) => $active ? '180px' : '0'};
    left: 0;
    transition: 0.2s;
    background-color: ${COLOR.HLNormalYellow};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    ${({ $activeColor }) => $activeColor === COLOR.HLNormalYellow ? 'z-index: 2002' : 'z-index: 2000'};
  }
  & div:nth-child(5) {
    position: absolute;
    width: 100%;
    height: 50px;
    top: ${({ $active }) => $active ? '240px' : '0'};
    left: 0;
    transition: 0.2s;
    background-color: #F3EDD7;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    ${({ $activeColor }) => $activeColor === 'none' ? 'z-index: 2003' : 'z-index: 2003'};
  }

`;

// eslint-disable-next-line
export default {
  Container,
  FlagContainer,
}
