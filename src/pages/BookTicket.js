import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import "./BookTicket.css";

export default function BookTicket() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const userId = localStorage.getItem("user_id");

  // =======================
  // Fetch Booking History
  // =======================
  const fetchBookings = useCallback(() => {
    if (!userId) return;
    fetch(`https://ticket-backend-wdv5.onrender.com/bookings/${userId}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, [userId]);

  // =======================
  // Fetch Events & Bookings
  // =======================
  useEffect(() => {
    fetch("https://ticket-backend-wdv5.onrender.com/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        if (data.length > 0) setSelectedEventId(data[0].id);
      })
      .catch((err) => console.error("Error fetching events:", err));

    fetchBookings();
  }, [fetchBookings]);

  // =======================
  // Handle Booking
  // =======================
  const handleBooking = async () => {
    const event = events.find((e) => e.id === Number(selectedEventId));
    if (!event) return;

    const total = event.price * Number(quantity);

    try {
      const response = await fetch("https://ticket-backend-wdv5.onrender.com/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          eventId: event.id,
          quantity: Number(quantity),
          total,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        fetchBookings();
      }
    } catch (err) {
      console.error("Booking error:", err);
    }
  };

  const handleBookAnother = () => {
    setQuantity(1);
    setShowSuccess(false);
  };

  return (
    <>
      <Navbar />
      <div className="book-container">
        <div className="book-card">
          <h2>Book Tickets</h2>

          {showSuccess ? (
            <div>
              <p
                style={{
                  color: "#059669",
                  fontWeight: "600",
                  marginBottom: "20px",
                }}
              >
                Booking Confirmed! ✅
              </p>
              <button onClick={handleBookAnother}>Book Another Ticket</button>
            </div>
          ) : (
            <div>
              <label>Select Event</label>
              {events.length > 0 ? (
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                >
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name} - {event.date.split("T")[0]} - ${event.price}
                    </option>
                  ))}
                </select>
              ) : (
                <p>No events available</p>
              )}

              <label>Number of Tickets</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <button onClick={handleBooking} disabled={events.length === 0}>
                Confirm Booking
              </button>
            </div>
          )}

          <hr />

          <h3>Your Booking History</h3>
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <div className="history-list">
              {bookings.map((b) => (
                <div key={b.id} className="history-item">
                  <h4>{b.eventName}</h4>
                  <p>Date: {b.eventDate ? b.eventDate.split("T")[0] : "N/A"}</p>
                  <p>
                    Qty: {b.quantity} | Total: ${b.total}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
