/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import CurrentAffairs from "./pages/CurrentAffairs";
import GK from "./pages/GK";
import Quiz from "./pages/Quiz";
import Syllabus from "./pages/Syllabus";
import Flashcards from "./pages/Flashcards";
import QuickFacts from "./pages/QuickFacts";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="ca" element={<CurrentAffairs />} />
          <Route path="gk" element={<GK />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="reels" element={<QuickFacts />} />
          <Route path="syllabus" element={<Syllabus />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
