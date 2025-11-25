
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { signInWithGoogle } from "../firebaseConfig";

export default function Home({ onGetStarted, onLogin, onRegister }) {
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Smooth fade-in animation on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleGoogleAuth = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);

    try {
      const { user, idToken } = await signInWithGoogle();
      console.log("✅ Authentication successful! Sending token to backend...");

      const backendResponse = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!backendResponse.ok) {
        const errorData = await backendResponse.json();
        throw new Error(errorData.error || "Backend verification failed.");
      }

      const data = await backendResponse.json();
      console.log("🎯 Backend response (User saved/found):", data);

      alert(`🎉 Welcome, ${data.user.name || user.email}!`);
      onGetStarted();
    } catch (error) {
      if (
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request"
      ) {
        console.warn("⚠️ User closed popup before completion. Ignoring...");
        return;
      }

      console.error("❌ Authentication Process Failed:", error.message);
      alert("Authentication failed. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e8eaf6 50%, #f3e5f5 100%)",
        color: "#212529",
        overflowY: "auto",
        scrollBehavior: "smooth",
        scrollbarWidth: "thin",
        scrollbarColor: "#ba68c8 #f3e5f5",
      }}
    >
      {/* Header */}
      <header
        className="shadow-sm position-sticky top-0 z-3"
        style={{
          background: "linear-gradient(90deg, #7986cb 0%, #ba68c8 100%)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div className="container">
          <div className="d-flex justify-content-between align-items-center py-3">
            <h4 className="text-white fw-bold mb-0">SmartInterview Portal</h4>
            {/* MODIFICATION: secure login replaced with Sign In/Register */}
            <button
              onClick={handleGoogleAuth}
              disabled={isSigningIn}
              className="btn btn-light text-primary px-4 fw-semibold"
              style={{
                borderRadius: "25px",
                transition: "all 0.3s ease",
                opacity: isSigningIn ? 0.7 : 1,
                cursor: isSigningIn ? "not-allowed" : "pointer",
                boxShadow: "0 3px 8px rgba(0, 0, 0, 0.15)",
              }}
              onMouseEnter={(e) => {
                if (!isSigningIn) {
                  e.target.style.transform = "translate(-2px, -3px) scale(1.02)";
                  e.target.style.boxShadow = "0 6px 15px rgba(0,0,0,0.3)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translate(0, 0) scale(1)";
                e.target.style.boxShadow = "0 3px 8px rgba(0, 0, 0, 0.15)";
              }}
            >
              {isSigningIn ? "⏳ Authenticating..." : "Sign In/Register"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container text-center flex-grow-1 py-5">
        {/* Simplified and Smaller Main Heading */}
        <h1
          className="fw-bold mb-3 animate__animated animate__fadeInDown"
          style={{
            fontSize: "2.5rem",
            background: "linear-gradient(135deg, #5c6bc0 0%, #8e24aa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-1px",
            textShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
         SmartInterview Portal with AI Feedback
        </h1>

        {/* Motto without horizontal lines */}
        <p
          className="text-dark fs-6 mb-4 fw-medium p-2 opacity-75" 
          style={{
            maxWidth: "800px",
            margin: "15px auto",
            lineHeight: "1.75",
          }}
        >
            Practice mock interviews and receive instant AI-driven feedback.
        </p>

        {/* Hero Image */}
        <div className="mb-4 text-center" style={{ scrollSnapAlign: "start" }}>
          <img
            src="/images/image.png"
            alt="Interview Preparation Interface"
            className="rounded-4 shadow border border-light"
            style={{
              maxWidth: "800px",
              height: "400px",
              objectFit: "cover",
              transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.5s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
            }}
          />
        </div>

        {/* MODIFICATION: Begin Your Assessment replaced with Get Started */}
        <button
          onClick={handleGoogleAuth}
          disabled={isSigningIn}
          className="btn btn-lg px-5 py-3 fw-bold text-white mb-4 shadow-lg"
          style={{
            background: "linear-gradient(90deg, #7986cb 0%, #ba68c8 100%)",
            border: "none",
            borderRadius: "30px",
            transition: "all 0.4s ease-in-out",
            opacity: isSigningIn ? 0.7 : 1,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
          onMouseEnter={(e) => {
            if (!isSigningIn) {
              e.target.style.transform = "scale(1.15)";
              e.target.style.boxShadow = "0 12px 30px rgba(138, 43, 226, 0.6)";
              e.target.style.background = "linear-gradient(90deg, #ba68c8 0%, #7986cb 100%)";
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
            e.target.style.background = "linear-gradient(90deg, #7986cb 0%, #ba68c8 100%)";
          }}
        >
          {isSigningIn ? "🔄 Authenticating..." : "Get Started"}
        </button>

        {/* Structured Interview Process section (minimal gap above) */}
        <section className="pt-5 pb-5">
          <h2 className="fw-bold mb-5" style={{ color: "#7986cb" }}>
            The Structured Interview Process
          </h2>
          <div className="row g-4 justify-content-center">
            {[
              {
                step: "1",
                title: "Select Domain Expertise",
                text: "Select from technical roles like Frontend, Backend, Data Science, or behavioral domains.",
              },
              {
                step: "2",
                title: "Verbal Response Capture",
                text: "Listen to the question via speaker, then record your detailed answer using voice input.",
              },
              {
                step: "3",
                title: "AI Performance Evaluation",
                text: "Receive instant, objective results and AI feedback on content, clarity, and confidence.",
              },
            ].map((item, index) => (
              <div className="col-lg-4 col-md-6" key={index} style={{ scrollSnapAlign: "center" }}>
                <div
                  className="card h-100 border-0 p-4 shadow-lg"
                  style={{
                    borderRadius: "20px",
                    background: index % 2 === 0 ? "#ffffff" : "#f3e5f5",
                    border: `1px solid ${index % 2 === 0 ? '#e0e0e0' : '#d1c4e9'}`,
                    transition: "all 0.5s cubic-bezier(0.17, 0.84, 0.44, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-15px) rotate(-1deg)";
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) rotate(0)";
                    e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.15)";
                  }}
                >
                  <div className="card-body">
                    <div
                      className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center fw-bold"
                      style={{
                        width: "60px",
                        height: "60px",
                        background: "linear-gradient(45deg, #ba68c8 0%, #7986cb 100%)",
                        color: "white",
                        fontSize: "2rem",
                        boxShadow: "0 5px 10px rgba(0,0,0,0.3)",
                      }}
                    >
                      {item.step}
                    </div>
                    <h5 className="fw-bold text-dark mb-2 mt-3">{item.title}</h5>
                    <p className="text-secondary">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The removed spacer div and content was here */}


        {/* Feature Cards Section (Formalized Titles) */}
        {/* Adjusted top margin/padding: removed mt-5 and pt-5 */}
        <h2 className="fw-bold mb-4 mt-3 pt-3" style={{ color: "#7986cb" }}>
            Core Platform Services
        </h2>
        <div
          className="row g-4 pb-5"
          style={{
            scrollSnapType: "y proximity",
          }}
        >
          {[
            {
              icon: "💡",
              title: "AI-Powered Simulation",
              text: "Answer role-based questions with AI evaluation and detailed, constructive feedback.",
            },
            {
              icon: "🧩",
              title: "Multidisciplinary Role Support",
              text: "Comprehensive selection across Frontend, Backend, Data Science, DevOps, and specialized domains.",
            },
            {
              icon: "📈",
              title: "Immediate Reporting & Analytics",
              text: "Get a detailed performance report with scores, transcripts, and progress tracking after each response.",
            },
          ].map((f, i) => (
            <div
              className="col-md-4 d-flex align-items-stretch"
              key={i}
              style={{
                scrollSnapAlign: "center",
              }}
            >
              <div
                className="card border-0 shadow-lg w-100"
                style={{
                  background: "linear-gradient(145deg, #ffffff, #f3e5f5)",
                  borderRadius: "20px",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 20px 45px rgba(138, 43, 226, 0.5)";
                  e.currentTarget.style.background = "linear-gradient(145deg, #f3e5f5, #ffffff)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.15)";
                  e.currentTarget.style.background = "linear-gradient(145deg, #ffffff, #f3e5f5)";
                }}
              >
                <div className="card-body text-center p-4">
                  <div
                    className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "75px",
                      height: "75px",
                      background:
                        "linear-gradient(135deg, #7986cb 0%, #ba68c8 100%)",
                      color: "white",
                      fontSize: "2.5rem",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    }}
                  >
                    {f.icon}
                  </div>
                  <h5 className="fw-bold mb-2 mt-3" style={{ color: "#5c6bc0" }}>{f.title}</h5>
                  <p className="text-secondary mb-0">{f.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-center py-4 mt-auto"
        style={{
          background: "linear-gradient(90deg, #7986cb 0%, #ba68c8 100%)",
          color: "white",
          fontWeight: "500",
        }}
      >
        © {new Date().getFullYear()} SmartInterview • All Rights Reserved
      </footer>
    </div>
  );
}