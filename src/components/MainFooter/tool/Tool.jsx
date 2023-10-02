import { useRecoilState, useRecoilValue } from 'recoil';
import Style from './Tool.style';
import toolsState from '../../../states/tools/toolsState';
import colorState from '../../../states/color/colorHLState';
import darkMode from '../../../states/darkMode/darkMode';

const Tool = ({ imgUrl, altValue, nameValue}) => {
  const [ tools, setTools ] = useRecoilState(toolsState);
  const isDarkMode = useRecoilValue(darkMode);
  const [ highlightColor, setHighlightColor ] = useRecoilState(colorState);

  const handleToolClick = (event) => {
    const clickedTool = nameValue;
    if(clickedTool === tools) setTools('none');
    if(clickedTool !== tools) setTools(clickedTool);
  }
  const isSelected = () => {
    if(tools === nameValue) return true;
    return false;
  }
  return (
    <>
      <Style.Container $selected={isSelected()} $type={nameValue} $color={highlightColor} onClick={handleToolClick} $isDarkMode={isDarkMode}>
        <img 
          src={imgUrl} 
          alt={altValue}
        />
      </Style.Container>
    </>
  )
}

export default Tool
