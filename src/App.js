import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AuthLayout from "../src/components/Layouts/AuthLayout";

import Home from '../src/pages';
import Chat from '../src/pages/chat';

function App() {
  return (
    <Router>
      <AuthLayout>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/chat" element={<Chat />}></Route>
        </Routes>
      </AuthLayout>
    </Router>
  );
}

export default App;
