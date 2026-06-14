"use client";
import { useState } from "react";
import Link from "next/link";

export default function FeedbackPage() {
  const [status, setStatus] = useState("");

  // Handle local Formspree async pipeline submissions cleanly via AJAX fetch wrappers
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xdovrzzw", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
      } else {
        setStatus("ERROR");
      }
    } catch (err) {
      setStatus("ERROR");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light p-3">
      <div
        className="w-100 bg-white p-4 p-md-5 shadow-sm rounded-3"
        style={{ maxWidth: "600px" }}
      >
        <form onSubmit={handleFeedbackSubmit} className="d-flex flex-column">
          <h3 className="fw-black mb-4 h4" style={{ color: "#534ade" }}>
            Send Us Your Feedback
          </h3>

          {/* Status Message Banners */}
          {status === "SUCCESS" && (
            <div className="alert alert-success small fw-semibold p-2 mb-3">
              Thanks! Your feedback has been sent successfully.
            </div>
          )}
          {status === "ERROR" && (
            <div className="alert alert-danger small fw-semibold p-2 mb-3">
              Oops! There was a problem submitting your form.
            </div>
          )}

          <label className="form-label text-secondary small fw-bold mb-1">
            Your Email:
          </label>
          <input
            type="email"
            name="email"
            className="form-control mb-3 p-3 border-0 bg-light"
            placeholder="name@example.com"
            required
          />

          <label className="form-label text-secondary small fw-bold mb-1">
            Your Message:
          </label>
          <textarea
            name="message"
            rows="5"
            className="form-control mb-4 p-3 border-0 bg-light"
            placeholder="Type your review comments here..."
            required
          ></textarea>

          <button
            type="submit"
            className="btn py-3 text-white fw-bold shadow-sm transition border-0"
            style={{
              backgroundColor: "#2216d2",
              borderRadius: "30px",
              width: "160px",
              margin: "0 auto",
            }}
          >
            Send
          </button>
        </form>

        <div className="text-center mt-4">
          <Link
            href="/categories"
            className="text-decoration-none small text-muted hover-underlinefw-semibold"
          >
            Return to Main Dashboard
          </Link>
        </div>
      </div>

      <style jsx>{`
        .transition {
          transition:
            transform 0.2s,
            background-color 0.2s;
        }
        .transition:hover {
          background-color: #534ade !important;
          transform: translateY(-1px);
        }
        input:focus,
        textarea:focus {
          background-color: #e9ecef !important;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
}
