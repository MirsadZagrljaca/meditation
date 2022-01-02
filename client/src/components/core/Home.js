import React, { useEffect } from "react";
import Header from "./Header";
import home from "../../assets/home.jpeg";

export default function Home() {
  useEffect(() => {
    if (sessionStorage.getItem("token")) return window.location.assign("/all");
  }, []);

  return (
    <div>
      <Header />

      <div className="home">
        <div>
          <img src={home} alt="home" />
          <h1>
            <i>Sleep more. Stress Less. Live Better</i>
          </h1>
        </div>
      </div>
    </div>
  );
}
