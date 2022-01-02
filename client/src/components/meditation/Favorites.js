import axios from "axios";
import React, { useState, useEffect } from "react";
import base from "../../config";
import Menu from "../core/Menu";
import cave from "../../assets/cave.jpg";
import forest from "../../assets/forest.jpeg";
import ocean from "../../assets/ocean.jpg";
import { Button } from "react-bootstrap";
import authHelpers from "../../services/auth-helpers";
import { update } from "../../services/api-user";

export default function Favorites() {
  const [five, setFive] = useState([]);
  const [ten, setTen] = useState([]);
  const [rest, setRest] = useState([]);
  const [user, setUser] = useState({});
  const jwt = authHelpers.isAuthenticated();

  useEffect(async () => {
    if (!sessionStorage.getItem("token")) return window.location.assign("/");

    let fav = [];

    axios.get(`${base}/api/cache`).then((res) => {
      fav = res.data.favorites;
      setUser(res.data);
    });

    let response = await axios.get(`${base}/api/data`);

    let tempFive = [];
    let tempTen = [];
    let tempRest = [];

    response.data.map((v, i) => {
      let tempL = v.length.split(":");

      fav.map((f, j) => {
        if (f === v.name) {
          if (parseInt(tempL[0]) <= 5) {
            tempFive.push(v);
          } else if (parseInt(tempL[0]) > 5 && parseInt(tempL[0]) <= 10) {
            tempTen.push(v);
          } else if (parseInt(tempL[0]) > 10) {
            tempRest.push(v);
          }
        }
      });
    });

    setFive(tempFive);
    setTen(tempTen);
    setRest(tempRest);
  }, []);

  const removeFromFav = (name) => {
    let newFav = [];
    let fav = user.favorites;

    fav.map((v, i) => {
      if (v !== name) {
        newFav.push(v);
      }
    });

    let updateFav = {
      favorites: newFav,
    };

    update({ userId: user._id }, { t: jwt }, updateFav).then((data) => {
      setUser(data);
      window.location.reload();
    });
  };

  return (
    <div>
      <Menu />

      <div className="all">
        {five.length > 0 && (
          <div className="five">
            <h2>Five min</h2>
            <div>
              {five &&
                five.map((v, i) => {
                  return (
                    <div key={i}>
                      {v.picture === "forest" && (
                        <img
                          style={{
                            width: "200px",
                            height: "200px",
                            cursor: "pointer",
                          }}
                          src={forest}
                          onClick={() =>
                            window.location.assign(`/songs/${v.name}`)
                          }
                          alt="forest"
                        />
                      )}
                      {v.picture === "cave" && (
                        <img
                          style={{
                            width: "200px",
                            height: "200px",
                            cursor: "pointer",
                          }}
                          src={cave}
                          alt="cave"
                          onClick={() =>
                            window.location.assign(`/songs/${v.name}`)
                          }
                        />
                      )}
                      {v.picture === "ocean" && (
                        <img
                          style={{
                            width: "200px",
                            height: "200px",
                            cursor: "pointer",
                          }}
                          src={ocean}
                          alt="ocean"
                          onClick={() =>
                            window.location.assign(`/songs/${v.name}`)
                          }
                        />
                      )}
                      <p>
                        <i>
                          {v.name} {v.length}
                        </i>
                      </p>
                      <Button
                        variant="primary"
                        style={{
                          backgroundColor: "#6e88b1",
                          borderColor: "#6e88b1",
                          color: "#3ad3a0",
                        }}
                        onClick={() => removeFromFav(v.name)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                          style={{
                            backgroundColor: "#6e88b1",
                            color: "#3ad3a0",
                          }}
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fillRule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </Button>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {ten.length > 0 && (
          <div className="five">
            <h2>Ten min</h2>
            <div>
              {ten &&
                ten.map((v, i) => {
                  return (
                    <div key={i}>
                      {v.picture === "forest" && (
                        <img
                          style={{
                            width: "200px",
                            height: "200px",
                            cursor: "pointer",
                          }}
                          src={forest}
                          alt="forest"
                          onClick={() =>
                            window.location.assign(`/songs/${v.name}`)
                          }
                        />
                      )}
                      {v.picture === "cave" && (
                        <img
                          style={{
                            width: "200px",
                            height: "200px",
                            cursor: "pointer",
                          }}
                          src={cave}
                          alt="cave"
                          onClick={() =>
                            window.location.assign(`/songs/${v.name}`)
                          }
                        />
                      )}
                      {v.picture === "ocean" && (
                        <img
                          style={{
                            width: "200px",
                            height: "200px",
                            cursor: "pointer",
                          }}
                          src={ocean}
                          alt="ocean"
                          onClick={() =>
                            window.location.assign(`/songs/${v.name}`)
                          }
                        />
                      )}
                      <p>
                        <i>
                          {v.name} {v.length}
                        </i>
                      </p>
                      <Button
                        variant="primary"
                        style={{
                          backgroundColor: "#6e88b1",
                          borderColor: "#6e88b1",
                          color: "#3ad3a0",
                        }}
                        style={{ backgroundColor: "#6e88b1", color: "#3ad3a0" }}
                        onClick={() => removeFromFav(v.name)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                          style={{
                            backgroundColor: "#6e88b1",
                            color: "#3ad3a0",
                          }}
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fillRule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </Button>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div className="five">
            <h2>Over Ten min</h2>
            <div>
              {rest &&
                rest.map((v, i) => {
                  return (
                    <div key={i}>
                      {v.picture === "forest" && (
                        <img
                          style={{
                            width: "200px",
                            height: "200px",
                            cursor: "pointer",
                          }}
                          src={forest}
                          alt="forest"
                          onClick={() =>
                            window.location.assign(`/songs/${v.name}`)
                          }
                        />
                      )}
                      {v.picture === "cave" && (
                        <img
                          style={{
                            width: "200px",
                            height: "200px",
                            cursor: "pointer",
                          }}
                          src={cave}
                          alt="cave"
                          onClick={() =>
                            window.location.assign(`/songs/${v.name}`)
                          }
                        />
                      )}
                      {v.picture === "ocean" && (
                        <img
                          style={{
                            width: "200px",
                            height: "200px",
                            cursor: "pointer",
                          }}
                          src={ocean}
                          alt="ocean"
                          onClick={() =>
                            window.location.assign(`/songs/${v.name}`)
                          }
                        />
                      )}
                      <p>
                        <i>
                          {v.name} {v.length}
                        </i>
                      </p>
                      <Button
                        variant="primary"
                        style={{
                          backgroundColor: "#6e88b1",
                          borderColor: "#6e88b1",
                          color: "#3ad3a0",
                        }}
                        style={{ backgroundColor: "#6e88b1", color: "#3ad3a0" }}
                        onClick={() => removeFromFav(v.name)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                          style={{
                            backgroundColor: "#6e88b1",
                            color: "#3ad3a0",
                          }}
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fillRule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </Button>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
