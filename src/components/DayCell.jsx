import { useState } from "react";
import EventModal from "./EventModal";

function DayCell({ day, currentMonth, events, setEvents }) {
  const [showModal, setShowModal] = useState(false);

  const today = new Date();
  const isToday =
    day.getFullYear() === today.getFullYear() &&
    day.getMonth() === today.getMonth() &&
    day.getDate() === today.getDate();

  const isCurrentMonth = day.getMonth() === currentMonth;

  const dayEvents = events.filter(
    (e) => new Date(e.date).toDateString() === day.toDateString()
  );

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className={`p-2 h-20 border rounded-lg cursor-pointer relative overflow-y-auto
        ${!isCurrentMonth ? "text-gray-400" : ""}
        ${isToday ? "bg-blue-100 font-bold border-blue-400" : ""}
        `}
      >
        <div className="text-sm">{day.getDate()}</div>
        {dayEvents.map((e, i) => (
          <div key={i} className="text-xs bg-blue-200 mt-1 rounded px-1 truncate">
            {e.title}
          </div>
        ))}
      </div>
      {showModal && (
        <EventModal
          date={day}
          onClose={() => setShowModal(false)}
          events={events}
          setEvents={setEvents}
        />
      )}
    </>
  );
}

export default DayCell;
