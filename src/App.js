import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GeneratePage from "./pages/GeneratePage";
import EditPage from "./pages/EditPage";
import SolutionPage from "./pages/SolutionPage";

import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter basename={"university-timetabling-demo"}>
      <Layout>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/generate" element={<GeneratePage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/solution" element={<SolutionPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
