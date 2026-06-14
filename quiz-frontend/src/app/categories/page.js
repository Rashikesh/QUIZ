"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { useTheme } from "@/components/ThemeProvider";
import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  const router = useRouter();
  const { user, loading, logoutUser } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [typedText, setTypedText] = useState("");

  // 1. Typing loop automation refactored from your original custom script block
  useEffect(() => {
    const word = "Qwizzy";
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    function type() {
      const currentText = word.substring(0, charIndex);
      setTypedText(currentText);

      if (!isDeleting) {
        charIndex++;
      } else {
        charIndex--;
      }

      if (charIndex === word.length + 1) {
        isDeleting = true;
      }

      if (charIndex === 0 && isDeleting) {
        isDeleting = false;
      }

      const typingSpeed = isDeleting ? 100 : 200;
      timeoutId = setTimeout(type, typingSpeed);
    }

    type();
    return () => clearTimeout(timeoutId);
  }, []);

  // 2. Active session route sentinel: Kick out users who aren't logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Validating Session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: "70px" }}>
      {/* Dynamic Interface Action Header bar */}
      <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
        <div>
          <h5 className="mb-0 text-muted">
            Active Profile:{" "}
            <span className="text-primary fw-bold">{user.name}</span>
          </h5>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={toggleTheme}
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </button>
          <button className="btn btn-sm btn-danger" onClick={logoutUser}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Animated Title Header */}
      <h1 className="text-center mb-5 fw-bold text-uppercase text-primary text-center">
        <span
          style={{
            borderRight: "1px solid black",
            paddingRight: "4px",
            whiteSpace: "nowrap",
          }}
        >
          {typedText}
        </span>
      </h1>

      {/* Grid Interface Mapping Options */}
      <div className="row g-4 justify-content-center">
        {/* Module Choice Block: Science Layout */}
        <div className="col-md-5">
          <div className="card h-100 border-0 shadow-sm custom-card">
            <div
              style={{ position: "relative", height: "250px", width: "100%" }}
            >
              <img
                src="/images/Science.jpg"
                alt="Science Domain Illustration"
                className="w-100 h-100"
                style={{
                  objectFit: "cover",
                  borderTopLeftRadius: "0.375rem",
                  borderTopRightRadius: "0.375rem",
                }}
              />
            </div>
            <div className="card-body d-flex flex-column justify-content-between align-items-start">
              <h5 className="card-title fw-bold text-body-emphasis">
                Science Quiz
              </h5>
              <p className="card-text text-muted small">
                Challenge yourself with dynamic, randomized physics, chemistry,
                and biology problems.
              </p>
              <Link
                href="/quiz/science"
                className="btn btn-primary w-100 mt-2 fw-bold"
              >
                Play Quiz
              </Link>
            </div>
          </div>
        </div>

        {/* Module Choice Block: Math / General-Knowledge Layout */}
        <div className="col-md-5">
          <div className="card h-100 border-0 shadow-sm custom-card">
            <div
              style={{ position: "relative", height: "250px", width: "100%" }}
            >
              <img
                src="/images/General.jpg"
                alt="General Knowledge Illustration"
                className="w-100 h-100"
                style={{
                  objectFit: "cover",
                  borderTopLeftRadius: "0.375rem",
                  borderTopRightRadius: "0.375rem",
                }}
              />
            </div>
            <div className="card-body d-flex flex-column justify-content-between align-items-start">
              <h5 className="card-title fw-bold text-body-emphasis">
                General-Knowledge Quiz
              </h5>
              <p className="card-text text-muted small">
                Test your cognitive boundaries with mixed-bag logic,
                mathematics, and trivia structures.
              </p>
              <Link
                href="/quiz/math"
                className="btn btn-primary w-100 mt-2 fw-bold"
              >
                Play Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Card Scale Manipulation Transition Rules */}
      <style jsx global>{`
        .custom-card {
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }
        .custom-card:hover {
          transform: scale(1.03);
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  );
}
