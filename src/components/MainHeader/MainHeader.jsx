import { useState } from 'react';
import Style from './MainHeader.style';
import { COLOR } from '../../styles/COLOR';
import { useRecoilState } from 'recoil';
import colorFlagState from '../../states/color/colorFlagState';

const DAY_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

const MainHeader = () => {
  const [ activeFlag, setActiveFlag ] = useState(false);
  const [ activeColor, setActiveColor ] = useRecoilState(colorFlagState);
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
    if (date < 10) return `0${date}`
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

  return (
    <Style.Container $isHoliday={isHoliday()}>
      <Style.FlagContainer $active={activeFlag} $activeColor={activeColor}>
        <div onClick={handleFlagClick} name={COLOR.HLNormalRed}></div>
        <div onClick={handleFlagClick} name={COLOR.HLNormalLBlue}></div>
        <div onClick={handleFlagClick} name={COLOR.HLNormalGreen}></div>
        <div onClick={handleFlagClick} name={COLOR.HLNormalYellow}></div>
        <div onClick={handleFlagClick} name='none'></div>
      </Style.FlagContainer>
      <h1>To Do</h1>
      <span>{`${year}.${returnMonth()}.${retunrDate()}(${week})`}</span>
    </Style.Container>
  )
}

export default MainHeader;
