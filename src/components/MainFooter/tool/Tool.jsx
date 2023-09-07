import { useRecoilState } from 'recoil';
import Style from './Tool.style';
import toolsState from '../../../states/tools/toolsState';
import colorState from '../../../states/color/colorHLState';

const Tool = ({ imgUrl, altValue, nameValue}) => {
  const [ tools, setTools ] = useRecoilState(toolsState);
  const [ highlightColor, setHighlightColor ] = useRecoilState(colorState);

  const handleToolClick = (event) => {
    const clickedTool = event.target.name;
    if(clickedTool === tools) setTools('none');
    if(clickedTool !== tools) setTools(clickedTool);
  }
  const isSelected = () => {
    if(tools === nameValue) return true;
    return false;
  }
  return (
    <Style.Container $selected={isSelected()} $type={nameValue} $color={highlightColor}>
      <img 
        src={imgUrl} 
        alt={altValue} 
        name={nameValue} 
        onClick={handleToolClick}
      />
    </Style.Container>
  )
}

export default Tool
