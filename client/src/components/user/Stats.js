import axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import base from "../../config";
import Menu from "../core/Menu";
import authHelpers from "../../services/auth-helpers";
import { update } from "../../services/api-user";

export default function Stats() {
  const [user, setUser] = useState({});
  const [streak, setStreak] = useState(0);
  const [longest, setLongest] = useState(0);
  const jwt = authHelpers.isAuthenticated();

  useEffect(async () => {
    let response = await axios.get(`${base}/api/cache`);
    setUser(response.data);
    setLongest(response.data.longest);
  }, []);

  useEffect(() => {
    if (!user.longestStreak) return;

    let tempLongest = user.longestStreak;

    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let date = day + "." + month + "." + year;
    let tempStreak = 0;

    if (tempLongest.length === 1) {
      setStreak(1);
      tempStreak = 1;
    } else {
      for (let j = tempLongest.length - 1; j >= 0; j--) {
        let d = tempLongest[j].split(".");

        if (parseInt(d[1]) === month && parseInt(d[2]) === year) {
          if (parseInt(d[0]) === day) {
            tempStreak++;
            day = parseInt(d[0]) - 1;
          }
        }
      }
      setStreak(tempStreak);
    }
    if (tempStreak > user.longest) {
      let updateUser = {
        longest: tempStreak,
      };

      update({ userId: user._id }, { t: jwt }, updateUser).then((data) => {
        setLongest(tempStreak);
      });
    }
  }, [user]);

  return (
    <div>
      <Menu />

      <div className="stats">
        <div>
          <h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-return-left"
              viewBox="0 0 16 16"
              onClick={() => window.location.assign("/all")}
              style={{ cursor: "pointer", width: "50px", height: "50px" }}
            >
              <path
                fillRule="evenodd"
                d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
              />
            </svg>
            <i>Welcome, {user.username}</i>
          </h2>

          <div className="stats-main">
            <div className="main-header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-repeat"
                viewBox="0 0 16 16"
                style={{ width: "75px", height: "75px" }}
              >
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                <path
                  fillRule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                />
              </svg>
              <p>
                <i>{streak} Day Streak!</i>
              </p>
            </div>

            <div className="main-main">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-repeat"
                  viewBox="0 0 16 16"
                  style={{ width: "50px", height: "50px" }}
                >
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                  <path
                    fillRule="evenodd"
                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                  />
                </svg>
                <p>
                  <i>Longest Streak: {user.longest}</i>
                </p>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check2-all"
                  viewBox="0 0 16 16"
                  style={{ width: "50px", height: "50px" }}
                >
                  <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                  <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                </svg>
                <p>
                  <i>Total Sessions: {user.totalSessions}</i>
                </p>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-clock"
                  viewBox="0 0 16 16"
                  style={{ width: "50px", height: "50px" }}
                >
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg>
                <p>
                  <i>Mindfull Minutes: {user.mindfulMinutes}</i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
