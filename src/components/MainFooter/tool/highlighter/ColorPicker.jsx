import { useRecoilState } from 'recoil';
import colorState from '../../../../states/color/colorHLState';
import Style from './ColorPicker.style';

const ColorPicker = ({ color }) => {
  const [ highlightColor, setHighlightColor ] = useRecoilState(colorState);

  const changeColor = () => {
    setHighlightColor(color);
  }
  return (
    <Style.Container $color={color} onClick={changeColor}/>
  )
}

export default ColorPicker;
