"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// Add this import near the top of the file:
import API_BASE_URL from "@/utils/api";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
    re_pass: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    // Form logic updated from your original JSP verification rules
    if (!formData.pass) {
      setMessage("** Please Fill Password");
      setIsError(true);
      return;
    }
    if (formData.pass.length < 8) {
      setMessage("** Password Must Be Greater Than 8 Digits");
      setIsError(true);
      return;
    }
    if (formData.pass.length > 12) {
      setMessage("** Password Must Be Smaller Than 12 Digits");
      setIsError(true);
      return;
    }
    if (formData.pass !== formData.re_pass) {
      setMessage("** Passwords Are Not Same");
      setIsError(true);
      return;
    }

    // Connects directly to your Express API engine endpoint
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Registration operational error");

      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setMessage(err.message);
      setIsError(true);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="row justify-content-center align-items-center bg-body-tertiary p-5 shadow rounded text-body-secondary"
        style={{ opacity: 0.95 }}
      >
        <div className="col-md-6">
          <h2 className="mb-4 fw-bold text-body-emphasis">Registration</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="pass"
                className="form-control"
                placeholder="Password"
                value={formData.pass}
                onChange={handleChange}
              />
              {isError && (
                <div className="text-danger mt-1 small fw-bold">{message}</div>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="re_pass"
                className="form-control"
                placeholder="Repeat your password"
                value={formData.re_pass}
                onChange={handleChange}
              />
            </div>
            {!isError && message && (
              <div className="alert alert-success">{message}</div>
            )}
            <button
              type="submit"
              className="btn w-100 text-white fw-bold shadow"
              style={{
                background: "linear-gradient(45deg, #b897ff, #83e9aa)",
                borderRadius: "6px",
              }}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-6 text-center mt-4 mt-md-0">
          <Image
            src="/images/registration-low-resolution-logo-black-on-transparent-background.png"
            alt="Registration Logo"
            width={400}
            height={100}
            className="img-fluid mb-4"
          />
          <div>
            <Link
              href="/login"
              className="text-decoration-none small fw-bold"
              style={{ color: "#b897ff" }}
            >
              Already a member? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
