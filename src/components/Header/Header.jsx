import { useEffect, useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("megablog-theme") === "dark";
  });
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark-theme", darkMode);
    localStorage.setItem("megablog-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All posts", slug: "/all-posts", active: authStatus },
    { name: "Add posts", slug: "/add-posts", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-[0_4px_20px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <Container>
        <nav className="flex min-h-20 flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-0">
          <div className="shrink-0">
            <Link
              to="/"
              className="inline-flex items-center rounded-xl p-1 transition hover:scale-[1.02]"
            >
              <Logo width="112px" />
            </Link>
          </div>

          <ul className="flex flex-wrap items-center gap-1 rounded-2xl bg-slate-100/80 p-1 sm:ml-auto sm:gap-1">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-flex cursor-pointer items-center rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition duration-200 hover:bg-white hover:text-blue-700 hover:shadow-sm sm:px-4"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}

            <li>
              <button
                type="button"
                onClick={() => setDarkMode((current) => !current)}
                aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
                title={darkMode ? "Light theme" : "Dark theme"}
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-lg shadow-sm transition duration-200 hover:-translate-y-px hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
