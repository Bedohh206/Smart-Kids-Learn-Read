import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LearnPage from "./pages/LearnPage";
import Alphabet from "./components/Alphabet";
import Phonics from "./components/Phonics";
import Numbers from "./components/Numbers";
import Math from "./components/Math";
import Spelling from "./components/Spelling";
import ShapesColors from "./components/ShapesColors";
import MatchingGame from "./components/MatchingGame";
import Quiz from "./components/Quiz";

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/alphabet" element={<Alphabet />} />
        <Route path="/phonics" element={<Phonics />} />
        <Route path="/numbers" element={<Numbers />} />
        <Route path="/math" element={<Math />} />
        <Route path="/spelling" element={<Spelling />} />
        <Route path="/shapes-colors" element={<ShapesColors />} />
        <Route path="/matching" element={<MatchingGame />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/learn" element={<LearnPage />} />
      </Routes>
    </BrowserRouter>
  );
}
