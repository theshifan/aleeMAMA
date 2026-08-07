import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "../assets/component/MenuBar";

// This would come from your global cart state / context
// For now using local state as demo
const DELIVERY_CHARGE = 75;

export default function Cart({ onNavigate }) {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "ABC Juice Powder",
      weight: "250 g",
      price: 480,
      qty: 1,
      image: null, // replace with: import AbcImg from '../assets/...'
      color: "#fb939d",
    },
  ]);

  const updateQty = (id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = cartTotal + DELIVERY_CHARGE;

  // Use first item's color for left panel
  const panelColor = cartItems[0]?.color || "#fb939d";

  return (
    <div style={{
      position: "fixed", inset: 0,
      fontFamily: "'Nunito', 'Comic Sans MS', cursive",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}>
      <MenuBar onNavigate={onNavigate} />

      {/* ── MAIN SPLIT LAYOUT ── */}
      <div style={{
        position: "absolute",
        top: 64, left: 0, right: 0, bottom: 0,
        display: "flex",
        flexDirection: "row",
      }}>

        {/* ── LEFT PANEL (product info + footer) ── */}
        <div style={{
          width: "38%",
          background: cartItems[0]?.color || "#fb939d",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Product info */}
          <div style={{
            flex: 1,
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            {cartItems.length > 0 ? (
              <>
                <h1 style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 900,
                  color: "#5a2a1a",
                  margin: "0 0 16px 0",
                  lineHeight: 1.1,
                  fontFamily: "'Nunito', 'Comic Sans MS', cursive",
                  textTransform: "uppercase",
                }}>
                  {cartItems[0].name}
                </h1>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#5a2a1a", margin: "4px 0" }}>
                  Weight : {cartItems[0].weight}
                </p>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#5a2a1a", margin: "4px 0" }}>
                  Price : {cartItems[0].price} /–
                </p>
              </>
            ) : (
              <p style={{ color: "#5a2a1a", fontWeight: 700, fontSize: "1.1rem" }}>
                Your cart is empty
              </p>
            )}
          </div>

          {/* Scalloped edge */}
          <svg viewBox="0 0 400 50" xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", display: "block", flexShrink: 0 }}
            preserveAspectRatio="none">
            <path
              d="M0,50 Q25,10 50,50 Q75,10 100,50 Q125,10 150,50 Q175,10 200,50 Q225,10 250,50 Q275,10 300,50 Q325,10 350,50 Q375,10 400,50 Z"
              fill="#c97a8a"
            />
          </svg>

          {/* Footer strip */}
          <div style={{
            background: "#c97a8a",
            padding: "20px 28px",
            flexShrink: 0,
          }}>
            <p style={{
              color: "#fff",
              fontWeight: 900,
              fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
              margin: 0,
              lineHeight: 1.3,
              fontFamily: "'Nunito', 'Comic Sans MS', cursive",
            }}>
              With love from<br />aleeMAMA
            </p>
          </div>
        </div>

        {/* ── RIGHT PANEL (cart) ── */}
        <div style={{
          flex: 1,
          background: "#fdf9e3",
          display: "flex",
          flexDirection: "column",
          borderRadius: "24px 0 0 0",
          overflow: "hidden",
        }}>
          {/* Cart title */}
          <div style={{ padding: "28px 32px 0" }}>
            <h2 style={{
              fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
              fontWeight: 900,
              color: "#5a2a1a",
              margin: "0 0 16px 0",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontFamily: "'Nunito', 'Comic Sans MS', cursive",
            }}>
              Cart
            </h2>
            <div style={{ height: 2, background: "#5a2a1a", marginBottom: 20 }} />
          </div>

          {/* ── ITEMS LIST ── */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "0 32px",
            scrollbarWidth: "none",
          }}>
            {/* Column headers */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.2fr 1fr 1fr",
              gap: 8,
              marginBottom: 16,
            }}>
              {["", "QTY", "PRICE", "TOTAL"].map((h, i) => (
                <div key={i} style={{
                  fontWeight: 900,
                  fontSize: "0.8rem",
                  color: "#5a2a1a",
                  textAlign: i > 0 ? "center" : "left",
                  letterSpacing: "0.05em",
                }}>
                  {h}
                </div>
              ))}
            </div>

            {/* Cart items */}
            {cartItems.map(item => (
              <div key={item.id} style={{
                display: "grid",
                gridTemplateColumns: "2fr 1.2fr 1fr 1fr",
                gap: 8,
                alignItems: "center",
                marginBottom: 24,
              }}>
                {/* Product image + name */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                  <div style={{
                    width: 80, height: 80,
                    background: item.color || "#f0e0d0",
                    borderRadius: 12,
                    overflow: "hidden",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {item.image ? (
                      <img src={item.image} alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    ) : (
                      <span style={{ fontSize: 32 }}>🛍️</span>
                    )}
                  </div>
                  <span style={{
                    fontSize: "0.78rem", fontWeight: 700,
                    color: "#5a2a1a", textAlign: "left",
                  }}>
                    {item.name}<br />{item.weight}
                  </span>
                  {/* Remove button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      background: "none", border: "none",
                      color: "#c0392b", fontSize: "0.7rem",
                      cursor: "pointer", fontWeight: 700,
                      padding: 0, fontFamily: "'Nunito', cursive",
                    }}
                  >
                    Remove
                  </button>
                </div>

                {/* QTY controls */}
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 8,
                }}>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    style={qtyBtnStyle("#f5d533")}
                  >+</button>
                  <span style={{
                    width: 32, textAlign: "center",
                    fontWeight: 900, fontSize: "1rem", color: "#5a2a1a",
                    background: "#fff",
                    borderRadius: 8, padding: "4px 0",
                    border: "1.5px solid #e0e0e0",
                  }}>
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    style={qtyBtnStyle("#f5d533")}
                  >–</button>
                </div>

                {/* Price */}
                <div style={{ textAlign: "center", fontWeight: 700, color: "#5a2a1a", fontSize: "0.95rem" }}>
                  Rs {item.price}/–
                </div>

                {/* Total */}
                <div style={{ textAlign: "right", fontWeight: 800, color: "#5a2a1a", fontSize: "0.95rem" }}>
                  Rs{item.price * item.qty}/–
                </div>
              </div>
            ))}

            {cartItems.length === 0 && (
              <div style={{
                textAlign: "center", padding: "40px 0",
                color: "#a07040", fontSize: "1rem", fontWeight: 700,
              }}>
                No items in cart 🛒
              </div>
            )}
          </div>

          {/* ── TOTALS + CHECKOUT ── */}
          <div style={{ padding: "16px 32px 28px", borderTop: "2px solid #5a2a1a" }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              marginBottom: 4,
            }}>
              <span style={totalLabelStyle}>CART TOTAL</span>
              <span style={totalValueStyle}>Rs {cartTotal}/–</span>
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between",
              marginBottom: 4,
            }}>
              <span style={totalLabelStyle}>DELIVERY CHARGE</span>
              <span style={totalValueStyle}>Rs {DELIVERY_CHARGE}/–</span>
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between",
              marginBottom: 16,
            }}>
              <span style={totalLabelStyle}>TOTAL</span>
              <span style={{ ...totalValueStyle, fontSize: "1rem", fontWeight: 900 }}>
                Rs {total}/–
              </span>
            </div>

            {/* Checkout button */}
            <button
              onClick={() => navigate("/checkout")}
              style={{
                float: "right",
                background: "#5a2a1a",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 28px",
                fontWeight: 900,
                fontSize: "0.95rem",
                cursor: "pointer",
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

      </div>
    </div>
  );
}

const qtyBtnStyle = (bg) => ({
  width: 28, height: 28,
  borderRadius: "50%",
  background: bg,
  border: "none",
  cursor: "pointer",
  fontWeight: 900,
  fontSize: "1rem",
  color: "#5a2a1a",
  display: "flex", alignItems: "center", justifyContent: "center",
  transition: "transform 0.15s",
});

const totalLabelStyle = {
  fontWeight: 800,
  fontSize: "0.85rem",
  color: "#5a2a1a",
  letterSpacing: "0.04em",
};

const totalValueStyle = {
  fontWeight: 700,
  fontSize: "0.85rem",
  color: "#5a2a1a",
};