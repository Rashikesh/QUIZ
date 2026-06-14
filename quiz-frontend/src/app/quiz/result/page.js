"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";

export default function QuizResultPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { darkMode } = useTheme();

  // Core Display States
  const [finalScore, setFinalScore] = useState(0);
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  // 1. Route sentinel guard: Protect page from logged-out traffic
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // 2. Safely extract final performance data out of local state storage on mount
  useEffect(() => {
    const savedScore = localStorage.getItem("mostRecentScore");
    if (savedScore) {
      setFinalScore(parseInt(savedScore, 10));
    }
  }, []);

  if (loading || !user) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-body">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading score report...</span>
        </div>
      </div>
    );
  }

  // Calculate dynamic styling metrics based on score out of 100 possible points
  const percentage = (finalScore / 100) * 100;
  const isPassed = percentage >= 50;

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
      style={{ backgroundColor: "#7489f0" }}
    >
      <div
        className="card border-0 shadow-lg w-100 p-4 p-md-5 text-center"
        style={{ maxWidth: "550px", borderRadius: "16px", opacity: 0.98 }}
      >
        {/* Dynamic Status Icon Header */}
        <div className="mb-4">
          {isPassed ? (
            <div className="display-1 text-success animate__animated animate__bounceIn">
              🎉
            </div>
          ) : (
            <div className="display-1 text-warning animate__animated animate__fadeIn">
              👍
            </div>
          )}
        </div>

        <h1 className="fw-black text-dark mb-2 display-6">Quiz Completed!</h1>
        <p className="text-muted mb-4 small fw-medium">
          Logged-in User Account Reference ID:{" "}
          <span className="badge bg-secondary font-monospace">{user.id}</span>
        </p>

        {/* Big Visual Scoreboard Container Layout */}
        <div className="bg-light p-4 rounded-3 mb-4 border shadow-sm">
          <p className="text-uppercase tracking-wider text-secondary fw-bold small mb-1">
            Your Total Score
          </p>
          <h2
            className={`display-3 fw-black m-0 ${isPassed ? "text-success" : "text-danger"}`}
          >
            {finalScore} <span className="text-muted fs-4">/ 100</span>
          </h2>
          <p className="mt-2 text-muted small fw-semibold">
            You got {finalScore / 10} out of 10 questions correct!
          </p>
        </div>

        {/* Interactive Checkbox (Refactored from your raw input tag blueprint) */}
        <div className="form-check d-flex justify-content-center align-items-center gap-2 mb-4 bg-light p-3 rounded border">
          <input
            type="checkbox"
            id="acknowledge-check"
            className="form-check-input m-0 cursor-pointer"
            style={{ width: "20px", height: "20px" }}
            checked={isAcknowledged}
            onChange={(e) => setIsAcknowledged(e.target.checked)}
          />
          <label
            htmlFor="acknowledge-check"
            className="form-check-label text-dark small user-select-none cursor-pointer fw-semibold"
          >
            I acknowledge and confirm this score submission
          </label>
        </div>

        {/* Platform Control Buttons */}
        <div className="d-flex flex-column gap-2">
          <Link
            href="/categories"
            className={`btn btn-lg fw-bold text-white shadow-sm py-3 transition ${!isAcknowledged ? "disabled opacity-50" : ""}`}
            style={{
              backgroundColor: "#534ad3",
              border: "none",
              borderRadius: "50px",
            }}
          >
            Back to Dashboards
          </Link>

          <Link
            href="/quiz/math"
            className="text-decoration-none small text-secondary mt-2 hover-underline fw-bold"
          >
            Try Another Level
          </Link>
        </div>
      </div>

      {/* Scoped Hover Interaction Tweaks */}
      <style jsx>{`
        .transition {
          transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        .transition:hover:not(.disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(83, 74, 211, 0.3) !important;
        }
        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
