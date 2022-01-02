import React, { useEffect } from "react";
import Header from "./core/Header";
import tutorialOne from "../assets/tutorialOne.jpg";
import tutorialTwo from "../assets/tutorialTwo.jpeg";

export default function Tutorial() {
  useEffect(() => {
    if (sessionStorage.getItem("token")) return window.location.assign("/all");
  }, []);

  return (
    <div>
      <Header />

      <div className="tutorial">
        <div className="tutorial-left">
          <img src={tutorialOne} alt="tutorial-one" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div className="tutorial-right">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <img src={tutorialTwo} alt="tutorial-twp" />
        </div>
      </div>
    </div>
  );
}
