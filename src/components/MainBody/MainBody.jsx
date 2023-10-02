import { useRecoilState, useRecoilValue } from 'recoil';
import Style from './MainBody.style';
import MainDo from './MainDo';
import pageState from '../../states/page/pageState';
import History from './History';
import Calendar from './Calendar/Calendar';
import { PAGES } from '../../constants/PAGES';
import { useState } from 'react';
import detectSwipe from '../../utils/detectSwipe';

const MainBody = () => {
  const [ page, setPage ] = useRecoilState(pageState);
  const [ titleText, setTitleText ] = useState('Do!');
  const [ swipe, setSwipe ] = useState(null);

  const handleSwipe = (event) => {
    const swipeType = detectSwipe(event, swipe, setSwipe);
    if(titleText === 'Setting!') return;
    if(swipeType === 'right' && page === PAGES.HOME) {
      setPage(PAGES.CALENDAR);
      setTitleText('Calendar!');
    }
    if(swipeType === 'left' && page === PAGES.HOME) {
      setPage(PAGES.HISTORY);
      setTitleText('History!');
    }
    if(swipeType === 'left' && page === PAGES.CALENDAR) {
      setPage(PAGES.HOME);
      setTitleText('Do!');
    }
    if(swipeType === 'right' && page === PAGES.HISTORY) {
      setPage(PAGES.HOME);
      setTitleText('Do!');
    }
  }
  return (
    <Style.Container
     $page={page}
     onTouchStart={handleSwipe}
     onTouchEnd={handleSwipe}
     onMouseDown={handleSwipe}
     onMouseLeave={handleSwipe}
     onMouseUp={handleSwipe}
    >
      {
        page === 'home' ? <MainDo /> : page === 'history' ? <History /> : <Calendar />
      }
    </Style.Container>
  )
}

export default MainBody;
