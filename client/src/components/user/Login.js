import React, { useState, useEffect } from "react";
import Header from "../core/Header";
import { Alert, Button } from "react-bootstrap";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import base from "../../config";
import authHelpers from "../../services/auth-helpers";
import { signin } from "../../services/auth-api";
import { update } from "../../services/api-user";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirect: false,
  });

  if (values.redirect) {
    return window.location.assign("/all");
  }

  const responseFacebook = async (resp) => {
    if (resp.accessToken) {
      let name = resp.name.split(" ");
      let newName = name[0] + name[1];

      let newUser = {
        username: newName,
        email: resp.email,
        password: "temptemp",
      };

      let response = await axios.post(`${base}/api/user/create`, newUser);

      if (response.data.error) {
        console.log(response.data.error);
      } else {
        signin(newUser).then((res) => {
          if (res.error) {
            setValues({ ...values, error: res.error });
          } else {
            authHelpers.authenticate(res.token, async () => {
              window.location.assign("/temp");
            });
          }
        });
      }
    }
  };

  const clickHandler = () => {
    let newUser = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(newUser).then((res) => {
      if (res.error) {
        setValues({ ...values, error: res.error });
      } else {
        authHelpers.authenticate(res.token, async () => {
          let resp = await axios.get(`${base}/api/cache`);
          let user = resp.data;
          user.totalSessions = user.totalSessions + 1;
          let longestStreak = user.longestStreak;
          const today = new Date();
          let day = today.getDate();
          let month = today.getMonth() + 1;
          let year = today.getFullYear();
          let date = day + "." + month + "." + year;

          let counter = 0;

          longestStreak.map((v, i) => {
            if (v === date) {
              counter++;
            }
          });

          if (counter === 0) {
            longestStreak.push(date);
          }

          let updateUser = {
            totalSessions: user.totalSessions,
            longestStreak: longestStreak,
          };

          update({ userId: user._id }, { t: res.token }, updateUser).then(
            (data) => {
              setValues({ ...values, error: "", redirect: true });
            }
          );
        });
      }
    });
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
            <i>Login</i>
          </h2>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Enter email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Enter password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>

          {values.error && <Alert variant="danger">{values.error}</Alert>}

          <div className="register-buttons">
            <Button variant="primary" onClick={clickHandler}>
              Login
            </Button>
            <Button
              variant="danger"
              onClick={() => window.location.assign("/")}
            >
              Back
            </Button>
          </div>

          <div className="register-facebook">
            <FacebookLogin
              appId="323364719656655"
              autoLoad={true}
              fields="name,email"
              callback={responseFacebook}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
