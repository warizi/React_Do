import Style from './Calendar.style';

const MONTH_NAMES_SHORT = ['1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월'];
const DAY_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = () => {
  return (
    <Style.Container>
      <Style.NoticeContainer>
        <p>준비중...</p>
        <p>기대해주세요!</p>
      </Style.NoticeContainer>
      캘린더
      <Style.CalendarContainer>
        <Style.CalendarHeader>
          {DAY_OF_WEEK.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </Style.CalendarHeader>

      </Style.CalendarContainer>
    </Style.Container>
  )
}

export default Calendar;
