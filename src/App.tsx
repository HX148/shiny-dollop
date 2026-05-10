import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import NewsDetail from "@/pages/NewsDetail";
import Search from "@/pages/Search";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}
