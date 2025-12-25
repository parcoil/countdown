import { Routes, Route, Link } from "react-router";
import Christmas from "./pages/christmas";
import routes from "./lib/routes";
import Home from "./pages/home";
import Hytale from "./pages/hytale";
import NewYears from "./pages/new-years";
function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/christmas" element={<Christmas />} />
        <Route path="/hytale" element={<Hytale />} />
        <Route path="/new-years" element={<NewYears />} />
      </Routes>
      <div className="flex gap-4 font-mono fixed p-4 justify-center bottom-0 w-full z-20">
        {routes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className="text-gray-300 hover:underline"
          >
            {route.footerText}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
