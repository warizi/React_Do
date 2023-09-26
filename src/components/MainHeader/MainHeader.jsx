import { useState } from 'react';
import Style from './MainHeader.style';
import { COLOR } from '../../styles/COLOR';
import { useRecoilState } from 'recoil';
import colorFlagState from '../../states/color/colorFlagState';
import detectSwipe from '../../utils/detectSwipe';
import SortController from './control/SortController';
import FontSizeController from './control/FontSizeController';
import pageState from '../../states/page/pageState';
import { PAGES } from '../../constants/PAGES';

const DAY_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

const MainHeader = () => {
  const [ activeFlag, setActiveFlag ] = useState(false);
  const [ swipe, setSwipe ] = useState(null);
  const [ isControlBox, setIsControlBox ] = useState(false);
  const [ activeColor, setActiveColor ] = useRecoilState(colorFlagState);
  const [ titleText, setTitleText ] = useState('Do!');
  const [ page, setPage ] = useRecoilState(pageState);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const weekIndex = today.getDay();
  const week = DAY_OF_WEEK[weekIndex];
  
  const isHoliday = () => {
    if(weekIndex === 0) return 'sun';
    if(weekIndex === 6) return 'sat';
    return false;
  }
  const retunrDate = () => {
    if (date < 10) return `0${date}`;
    return date;
  }
  const returnMonth = () => {
    if (month < 10) return `0${month}`;
    return month;
  }

  const handleFlagClick = (event) => {
    const color = event.target.getAttribute('name');
    setActiveFlag((activeFlag) => !activeFlag);
    setActiveColor(color);
  }
  const handleSwipe = (event) => {
    const swipeType = detectSwipe(event, swipe, setSwipe);
    if(swipeType === 'down') {
      setTitleText('Setting!');
      setIsControlBox(true);
    }
    if(swipeType === 'up') {
      if(page === PAGES.HOME) setTitleText('Do!');
      if(page === PAGES.CALENDAR) setTitleText('Calendar!');
      if(page === PAGES.HISTORY) setTitleText('History!');
      setIsControlBox(false);
    }
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
      $isHoliday={isHoliday()} 
      onTouchStart={handleSwipe}
      onTouchEnd={handleSwipe}
      onMouseDown={handleSwipe}
      onMouseLeave={handleSwipe}
      onMouseUp={handleSwipe}
    >
      <Style.FlagContainer $active={activeFlag} $activeColor={activeColor}>
        <div onClick={handleFlagClick} name={COLOR.HLNormalRed}></div>
        <div onClick={handleFlagClick} name={COLOR.HLNormalLBlue}></div>
        <div onClick={handleFlagClick} name={COLOR.HLNormalGreen}></div>
        <div onClick={handleFlagClick} name={COLOR.HLNormalYellow}></div>
        <div onClick={handleFlagClick} name='none'></div>
      </Style.FlagContainer>
      <h1>{titleText}</h1>
      <span>{`${year}.${returnMonth()}.${retunrDate()} (${week})`}</span>
      <Style.ControlContainer $isActive={isControlBox}>
        <SortController name="sortList" />
        <FontSizeController />
      </Style.ControlContainer>
    </Style.Container>
  )
}

export default MainHeader;
