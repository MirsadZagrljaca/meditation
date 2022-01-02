import axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import base from "../../config";
import Menu from "../core/Menu";
import authHelpers from "../../services/auth-helpers";
import { update } from "../../services/api-user";

export default function AccountDetails() {
  const [user, setUser] = useState({});
  const [values, setValues] = useState({
    username: "",
    email: "",
    error: "",
    redirect: false,
  });
  const jwt = authHelpers.isAuthenticated();

  useEffect(async () => {
    let response = await axios.get(`${base}/api/cache`);
    setUser(response.data);
  }, []);

  const edit = () => {
    let updateUser = {
      username: values.username || user.username,
      email: values.email || user.email,
    };

    update({ userId: user._id }, { t: jwt }, updateUser).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", redirect: true });
      }
    });
  };

  if (values.redirect) {
    return window.location.assign("/all");
  }

  return (
    <div>
      <Menu />

      <div className="register">
        <div>
          <h2>
            <i>Edit Account</i>
          </h2>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              defaultValue={user.username}
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
              defaultValue={user.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          {values.error && <Alert variant="danger">{values.error}</Alert>}

          <div className="register-buttons">
            <Button variant="primary" onClick={edit}>
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => window.location.assign("/all")}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
