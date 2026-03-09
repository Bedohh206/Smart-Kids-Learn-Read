import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/learn", label: "Learn" },
  { to: "/guides", label: "Guides" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];

export default function SiteNav() {
  return (
    <header className="site-nav-header">
      <div className="site-nav-inner">
        <NavLink to="/" className="site-nav-brand" aria-label="Smart Kids Learn and Read Home">
          Smart Kids Learn &amp; Read
        </NavLink>
        <nav aria-label="Primary">
          <ul className="site-nav-list">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive ? "site-nav-link site-nav-link-active" : "site-nav-link"
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}