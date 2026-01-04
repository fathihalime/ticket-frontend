import React from "react";
import EventItem from "./EventItem";

export default function EventList({ events, deleteEvent, setEditEvent }) {
  return (
    <div style={{ display: "grid", gap: "15px" }}>
      {events.map((event) => (
        <EventItem
          key={event.id}
          event={event}
          deleteEvent={deleteEvent}
          setEditEvent={setEditEvent}
        />
      ))}
    </div>
  );
}
