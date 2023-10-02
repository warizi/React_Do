import { useRecoilState } from 'recoil';
import Style from './DarkModeController.style';
import darkMode from '../../../states/darkMode/darkMode';
import { setStorage } from '../../../utils/Storage';

const DarkModeController = ({ isActive }) => {
  const [ isDarkMode, setIsDarkMode ] = useRecoilState(darkMode);
  const handleDarkMode = (event) => {
    const mode = event.target.innerText;
    if(mode === '라이트') {
      setIsDarkMode(false);
      setStorage('darkMode', { darkMode: false });
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '#FFF');
    }
    if(mode === '다크') {
      setIsDarkMode(true);
      setStorage('darkMode', { darkMode: true });      
      document.querySelector('meta[name="theme-color"]').setAttribute('content', 'rgb(40, 40, 40)');
    }
  }
  return (
    <Style.Container $isDarkMode={isDarkMode} $isActive={isActive}>
      <h3>다크모드</h3>
      <button onClick={handleDarkMode}>라이트</button>
      <button onClick={handleDarkMode}>다크</button>
    </Style.Container>
  )
}

export default DarkModeController;
