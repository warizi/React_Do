import { styled } from "styled-components";
import { COLOR } from "../../../styles/COLOR";

const Container = styled.div`
  position: relative;
  width: 64px;
  height: 121px;
  cursor: pointer;

  & img{
    position: absolute;
    top: 30px;
    left: 0;
    width: 64px;
    height: 121px;
    transition: 0.3s;
    z-index: 101;
    ${({ $selected }) => {
      return $selected ?
      'transform: translateY(-30px)'
      :
      ''
    }}
  }

  &::after {
    content: '';
    position: absolute;
    display: ${({ $type }) => $type === 'highlighter' ? 'block' : 'none'};
    top: 30px;
    left: 18px;
    width: 28px;
    height: 21px;
    border-radius: 8px 15px 0px 0px;
    background: ${({ $color }) => {
      if($color === COLOR.HLred) return 'rgba(240, 134, 134, 1)' 
      if($color === COLOR.HLBlue) return 'rgba(134, 164, 240, 1)'
      if($color === COLOR.HLGreen) return 'rgba(134, 240, 157, 1)'
      if($color === COLOR.HLyellow) return 'rgba(240, 230, 134, 1)'
    }};
    z-index: 102;
    transition: 0.3s;
    ${({ $selected }) => {
      return $selected ?
      'transform: translateY(-30px)'
      :
      ''
    }}
  }
`;

export default {
  Container,
}
