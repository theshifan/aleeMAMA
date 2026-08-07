import { useState } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Our Story",  section: "our-story" },
  { label: "Product",    section: "product" },
  { label: "Contact Us", section: "contact-us" },
  { label: "Recipes",    section: "recipes" },
  { label: "Review",     section: "review" },
];

const DELIVERY_CHARGE = 75;

// Demo cart items — replace with your global cart state later
const demoCart = [
  { id: 1, name: "ABC Juice Powder", weight: "250 g", price: 480, qty: 1, color: "#fb939d" },
];

export default function MenuBar({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(demoCart);
  const navigate = useNavigate();

  const handleNav = (section) => {
    setMenuOpen(false);
    if (onNavigate) onNavigate(section);
  };

  const updateQty = (id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id) => setCartItems(prev => prev.filter(item => item.id !== id));

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = cartTotal + DELIVERY_CHARGE;

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
        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", gap: 5, padding: 8 }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 28, height: 3,
              background: "#5a2a1a", borderRadius: 2, transition: "all 0.3s",
              transform: menuOpen
                ? i === 0 ? "rotate(45deg) translate(5px, 5px)"
                : i === 1 ? "scaleX(0)"
                : "rotate(-45deg) translate(5px, -5px)"
                : "none",
            }} />
          ))}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Cart icon — opens slide-in panel */}
          <button
            onClick={() => setCartOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, position: "relative" }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
              stroke="#5a2a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {/* Item count badge */}
            {cartItems.length > 0 && (
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: 16, height: 16, borderRadius: "50%",
                background: "#5a2a1a", color: "#fff",
                fontSize: "0.6rem", fontWeight: 900,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {cartItems.length}
              </div>
            )}
          </button>
          {/* Profile */}
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
              stroke="#5a2a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── SLIDE-IN NAV MENU (left) ── */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: "min(320px, 80vw)", height: "100%",
        background: "#ffffff", zIndex: 20,
        transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.4s cubic-bezier(0.77,0,0.18,1)",
        boxShadow: menuOpen ? "4px 0 30px rgba(0,0,0,0.08)" : "none",
        display: "flex", flexDirection: "column", paddingTop: 80,
      }}>
        <button onClick={() => setMenuOpen(false)} style={{
          position: "absolute", top: 16, left: 20,
          background: "none", border: "none", cursor: "pointer",
          display: "flex", flexDirection: "column", gap: 5, padding: 8,
        }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 28, height: 3,
              background: "#5a2a1a", borderRadius: 2, transition: "all 0.3s",
              transform: i === 0 ? "rotate(45deg) translate(5px, 5px)"
                : i === 1 ? "scaleX(0)"
                : "rotate(-45deg) translate(5px, -5px)",
            }} />
          ))}
        </button>

        {navItems.map((item, i) => (
          <div key={i}>
            <button onClick={() => handleNav(item.section)} style={{
              width: "100%", background: "none", border: "none",
              cursor: "pointer", padding: "18px 28px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
              fontWeight: 800, color: "#5a2a1a",
              fontFamily: "'Nunito', 'Comic Sans MS', cursive", textAlign: "left",
            }}>
              {item.label}
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

      {/* ── SLIDE-IN CART PANEL (right) ── */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "min(400px, 92vw)", height: "100%",
        background: "#fdf9e3",
        zIndex: 20,
        transform: cartOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s cubic-bezier(0.77,0,0.18,1)",
        boxShadow: cartOpen ? "-4px 0 30px rgba(0,0,0,0.12)" : "none",
        display: "flex", flexDirection: "column",
        borderRadius: "16px 0 0 16px",
      }}>
        {/* Cart header */}
        <div style={{
          padding: "20px 24px 0",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <h2 style={{
            fontSize: "1.8rem", fontWeight: 900, color: "#5a2a1a",
            margin: 0, textTransform: "uppercase",
            fontFamily: "'Nunito', 'Comic Sans MS', cursive",
            letterSpacing: "0.05em",
          }}>Cart</h2>
          {/* Close button */}
          <button onClick={() => setCartOpen(false)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: "1.4rem", color: "#5a2a1a", fontWeight: 900, padding: 4,
          }}>✕</button>
        </div>

        <div style={{ height: 2, background: "#5a2a1a", margin: "12px 24px 0" }} />

        {/* Column headers */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1.2fr 1fr 1fr",
          gap: 8, padding: "12px 24px 0",
        }}>
          {["", "QTY", "PRICE", "TOTAL"].map((h, i) => (
            <div key={i} style={{
              fontWeight: 900, fontSize: "0.75rem", color: "#5a2a1a",
              textAlign: i > 0 ? "center" : "left", letterSpacing: "0.05em",
            }}>{h}</div>
          ))}
        </div>

        {/* Items */}
        <div style={{
          flex: 1, overflowY: "auto",
          padding: "12px 24px",
          scrollbarWidth: "none",
        }}>
          {cartItems.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "40px 0",
              color: "#a07040", fontSize: "1rem", fontWeight: 700,
            }}>No items in cart 🛒</div>
          ) : cartItems.map(item => (
            <div key={item.id} style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.2fr 1fr 1fr",
              gap: 8, alignItems: "center", marginBottom: 20,
            }}>
              {/* Image + name */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{
                  width: 64, height: 64,
                  background: item.color || "#f0e0d0",
                  borderRadius: 10, overflow: "hidden",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {item.image
                    ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    : <span style={{ fontSize: 28 }}>🛍️</span>
                  }
                </div>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#5a2a1a" }}>
                  {item.name}<br />{item.weight}
                </span>
                <button onClick={() => removeItem(item.id)} style={{
                  background: "none", border: "none", color: "#c0392b",
                  fontSize: "0.65rem", cursor: "pointer", fontWeight: 700,
                  padding: 0, fontFamily: "'Nunito', cursive", textAlign: "left",
                }}>Remove</button>
              </div>

              {/* QTY */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                <button onClick={() => updateQty(item.id, 1)} style={qtyBtn}>+</button>
                <span style={{
                  width: 28, textAlign: "center", fontWeight: 900,
                  fontSize: "0.9rem", color: "#5a2a1a",
                  background: "#fff", borderRadius: 6, padding: "3px 0",
                  border: "1.5px solid #e0e0e0",
                }}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, -1)} style={qtyBtn}>–</button>
              </div>

              {/* Price */}
              <div style={{ textAlign: "center", fontWeight: 700, color: "#5a2a1a", fontSize: "0.85rem" }}>
                Rs {item.price}/–
              </div>

              {/* Total */}
              <div style={{ textAlign: "right", fontWeight: 800, color: "#5a2a1a", fontSize: "0.85rem" }}>
                Rs {item.price * item.qty}/–
              </div>
            </div>
          ))}
        </div>

        {/* Totals + Checkout */}
        <div style={{ padding: "16px 24px 24px", borderTop: "2px solid #5a2a1a" }}>
          {[
            ["CART TOTAL", `Rs ${cartTotal}/–`],
            ["DELIVERY CHARGE", `Rs ${DELIVERY_CHARGE}/–`],
            ["TOTAL", `Rs ${total}/–`],
          ].map(([label, value], i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", marginBottom: 4,
            }}>
              <span style={{ fontWeight: 800, fontSize: "0.82rem", color: "#5a2a1a", letterSpacing: "0.04em" }}>{label}</span>
              <span style={{ fontWeight: i === 2 ? 900 : 700, fontSize: i === 2 ? "0.95rem" : "0.82rem", color: "#5a2a1a" }}>{value}</span>
            </div>
          ))}

          <button
            onClick={() => { setCartOpen(false); navigate("/checkout"); }}
            style={{
              float: "right", marginTop: 12,
              background: "#5a2a1a", color: "#fff",
              border: "none", borderRadius: 8,
              padding: "10px 24px", fontWeight: 900,
              fontSize: "0.9rem", cursor: "pointer",
              fontFamily: "'Nunito', cursive",
              letterSpacing: "0.05em",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#7a3a2a"}
            onMouseLeave={e => e.currentTarget.style.background = "#5a2a1a"}
          >
            CHECKOUT
          </button>
        </div>
      </div>

      {/* Overlay — closes whichever panel is open */}
      {(menuOpen || cartOpen) && (
        <div
          onClick={() => { setMenuOpen(false); setCartOpen(false); }}
          style={{
            position: "absolute", inset: 0, zIndex: 15,
            background: "rgba(0,0,0,0.15)",
          }}
        />
      )}
    </>
  );
}

const qtyBtn = {
  width: 24, height: 24, borderRadius: "50%",
  background: "#f5d533", border: "none",
  cursor: "pointer", fontWeight: 900,
  fontSize: "0.9rem", color: "#5a2a1a",
  display: "flex", alignItems: "center", justifyContent: "center",
};