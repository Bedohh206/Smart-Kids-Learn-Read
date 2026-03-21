import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LearnPage from "./pages/LearnPage";
import GuidesPage from "./pages/GuidesPage";
import GoLiveChecklistPage from "./pages/GoLiveChecklistPage";
import Alphabet from "./components/Alphabet";
import Phonics from "./components/Phonics";
import Numbers from "./components/Numbers";
import MathPractice from "./components/Math";
import Spelling from "./components/Spelling";
import ShapesColors from "./components/ShapesColors";
import MatchingGame from "./components/MatchingGame";
import Quiz from "./components/Quiz";
import Leaderboard from "./components/Leaderboard";
import Continents from "./components/Continents";
import BlockGame from "./components/BlockGame";
import ArtStudio from "./components/ArtStudio";
import MusicStudio from "./components/MusicStudio";
import AnimalWorld from "./components/AnimalWorld";
import StoryTime from "./components/StoryTime";
import ColorMixing from "./components/ColorMixing";
import PatternGames from "./components/PatternGames";
import SiteNav from "./components/SiteNav";
import GlobalVoiceCommand from "./components/GlobalVoiceCommand";
import VoiceCommandTip from "./components/VoiceCommandTip";
import InstallPrompt from "./components/InstallPrompt";
import Analytics from "./components/Analytics";
import SeoHead from "./components/SeoHead";
import About from "./components/About";
import Contact from "./components/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Terms from "./components/Terms";

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Analytics />
      <SeoHead />
      <SiteNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/alphabet" element={<Alphabet />} />
        <Route path="/phonics" element={<Phonics />} />
        <Route path="/numbers" element={<Numbers />} />
        <Route path="/math" element={<MathPractice />} />
        <Route path="/spelling" element={<Spelling />} />
        <Route path="/shapes-colors" element={<ShapesColors />} />
        <Route path="/matching" element={<MatchingGame />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/continents" element={<Continents />} />
        <Route path="/blocks" element={<BlockGame />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/go-live" element={<GoLiveChecklistPage />} />
        <Route path="/art" element={<ArtStudio />} />
        <Route path="/music" element={<MusicStudio />} />
        <Route path="/animals" element={<AnimalWorld />} />
        <Route path="/stories" element={<StoryTime />} />
        <Route path="/color-mixing" element={<ColorMixing />} />
        <Route path="/patterns" element={<PatternGames />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <VoiceCommandTip />
      <GlobalVoiceCommand />
      <InstallPrompt />
    </BrowserRouter>
  );
}
