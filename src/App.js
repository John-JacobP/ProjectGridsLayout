import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import LayoutEditor from "./components/LayoutEditor";
import Home from "./components/Home";
import VMs from "./Pages/VMs";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<LayoutEditor />} />
          <Route path="/" element={<Home />} />
          <Route path="/VMs" element={<VMs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
