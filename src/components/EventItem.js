import React from "react";

export default function EventItem({ event, deleteEvent, setEditEvent }) {
  return (
    <div
      style={{
        padding: "15px",
        background: "#f9fafb",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h3>{event.name}</h3>
        <p>Date: {event.date}</p>
        <p>Price: ${event.price}</p>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setEditEvent(event)}>Edit</button>
        <button
          onClick={() => deleteEvent(event.id)}
          style={{ background: "#ef4444", color: "white" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
