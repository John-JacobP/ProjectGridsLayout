import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import VMs from "./Pages/VMs";

import Dashboard from "./components/Dashboard";
import LayoutEditor from "./components/LayoutEditor";
import Home from "./components/Home";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/editor" element={<LayoutEditor/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/VMs" element={<VMs/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
