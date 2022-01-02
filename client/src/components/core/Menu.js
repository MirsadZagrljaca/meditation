import React from "react";
import paragon from "../../assets/paragon.png";

export default function Menu() {
  const logout = () => {
    sessionStorage.removeItem("token");
    window.location.assign("/");
  };

  return (
    <div className="header">
      <div className="header-left">
        <img
          src={paragon}
          alt="logo"
          onClick={() => window.location.assign("/all")}
        />
      </div>

      <div className="menu-right">
        <a href="/favorites">My ♡</a>

        <div className="dropdown" style={{ backgroundColor: "#6e88b1" }}>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{
              backgroundColor: "#3ad3a0",
              color: "white",
              borderRadius: "0px",
              color: "black",
            }}
          >
            Categories
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
            style={{ backgroundColor: "#6e88b1" }}
          >
            <a className="dropdown-item" href="/category/Relaxation">
              Relaxation
            </a>
            <a className="dropdown-item" href="/category/Stress Relief">
              Stress Relief
            </a>
            <a className="dropdown-item" href="/category/Walking Meditation">
              Walking Meditation
            </a>
            <a className="dropdown-item" href="/category/Sleep">
              Sleep
            </a>
            <a className="dropdown-item" href="/category/Beginners">
              Beginners
            </a>
            <a className="dropdown-item" href="/category/Happiness">
              Happiness
            </a>
          </div>
        </div>

        <div className="dropdown" style={{ backgroundColor: "#6e88b1" }}>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{
              backgroundColor: "#3ad3a0",
              color: "white",
              borderRadius: "0px",
              color: "black",
            }}
          >
            Profile
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
            style={{ backgroundColor: "#6e88b1" }}
          >
            <a className="dropdown-item" href="/profile/details">
              Account Details
            </a>
            <a className="dropdown-item" href="/profile/password">
              Change Password
            </a>
            <a className="dropdown-item" href="/profile/stat">
              My Stats
            </a>
            <a className="dropdown-item" onClick={logout}>
              Log out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
