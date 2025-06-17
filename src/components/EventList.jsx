// Eventlist

import React, { useState } from "react";
import EventModal from "./EventModal";

function EventList({ date, events = [], onClose, onSave }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className='modal'>
      <h2>Events for {date}</h2>
      <ul>
        {events.map((item, index) =>
          <li key={index}>
            {item.title} — {item.desc}
          </li>)
        }
      </ul>

      <button onClick={() => setOpenModal(true)}>Add</button>
      <button onClick={onClose}>
        Close
      </button>

      {openModal &&
        <EventModal
          onSave={(item) => {
            onSave(item);
            setOpenModal(false);
          }}
          onClose={() => setOpenModal(false)}
        />}
    </div>
  )
}

export default EventList;
