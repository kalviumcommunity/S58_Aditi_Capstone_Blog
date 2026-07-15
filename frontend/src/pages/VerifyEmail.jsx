import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/auth/verify/${token}`)
      .then((res) => {
        setStatus("success");
        setMessage(res.data.message || "Email verified.");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.response?.data?.message || "Verification failed.");
      });
  }, [token]);

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h1 className="verify-title">Familiar</h1>

        {status === "verifying" && (
          <p className="verify-text">Verifying your email...</p>
        )}

        {status === "success" && (
          <>
            <p className="verify-text">{message}</p>
            <Link to="/login" className="verify-btn">
              Go to login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <p className="verify-text verify-error">{message}</p>
            <p className="verify-text">
              Sign in with your email and password and we&apos;ll offer you a
              fresh link.
            </p>
            <Link to="/login" className="verify-btn">
              Go to sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
