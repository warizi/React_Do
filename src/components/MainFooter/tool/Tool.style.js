import { styled } from "styled-components";
import { COLOR } from "../../../styles/COLOR";

const ANIMATION_TIME = 0.2;

const Container = styled.div`
  position: relative;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? COLOR.black : COLOR.background};
  transition: 0.2s;

  ${({ $selected }) => {
  return $selected ?
  'transform: translateY(-30px);'
  :
  ''
  }}

  & img{
    top: 10px;
    left: 0;
    width: 25px;
    height: 40px;
    transition: ${`${ANIMATION_TIME}s`};
    z-index: 3002;
  }

  &::after {
    content: '';
    position: absolute;
    display: ${({ $type }) => $type === 'highlighter' ? 'block' : 'none'};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background: ${({ $color }) => {
      if($color === COLOR.HLred) return 'rgba(240, 134, 134, 1)' 
      if($color === COLOR.HLBlue) return 'rgba(134, 164, 240, 1)'
      if($color === COLOR.HLGreen) return 'rgba(134, 240, 157, 1)'
      if($color === COLOR.HLyellow) return 'rgba(240, 230, 134, 1)'
    }};
    z-index: 102;
    transition: ${`${ANIMATION_TIME}s`};

  }
`;

export default {
  Container,
}
