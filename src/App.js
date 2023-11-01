import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AuthLayout from "../src/components/Layouts/AuthLayout";

import Home from '../src/pages';
import File from '../src/pages/file';

function App() {
  return (
    <Router>
      <AuthLayout>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/file" element={<File />}></Route>
        </Routes>
      </AuthLayout>
    </Router>
  );
}

export default App;
