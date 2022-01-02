import axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import base from "../../config";
import Menu from "../core/Menu";
import authHelpers from "../../services/auth-helpers";
import { update } from "../../services/api-user";

export default function ChangePassword() {
  const [user, setUser] = useState({});
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
    error: "",
    redirect: false,
  });
  const jwt = authHelpers.isAuthenticated();

  useEffect(async () => {
    let response = await axios.get(`${base}/api/cache`);
    setUser(response.data);
  }, []);

  const changePassword = async () => {
    let passwordCheck = {
      email: user.email,
      password: values.oldPassword,
    };

    axios
      .post(`${base}/api/user/password/${user._id}`, passwordCheck)
      .then((response) => {
        if (response.data.error) {
          setValues({ ...values, error: "Current Password Incorrect!" });
        } else {
          if (values.newPassword !== values.repeatPassword) {
            setValues({ ...values, error: "Passwords Don't Match!" });
          } else {
            let check = values.newPassword.split("");
            if (check.length < 8) {
              setValues({
                ...values,
                error: "Password Must have at least 8 characters!",
              });
            } else {
              let updatedUser = {
                password: values.newPassword || undefined,
              };

              update({ userId: user._id }, { t: jwt }, updatedUser).then(
                (data) => {
                  if (data.error) {
                    setValues({ ...values, error: data.error });
                  } else {
                    setValues({ ...values, error: "", redirect: true });
                  }
                }
              );
            }
          }
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
            <i>Change Password</i>
          </h2>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Enter old password"
              onChange={(e) =>
                setValues({ ...values, oldPassword: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              onChange={(e) =>
                setValues({ ...values, newPassword: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Repeat new password"
              onChange={(e) =>
                setValues({ ...values, repeatPassword: e.target.value })
              }
            />
          </div>

          {values.error && <Alert variant="danger">{values.error}</Alert>}

          <div className="register-buttons">
            <Button variant="primary" onClick={changePassword}>
              Change Password
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
