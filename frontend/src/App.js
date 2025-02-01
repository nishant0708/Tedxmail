import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Mail from "./components/Tanishka files/Mail";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sending-mail" element={<Mail />} />
      </Routes>
    </Router>
  );
};

export default App;