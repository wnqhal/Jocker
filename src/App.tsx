import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Joke from "./pages/Joke";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/joke" element={<Joke />} />
    </Routes>
  );
}

export default App;
