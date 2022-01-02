import React from "react";
import paragon from "../../assets/paragon.png";

//6e88b1

export default function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <img
          src={paragon}
          alt="logo"
          onClick={() => window.location.assign("/")}
        />
      </div>

      <div className="header-right">
        <a href="/tutorial">How It Works</a>
        <a href="/register">Register</a>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
