import { useRecoilState } from 'recoil';
import Style from './FontSizeController.style';
import fontSizeState from '../../../states/font/fontSizeState';
import { setStorage } from '../../../utils/Storage';

const FontSizeController = () => {
  const [ fontsize, setFontsize ] = useRecoilState(fontSizeState);

  const handleFontSize = (event) => {
    event.preventDefault();
    const newFontSize = fontsize;
    const { innerText } = event.target;

    if(innerText === '작게' && newFontSize > 9) {
      setFontsize(newFontSize - 1);
      setStorage('fontSize', newFontSize - 1);
      return;
    }
    if(innerText === '크게' && newFontSize < 30) {
      setFontsize(newFontSize + 1);
      setStorage('fontSize', newFontSize + 1);
      return;
    }
  }
  
  return (
    <Style.Container $fontSize={fontsize}>
      <h3>글자 크기</h3>
      <p>투두리스트</p>
      <div>{`${fontsize}px`}</div>
      <button onClick={handleFontSize}>작게</button>
      <button onClick={handleFontSize}>크게</button>
    </Style.Container>
  )
}

export default FontSizeController;
