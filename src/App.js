import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Dashboard from "./components/Dashboard";
import LayoutEditor from "./components/LayoutEditor";
import Home from "./components/Home";
import VMs from "./Pages/VMs";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<LayoutEditor />} />
          {/* <Route path="/azure-vm" element={<VMs />} /> */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
