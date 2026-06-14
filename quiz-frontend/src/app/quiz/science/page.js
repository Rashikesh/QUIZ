"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";

export default function ScienceQuizHome() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Validating...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-body">
      <nav className="navbar navbar-expand-lg border-bottom px-4 px-md-5 bg-body-tertiary shadow-sm">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link
            href="/categories"
            className="text-decoration-none fw-bold"
            style={{ color: "#534ad3", fontSize: "2.5rem" }}
          >
            Qwizzy
          </Link>
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={toggleTheme}
            >
              {darkMode ? "Light" : "Dark"} Mode
            </button>
            <Link
              href="/categories"
              className="text-decoration-none fw-medium text-body hover-underline"
            >
              Change Subject
            </Link>
          </div>
        </div>
      </nav>

      <div
        className="container d-flex flex-column align-items-center justify-content-center"
        style={{ marginTop: "10%" }}
      >
        <h1
          className="fw-bold mb-4 text-center display-3"
          style={{ color: "#534ad3" }}
        >
          Science & Nature Quiz
        </h1>
        <h2 className="mb-5 text-muted text-center h3">Select Level:-</h2>

        <div
          className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-4 w-100"
          style={{ maxWidth: "600px" }}
        >
          <Link
            href="/quiz/science/game?difficulty=easy"
            className="custom-quiz-btn py-3 px-5 text-center fw-semibold text-decoration-none"
          >
            Easy
          </Link>
          <Link
            href="/quiz/science/game?difficulty=medium"
            className="custom-quiz-btn py-3 px-5 text-center fw-semibold text-decoration-none"
          >
            Medium
          </Link>
          <Link
            href="/quiz/science/game?difficulty=hard"
            className="custom-quiz-btn py-3 px-5 text-center fw-semibold text-decoration-none"
          >
            Hard
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .custom-quiz-btn {
          color: #121212;
          border: 2px solid #534ad3;
          background: transparent;
          cursor: pointer;
          border-radius: 50px;
          min-width: 160px;
          transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        .custom-quiz-btn:hover {
          background: #534ad3;
          color: #ffffff !important;
          box-shadow: 0px 8px 15px rgba(83, 74, 211, 0.3);
          transform: translateY(-2px);
        }
        .hover-underline::after {
          content: "";
          width: 0%;
          height: 2px;
          background: #534ad3;
          display: block;
          margin: auto;
          transition: width 0.4s ease;
        }
        .hover-underline:hover::after {
          width: 100%;
        }
      `}</style>
    </div>
  );
}
