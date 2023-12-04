import Style from './Calendar.style';

const MONTH_NAMES_SHORT = [
  '1월', 
  '2월', 
  '3월', 
  '4월', 
  '5월', 
  '6월',
  '7월', 
  '8월', 
  '9월', 
  '10월', 
  '11월', 
  '12월'
];
const DAY_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = () => {

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const currentMonthDate = new Date(currentYear, currentMonth, 0);
  console.log(currentMonthDate)


  return (
    <Style.Container>
      <Style.CalendarContainer>
        <Style.CalendarHeader>
          {DAY_OF_WEEK.map((day, index) => (
            <div key={index}>
              <div>
               {day} 
              </div>
            </div>
          ))}
        </Style.CalendarHeader>

      </Style.CalendarContainer>
    </Style.Container>
  )
}

export default Calendar;
