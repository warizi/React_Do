import Style from './DayPicker.style';

const DayPicker = ({ dayNumber }) => {
  return (
    <Style.Container>
      <Style.DayHeader>
        {dayNumber}
      </Style.DayHeader>
    </Style.Container>
  )
}

export default DayPicker;
