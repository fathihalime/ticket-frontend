import React, { useState, useEffect } from "react";

export default function EventForm({ addEvent, updateEvent, editEvent }) {
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    price: "",
  });

  useEffect(() => {
    if (editEvent) setEventData(editEvent);
  }, [editEvent]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editEvent) updateEvent(eventData);
    else addEvent({ ...eventData, id: Date.now() });

    setEventData({ name: "", date: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        name="name"
        placeholder="Event Name"
        value={eventData.name}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={eventData.date}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={eventData.price}
        onChange={handleChange}
        required
      />
      <button type="submit">{editEvent ? "Update Event" : "Add Event"}</button>
    </form>
  );
}
