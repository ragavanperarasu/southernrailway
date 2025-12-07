import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from './components/Home';
import Trainshow from './components/Trainshow';
import Trainstatus from './components/Trainstatus';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Trainshow />} />
        {/* <Route path="/trainshow" element={<Trainshow />} /> */}
        <Route path="/trainstatus" element={<Trainstatus />} />
      </Routes>
    </Router>
  )
} 

export default App