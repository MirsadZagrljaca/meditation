import axios from "axios";
import React, { useState, useEffect } from "react";
import base from "../../config";
import Menu from "../core/Menu";
import cave from "../../assets/cave.jpg";
import forest from "../../assets/forest.jpeg";
import ocean from "../../assets/ocean.jpg";
import { useParams } from "react-router";

export default function Category() {
  const { category } = useParams();

  const [data, setData] = useState([]);
  const [five, setFive] = useState([]);
  const [ten, setTen] = useState([]);
  const [rest, setRest] = useState([]);

  useEffect(async () => {
    if (!sessionStorage.getItem("token")) return window.location.assign("/");

    let response = await axios.get(`${base}/api/data`);

    setData(response.data);
    let tempFive = [];
    let tempTen = [];
    let tempRest = [];

    response.data.map((v, i) => {
      let tempL = v.length.split(":");

      if (v.category === category) {
        if (parseInt(tempL[0]) <= 5) {
          tempFive.push(v);
        } else if (parseInt(tempL[0]) > 5 && parseInt(tempL[0]) <= 10) {
          tempTen.push(v);
        } else if (parseInt(tempL[0]) > 10) {
          tempRest.push(v);
        }
      }
    });

    setFive(tempFive);
    setTen(tempTen);
    setRest(tempRest);
  }, []);

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
