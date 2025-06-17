import { useState, useEffect } from "react";

function EventModal({ date, onClose, events, setEvents }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [editingId, setEditingId] = useState(null);

  const formattedDate = date.toDateString();

  const dayEvents = events.filter(
    (e) => new Date(e.date).toDateString() === formattedDate
  );

  const handleSave = () => {
    if (!title.trim()) return;

    if (editingId !== null) {
      const updatedEvents = events.map((e) =>
        e.id === editingId
          ? { ...e, title, description, time }
          : e
      );
      setEvents(updatedEvents);
    } else {
      const newEvent = {
        id: Date.now(),
        title,
        description,
        time,
        date: date.toISOString(),
      };
      setEvents([...events, newEvent]);
    }

    resetForm();
    onClose();
  };

  const handleEdit = (event) => {
    setTitle(event.title);
    setDescription(event.description);
    setTime(event.time);
    setEditingId(event.id);
  };

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    if (id === editingId) resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTime("");
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow w-96">
        <h2 className="text-xl font-bold mb-2">
          Events – {formattedDate}
        </h2>

        {dayEvents.length > 0 && (
          <div className="mb-3">
            {dayEvents.map((e) => (
              <div key={e.id} className="border p-2 mb-1 rounded">
                <div className="font-semibold">{e.title}</div>
                <div className="text-sm">{e.time}</div>
                <div className="text-sm">{e.description}</div>
                <div className="flex gap-4 mt-1">
                  <button
                    onClick={() => handleEdit(e)}
                    className="text-blue-500 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editingId !== null ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventModal;
