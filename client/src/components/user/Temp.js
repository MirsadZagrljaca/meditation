import axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import base from "../../config";
import { update } from "../../services/api-user";
import authHelpers from "../../services/auth-helpers";
import Header from "../core/Header";

export default function Temp() {
  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const jwt = authHelpers.isAuthenticated();

  useEffect(async () => {
    let response = await axios.get(`${base}/api/cache`);

    setUser(response.data);
  }, []);

  const newPassword = async () => {
    let newUser = {
      password: password,
    };

    let array = password.split("");
    if (array.length < 8) {
      return setError("Password must be at least 8 characters!");
    }

    update({ userId: user._id }, { t: jwt }, newUser).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setError("");
        window.location.assign("/all");
      }
    });
  };

  return (
    <div>
      <Header />

      <div className="register">
        <div>
          <div className="form-group" style={{ marginTop: "2rem" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              defaultValue={user.username}
              disabled={true}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
              defaultValue={user.email}
              disabled={true}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <div className="register-buttons">
            <Button variant="primary" onClick={newPassword}>
              Choose password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
