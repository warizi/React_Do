import { useRecoilValue } from 'recoil';
import Style from './HistoryListItem.style';
import fontSizeState from '../../states/font/fontSizeState';
import darkMode from '../../states/darkMode/darkMode';

const HistoryListItem = ({ content, highlight }) => {
  const fontSize = useRecoilValue(fontSizeState);
  const isDarkMode = useRecoilValue(darkMode);
  return (
    <Style.Container $highlight={highlight} $isDarkMode={isDarkMode} $fontSize={fontSize}>
      <div>{content}</div>
    </Style.Container>
  )
}

export default HistoryListItem;
