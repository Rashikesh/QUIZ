"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { useTheme } from "@/components/ThemeProvider";
import API_BASE_URL from "@/utils/api";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const { loginUser } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Checks cookie preference memory on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("qwizzy_remembered_email");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login operational failure");

      // Saves data tracking details into the global auth manager configuration
      loginUser(data.token, data.user, rememberMe, formData.email);

      if (data.user.role === "ADMIN") {
        router.push("/admin-dashboard");
      } else {
        router.push("/categories");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="container pt-5">
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-sm btn-outline-secondary shadow-sm"
          onClick={toggleTheme}
        >
          Switch to {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div
        className="row justify-content-center align-items-center bg-body-tertiary p-5 shadow rounded text-body-secondary"
        style={{ opacity: 0.95 }}
      >
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src="/images/login.png"
            alt="Login Banner"
            width={450}
            height={250}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <h2 className="mb-4 fw-bold text-body-emphasis">Login as</h2>

          {errorMessage && (
            <div className="alert alert-danger p-2 small mb-3 fw-bold">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLoginSubmit}>
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
                name="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-check mb-4">
              <input
                type="checkbox"
                id="remember-me"
                className="form-check-input"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor="remember-me"
                className="form-check-label small user-select-none"
              >
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="btn w-100 text-white fw-bold mb-3 shadow"
              style={{
                background: "linear-gradient(45deg, #b897ff, #83e9aa)",
                borderRadius: "6px",
              }}
            >
              Log in
            </button>
          </form>

          <div className="mt-4 border-top pt-3">
            <Link
              href="/register"
              className="text-decoration-none small fw-bold"
              style={{ color: "#b897ff" }}
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
