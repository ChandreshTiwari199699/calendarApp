import { useState } from "react";
import MonthNavigator from "./MonthNavigator";
import DayCell from "./DayCell";
import { getDaysInMonthGrid } from "../utils/dateUtils";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const days = getDaysInMonthGrid(currentDate);

  return (
    <div className="bg-white p-4 rounded-xl shadow max-w-5xl mx-auto">
      <MonthNavigator date={currentDate} onChange={setCurrentDate} />
      <div className="grid grid-cols-7 text-center font-semibold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 mt-2">
        {days.map((day, index) => (
          <DayCell
            key={index}
            day={day}
            currentMonth={currentDate.getMonth()}
            events={events}
            setEvents={setEvents}
          />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
