import { useState } from "react";

const navItems = [
  { label: "Our Story",  section: "our-story" },
  { label: "Product",    section: "product" },
  { label: "Contact Us", section: "contact-us" },
  { label: "Recipes",    section: "recipes" },
  { label: "Review",     section: "review" },
];

export default function MenuBar({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (section) => {
    setMenuOpen(false);
    if (onNavigate) onNavigate(section);
  };

  return (
    <>
      {/* ── TOP BAR ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 64,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        zIndex: 10,
      }}>
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", gap: 5, padding: 8,
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 28, height: 3,
              background: "#5a2a1a", borderRadius: 2,
              transition: "all 0.3s",
              transform: menuOpen
                ? i === 0 ? "rotate(45deg) translate(5px, 5px)"
                : i === 1 ? "scaleX(0)"
                : "rotate(-45deg) translate(5px, -5px)"
                : "none",
            }} />
          ))}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            {/* <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
              stroke="#5a2a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg> */}
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            {/* <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
              stroke="#5a2a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg> */}
          </button>
        </div>
      </div>

      {/* ── SLIDE-IN NAV MENU ── */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: "min(320px, 80vw)", height: "100%",
        background: "#ffffff", zIndex: 20,
        transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.4s cubic-bezier(0.77,0,0.18,1)",
        boxShadow: menuOpen ? "4px 0 30px rgba(0,0,0,0.08)" : "none",
        display: "flex", flexDirection: "column", paddingTop: 80,
      }}>
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute", top: 16, left: 20,
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", gap: 5, padding: 8,
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 28, height: 3,
              background: "#5a2a1a", borderRadius: 2,
              transition: "all 0.3s",
              transform: i === 0 ? "rotate(45deg) translate(5px, 5px)"
                : i === 1 ? "scaleX(0)"
                : "rotate(-45deg) translate(5px, -5px)",
            }} />
          ))}
        </button>

        {navItems.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => handleNav(item.section)}
              style={{
                width: "100%", background: "none", border: "none",
                cursor: "pointer", padding: "18px 28px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                fontWeight: 800, color: "#5a2a1a",
                fontFamily: "'Nunito', 'Comic Sans MS', cursive",
                textAlign: "left",
              }}
            >
              {item.label}
              {/* <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#5a2a1a" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9" />
              </svg> */}
            </button>
            {i < navItems.length - 1 && (
              <div style={{ padding: "0 28px" }}>
                <svg width="100%" height="10">
                  <line x1="0" y1="5" x2="100%" y2="5"
                    stroke="#5a2a1a" strokeWidth="2"
                    strokeDasharray="8,6" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{
          position: "absolute", inset: 0, zIndex: 15,
          background: "rgba(0,0,0,0.15)",
        }} />
      )}
    </>
  );
}