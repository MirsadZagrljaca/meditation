import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import base from "../../config";
import Menu from "../core/Menu";
import ReactAudioPlayer from "react-audio-player";
import authHelpers from "../../services/auth-helpers";
import { update } from "../../services/api-user";

import cave from "../../assets/cave.jpg";
import forest from "../../assets/forest.jpeg";
import ocean from "../../assets/ocean.jpg";

export default function Single() {
  const [song, setSong] = useState({});
  const [user, setUser] = useState({});
  const { name } = useParams();
  const jwt = authHelpers.isAuthenticated();

  useEffect(async () => {
    if (!sessionStorage.getItem("token")) return window.location.assign("/");

    let response = await axios.get(`${base}/api/data`);

    let temp = {};

    response.data.map((v, i) => {
      if (v.name === name) {
        temp = v;
      }
    });

    setSong(temp);

    axios.get(`${base}/api/cache`).then((res) => {
      setUser(res.data);
    });
  }, [name]);

  const ended = (e) => {
    let tempMin = parseInt(user.mindfulMinutes);

    if (user.mindfulMinutes === "No time meditating yet!") {
      tempMin = 0;
    }

    let temp = song.length.split(":");
    let min = parseInt(temp[0]);

    tempMin += min;

    let updateUser = {
      mindfulMinutes: tempMin,
    };

    update({ userId: user._id }, { t: jwt }, updateUser).then((data) => {
      console.log(data);
    });
  };

  const addToFav = () => {
    let favorites = user.favorites;

    if (favorites.length === 0) {
      favorites.push(song.name);
    } else {
      let counter = 0;
      favorites.map((v, i) => {
        if (v === song.name) {
          counter++;
        }
      });

      if (counter === 0) {
        favorites.push(song.name);
      }
    }

    let updateUser = {
      favorites: favorites,
    };

    update({ userId: user._id }, { t: jwt }, updateUser).then((data) => {
      console.log(data);
    });
  };

  return (
    <div>
      <Menu />

      <div className="single">
        <div>
          <div className="single-title">
            <h2>
              <i>{song.name}</i>
            </h2>
          </div>

          <div className="single-buttons">
            <Button
              variant="primary"
              style={{ backgroundColor: "#6e88b1", borderColor: "#6e88b1" }}
              onClick={addToFav}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-star"
                viewBox="0 0 16 16"
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "transparent",
                  color: "#3ad3a0",
                }}
              >
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
              </svg>
            </Button>

            <Button
              variant="primary"
              style={{
                backgroundColor: "#6e88b1",
                borderColor: "#6e88b1",
                color: "#3ad3a0",
              }}
              onClick={() => window.location.assign("/all")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-return-left"
                viewBox="0 0 16 16"
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "transparent",
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
                />
              </svg>
            </Button>
          </div>

          {song.picture === "forest" && (
            <img
              style={{ width: "30vw", height: "40vh" }}
              src={forest}
              alt="forest"
            />
          )}
          {song.picture === "cave" && (
            <img
              style={{ width: "30vw", height: "40vh" }}
              src={cave}
              alt="cave"
            />
          )}
          {song.picture === "ocean" && (
            <img
              style={{ width: "30vw", height: "40vh" }}
              src={ocean}
              alt="ocean"
            />
          )}

          <div className="single-main">
            <ReactAudioPlayer src={song.link} controls onEnded={ended} />
          </div>
        </div>
      </div>
    </div>
  );
}
