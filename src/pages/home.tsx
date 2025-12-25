import { useHead } from "@unhead/react";
import routes from "../lib/routes";
import { Link } from "react-router";

function Home() {
  useHead({
    title: "Countdown Hub - Choose Your Event",
    meta: [
      {
        name: "description",
        content:
          "Countdown to various events like Christmas, Hytale release, and New Years. Choose an event to see the live countdown.",
      },
    ],
  });
  const countdownRoutes = routes.filter((route) => route.path !== "/");

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-950 via-teal-900 to-cyan-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Countdown Hub
          </h1>
          <p className="text-xl text-cyan-300">
            Choose an event to see the countdown
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {countdownRoutes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-teal-500/10 group-hover:via-cyan-500/10 group-hover:to-blue-500/10 rounded-2xl transition-all duration-300" />

              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                  {route.name}
                </h2>
                <p className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  {route.footerText}
                </p>

                <div className="mt-6 flex items-center text-cyan-400 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">View Countdown</span>
                  <svg
                    className="ml-2 w-5 h-5 transform group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
