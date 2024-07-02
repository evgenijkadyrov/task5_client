import {CalendarTodo, RangeCalendar,DatePicker} from "datepicker_front";

export const Picker = () => {
    return (
        <div className={'containerPicker'}>
            <CalendarTodo color={'default'}/>
            <RangeCalendar startDayOfWeek={'Sunday'}/>
            <DatePicker color={'primary'} showHolidays={false} />
        </div>
    );
};

