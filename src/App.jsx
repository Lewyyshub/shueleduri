import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "./Components/__organisms/container";
import Login from "./Components/__organisms/login";
import HomePage from "./Components/__molecules/home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Container />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<Container />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
