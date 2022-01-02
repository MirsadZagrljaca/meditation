import React, { useState, useEffect } from "react";
import Header from "../core/Header";
import { Alert, Button } from "react-bootstrap";
import axios from "axios";
import base from "../../config";

export default function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    error: "",
    redirect: false,
  });

  if (values.redirect) {
    return window.location.assign("/login");
  }

  const register = async () => {
    let newUser = {
      username: values.username || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    let response = await axios.post(`${base}/api/user/create`, newUser);

    if (response.data.error) {
      setValues({ ...values, error: response.data.error });
    } else {
      setValues({ ...values, error: "", redirect: true });
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) return window.location.assign("/all");
  }, []);

  return (
    <div>
      <Header />

      <div className="register">
        <div>
          <h2>
            <i>Register</i>
          </h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>

          {values.error && <Alert variant="danger">{values.error}</Alert>}

          <div className="register-buttons">
            <Button variant="primary" onClick={register}>
              Register
            </Button>
            <Button
              variant="danger"
              onClick={() => window.location.assign("/")}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
