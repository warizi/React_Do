import { useRecoilValue } from 'recoil';
import Style from './MainBody.style';
import MainDo from './MainDo';
import pageState from '../../states/page/pageState';

const MainBody = () => {
  const page = useRecoilValue(pageState);
  return (
    <Style.Container $page={page}>
      {
        page === 'home' ? <MainDo /> : <></>
      }
    </Style.Container>
  )
}

export default MainBody;
