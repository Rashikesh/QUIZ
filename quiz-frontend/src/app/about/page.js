"use client";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";

export default function AboutPage() {
  const { darkMode } = useTheme();

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-between bg-body">
      {/* Structural Navbar Template Wrapper */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <Link
            href="/categories"
            className="custom-nav-btn text-decoration-none text-white fw-bold"
          >
            Quiz App
          </Link>
          <Link
            href="/categories"
            className="text-white-50 text-decoration-none small fw-medium"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Structural Presentation Content Block */}
      <div className="container my-5" style={{ maxWidth: "800px" }}>
        <div className="row align-items-center g-5">
          <div className="col-lg-6 text-center text-lg-start">
            <img
              src="/images/qwizzy-low-resolution-logo-black-on-transparent-background.png"
              alt="Quiz App Logo"
              className={`img-fluid mb-4 p-2 rounded ${darkMode ? "bg-white" : ""}`}
              style={{ maxWidth: "280px" }}
            />
            <h1 className="fw-black text-body-emphasis mb-3">About Us</h1>
            <p className="lead text-secondary lh-base">
              Quiz App is an online platform that provides a fun and engaging
              way to test your knowledge on a variety of topics. Our quizzes are
              designed to be both entertaining and educational, with questions
              that cover a wide range of subjects.
            </p>
          </div>

          <div className="col-lg-6">
            <h2
              className="fw-bold mb-3 text-center text-lg-start"
              style={{ color: "#534ade" }}
            >
              Our Mission
            </h2>
            <p className="lead text-secondary lh-base">
              Our mission is to create a platform that makes learning fun and
              accessible to everyone. We believe that education should be
              enjoyable, and our quizzes are designed to be both entertaining
              and informative.
            </p>
          </div>
        </div>
      </div>

      {/* Persistent Global Application Footer Frame */}
      <footer className="bg-dark text-light py-4 border-top border-secondary">
        <div className="container">
          <div className="row text-center text-md-start">
            <div className="col-md-6 mb-2 mb-md-0">
              <p className="mb-0 text-white-50 small">
                Quiz App &copy; {new Date().getFullYear()}
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0 text-white-50 small">
                Designed by <span className="text-white fw-bold">QWIZZY</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scoped Embedded CSS Styles Mapping Legacy Behaviors */}
      <style jsx>{`
        .custom-nav-btn {
          background-color: #534ade;
          border-radius: 4px;
          padding: 10px 24px;
          transition: background-color 0.4s;
        }
        .custom-nav-btn:hover {
          background-color: #cc9bf4;
          color: #000000 !important;
        }
      `}</style>
    </div>
  );
}
