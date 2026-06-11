import { useState } from "react";
import { NAV_SECTIONS } from "../config/nav";

function NavIcon({ id }) {
  const icons = {
    home: (
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
    ),
    account: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 19.5c0-3.5 3.1-6 7-6s7 2.5 7 6" />
      </>
    ),
    orders: (
      <path d="M7 4h10l1 3H6l1-3Zm-1 5h12l-1 10H7L6 9Zm3 2v6m6-6v6" />
    ),
    men: (
      <path d="M14 4h6v6M20 4l-8 8M10 14l-2 6 6-2" />
    ),
    women: (
      <path d="M12 4v4m0 0a3 3 0 1 0 0 6m0-6a3 3 0 1 1 0 6m0 0v2m-4 4h8" />
    ),
    kids: (
      <>
        <circle cx="9" cy="9" r="2.2" />
        <circle cx="15" cy="9" r="2.2" />
        <path d="M6 18c.8-2.8 3-4 6-4s5.2 1.2 6 4" />
      </>
    ),
    new: (
      <path d="M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.8 2.8m7.2 7.2 2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.2l-2.8 2.8" />
    ),
    sale: (
      <path d="M8.5 8.5 15 15M9 5l-1 2H5l3 5-2 7 7-4 7 4-2-7 3-5h-3l-1-2" />
    ),
  };

  return (
    <svg
      className="side-nav__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[id]}
    </svg>
  );
}

export default function SideNav() {
  const [expanded, setExpanded] = useState(false);

  return (
    <nav
      className={`side-nav${expanded ? " side-nav--expanded" : ""}`}
      aria-label="Navigation principale"
    >
      <div className="side-nav__header">
        <button
          type="button"
          className="side-nav__mark"
          aria-label={expanded ? "Replier le menu" : "Deplier le menu"}
          aria-expanded={expanded}
          onClick={() => setExpanded((open) => !open)}
        >
          F
        </button>
        <span className="side-nav__brand">Finlive</span>
      </div>

      <div className="side-nav__sections">
        {NAV_SECTIONS.map((section, index) => (
          <div key={index} className="side-nav__section">
            {index > 0 && <div className="side-nav__divider" aria-hidden="true" />}
            <ul className="side-nav__list">
              {section.items.map((item) => (
                <li key={item.id}>
                  <a
                    href="#"
                    className={`side-nav__link${item.active ? " side-nav__link--active" : ""}`}
                    onClick={(event) => event.preventDefault()}
                  >
                    <NavIcon id={item.id} />
                    <span className="side-nav__label">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
