import Style from './MainFooter.style';
import pen from '../../assets/images/pen.png';
import highlighter from '../../assets/images/highlighter.png';
import eraser from '../../assets/images/eraser.png';
import Tool from './tool/Tool';
import toolsState from '../../states/tools/toolsState';
import { useRecoilValue } from 'recoil';
import ColorPicker from './tool/highlighter/ColorPicker';
import { COLOR } from '../../styles/COLOR';

const MainFooter = () => {
  const seletedTool = useRecoilValue(toolsState);
  return (
    <Style.Container>
      <Style.Palette $active={seletedTool}>
        <ColorPicker color={COLOR.HLred} />
        <ColorPicker color={COLOR.HLyellow} />
        <ColorPicker color={COLOR.HLGreen} />
        <ColorPicker color={COLOR.HLBlue} />
      </Style.Palette>
      <Tool imgUrl={pen} altValue="연필" nameValue="pen" />
      <Tool imgUrl={highlighter} altValue="형광펜" nameValue="highlighter" />
      <Tool imgUrl={eraser} altValue="지우개" nameValue="eraser"/>
    </Style.Container>
  )
}

export default MainFooter;
