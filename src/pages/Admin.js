import React, { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import "./Admin.css";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchEvents();
    fetchBookings();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("https://ticket-backend-wdv5.onrender.com/events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch("https://ticket-backend-wdv5.onrender.com/admin/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const addEvent = async (event) => {
    try {
      const res = await fetch("https://ticket-backend-wdv5.onrender.com/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: event.name,
          date: event.date,
          price: event.price,
        }),
      });
      if (res.ok) fetchEvents();
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  const updateEvent = async (updated) => {
    try {
      const res = await fetch(`https://ticket-backend-wdv5.onrender.com/events/${updated.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updated.name,
          date: updated.date,
          price: updated.price,
        }),
      });
      if (res.ok) {
        fetchEvents();
        setEditEvent(null);
      }
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`https://ticket-backend-wdv5.onrender.com/events/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  return (
    <div className="admin-container">
      <Navbar />
      <header>
        <h1>Welcome, {username} (Admin)</h1>
        <p>Manage your events below</p>
      </header>

      <div className="admin-content">
        <div className="left-panel">
          <h2>Add / Edit Event</h2>
          <section className="form-section">
            <EventForm
              addEvent={addEvent}
              updateEvent={updateEvent}
              editEvent={editEvent}
            />
          </section>

          <h2>Current Events</h2>
          <section className="list-section">
            <EventList
              events={events}
              deleteEvent={deleteEvent}
              setEditEvent={setEditEvent}
            />
          </section>
        </div>

        <div className="right-panel">
          <h2>All User Bookings</h2>
          <div className="bookings-table-container">
            {bookings.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Event</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td>{b.username}</td>
                      <td>{b.email}</td>
                      <td>{b.eventName}</td>
                      <td>{b.quantity}</td>
                      <td>${b.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
