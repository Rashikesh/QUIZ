"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center p-4 bg-light text-center">
      {/* Decorative Branding Frame */}
      <div className="animate__animated animate__fadeIn">
        <h1
          className="display-1 fw-black mb-2"
          style={{ color: "#534ad3", letterSpacing: "-1px" }}
        >
          Qwizzy
        </h1>
        <p
          className="lead text-secondary mb-5 max-width-md mx-auto fw-medium"
          style={{ maxWidth: "600px" }}
        >
          An online platform providing a fun and engaging way to test your
          knowledge on a variety of topics. Designed to be both entertaining and
          educational.
        </p>
      </div>

      {/* Primary Gateway Controls */}
      <div
        className="d-flex flex-column flex-sm-row justify-content-center gap-3 w-100 max-width-xs"
        style={{ maxWidth: "400px" }}
      >
        <Link
          href="/login"
          className="btn btn-lg text-white fw-bold py-3  px-4 d-flex align-items-center shadow-sm transition-btn"
          style={{
            background: "linear-gradient(45deg, #b897ff, #534ad3)",
            textAlign: "center",
            // lineHeight: "1.5",
            display: "inline-block",
            border: "none",
            borderRadius: "120px",
            whiteSpace: "nowrap",
            minWidth: "50px",
          }}
        >
          Sign In
        </Link>

        <Link
          href="/register"
          className="btn btn-lg btn-outline-secondary fw-bold py-3 px-5 shadow-sm transition-btn"
          style={{ borderRadius: "50px" }}
        >
          Register
        </Link>
      </div>

      {/* Mini Simple Footer Link Element */}
      <div
        className="mt-5 pt-4 text-muted small border-top w-100"
        style={{ maxWidth: "200px" }}
      >
        Quiz App &copy; {new Date().getFullYear()}
      </div>

      {/* Scoped Button Animation Effects */}
      <style jsx>{`
        .transition-btn {
          transition:
            transform 0.2s,
            box-shadow 0.2s;
        }
        .transition-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(83, 74, 211, 0.2) !important;
        }
      `}</style>
    </div>
  );
}
