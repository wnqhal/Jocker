import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Joke from "./pages/Joke";
import SamplePage from "./pages/SamplePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/sample" element={<SamplePage />} />
      <Route path="/joke" element={<Joke />} />
    </Routes>
  );
}

export default App;
