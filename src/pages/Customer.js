import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Customer.css";
import Navbar from "../components/Navbar";

export default function Customer() {
  const [events, setEvents] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetch("http://localhost:8082/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="customer-container">
      <Navbar />
      <header>
        <h1>Welcome, {username}</h1>
        <p>Browse and book your favorite events</p>
      </header>

      <div className="event-grid">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <h3>{event.name}</h3>
            <p>Date: {event.date.split("T")[0]}</p>
            <p>Price: ${event.price}</p>
            <Link to="/book">
              <button>Book Ticket</button>
            </Link>
          </div>
        ))}
        {events.length === 0 && <p>No events available available yet.</p>}
      </div>
    </div>
  );
}
