"use client";
import { Suspense } from "react";

export default function MathGameLayout({ children }) {
  return (
    <Suspense
      fallback={
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-body">
          <div
            className="spinner-border text-primary mb-3"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          ></div>
          <h5 className="text-muted fw-semibold">Loading Quiz Arena...</h5>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
