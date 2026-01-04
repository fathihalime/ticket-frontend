import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Event Ticket System</h2>
      </div>
      <div className="navbar-right">
        <span>{username} ({role})</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
