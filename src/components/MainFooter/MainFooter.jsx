import Style from './MainFooter.style';
import pen from '../../assets/images/pen.png';
import highlighter from '../../assets/images/highlighter.png';
import eraser from '../../assets/images/eraser.png';
import Tool from './tool/Tool';
import toolsState from '../../states/tools/toolsState';
import { useRecoilState, useRecoilValue } from 'recoil';
import ColorPicker from './tool/highlighter/ColorPicker';
import { COLOR } from '../../styles/COLOR';
import darkMode from '../../states/darkMode/darkMode';

const MainFooter = () => {
  const isDarkMode = useRecoilValue(darkMode);
  const seletedTool = useRecoilValue(toolsState);
  const [ tools, setTools ] = useRecoilState(toolsState);
  return (
    <>
      <Style.PrevContainer $selectedTool={tools} $isDarkMode={isDarkMode}>
        <Style.PrevPen $selectedTool={tools}/>
        <Style.PrevHL $selectedTool={tools}/>
        <Style.PrevEraser $selectedTool={tools}/>
      </Style.PrevContainer>    
      <Style.Container $isDarkMode={isDarkMode}>
        <Style.Palette $active={seletedTool} $isDarkMode={isDarkMode}>
          <ColorPicker color={COLOR.HLred} />
          <ColorPicker color={COLOR.HLyellow} />
          <ColorPicker color={COLOR.HLGreen} />
          <ColorPicker color={COLOR.HLBlue} />
        </Style.Palette>
        <Tool imgUrl={pen} altValue="연필" nameValue="pen" />
        <Tool imgUrl={highlighter} altValue="형광펜" nameValue="highlighter" />
        <Tool imgUrl={eraser} altValue="지우개" nameValue="eraser"/>
      </Style.Container>
    </>
  )
}

export default MainFooter;
