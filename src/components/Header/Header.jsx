import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All posts", slug: "/all-posts", active: authStatus },
    { name: "Add posts", slug: "/add-posts", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 py-3 shadow-sm backdrop-blur">
      <Container>
        <nav className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="shrink-0">
            <Link to="/" className="inline-flex items-center rounded-lg px-1 py-1 transition hover:bg-slate-100">
              <Logo width="70px" />
            </Link>
          </div>

          <ul className="flex flex-wrap items-center justify-end gap-1.5 sm:ml-auto sm:gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition duration-200 hover:bg-slate-100 hover:text-slate-900 sm:px-4"
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
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
