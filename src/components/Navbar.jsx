import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg shadow-lg"
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #d8b4fe 50%, #fbc2eb 100%)", // 💜 Added soft white tone blend
        padding: "10px 0",
      }}
    >
      <div className="container">
        {/* Brand / Logo */}
        <Link
          className="navbar-brand fw-bold fs-3 text-dark"
          to="/"
          style={{
            textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            letterSpacing: "0.5px",
            transition: "transform 0.3s ease, text-shadow 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.1)";
            e.target.style.textShadow = "2px 3px 8px rgba(0,0,0,0.3)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.textShadow = "1px 1px 2px rgba(0,0,0,0.2)";
          }}
        >
         SmartInterview
        </Link>

        {/* Navbar Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            borderColor: "rgba(0,0,0,0.2)",
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {["/", "/roles", "/questions", "/result"].map((path, index) => {
              const labels = ["Home", "Roles", "Q&A", "Result"];
              return (
                <li key={path} className="nav-item mx-2">
                  <NavLink
                    to={path}
                    end={path === "/"}
                    className={({ isActive }) =>
                      `nav-link ${
                        isActive ? "fw-bold text-dark" : "text-dark opacity-75"
                      }`
                    }
                    style={{
                      borderRadius: "25px",
                      padding: "8px 18px",
                      fontSize: "1rem",
                      transition: "all 0.3s ease-in-out",
                      background: "transparent",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background =
                        "linear-gradient(135deg, #b993d6, #fbc2eb)";
                      e.target.style.color = "#fff";
                      e.target.style.transform = "scale(1.08)";
                      e.target.style.boxShadow =
                        "0 4px 12px rgba(0,0,0,0.2)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = "transparent";
                      e.target.style.color = "black";
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    {labels[index]}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

