import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/core/Home";
import Tutorial from "./components/Tutorial";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Temp from "./components/user/Temp";
import All from "./components/meditation/All";
import Category from "./components/meditation/Category";
import Single from "./components/meditation/Single";
import Favorites from "./components/meditation/Favorites";
import AccountDetails from "./components/user/AccountDetails";
import ChangePassword from "./components/user/ChangePassword";
import Stats from "./components/user/Stats";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/temp" element={<Temp />} />

          <Route path="/all" element={<All />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/songs/:name" element={<Single />} />
          <Route path="/favorites" element={<Favorites />} />

          <Route path="/profile/details" element={<AccountDetails />} />
          <Route path="/profile/password" element={<ChangePassword />} />
          <Route path="/profile/stat" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
