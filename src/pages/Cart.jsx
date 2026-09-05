import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; 

export default function Cart() {
  const navigate = useNavigate();
  const { cartOpen, closeCart, cartItems, updateQty, removeItem } = useCart();

  // Helper to extract numbers from price strings like "250/-"
  const getNumericPrice = (price) => {
    if (typeof price === "number") return price;
    return parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;
  };

  // Helper to parse weights
  const getWeightInGrams = (weight) => {
    return parseFloat(weight) || 0;
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + getNumericPrice(item.price) * (item.qty || 1),
    0
  );

  const totalWeight = cartItems.reduce(
    (sum, item) => sum + getWeightInGrams(item.weight) * (item.qty || 1),
    0
  );

  const getDeliveryCharge = (weight, itemsCount) => {
    if (itemsCount === 0) return 0;
    if (weight <= 500) return 56;
    if (weight <= 1000) return 75;
    if (weight <= 1500) return 95;
    if (weight <= 2000) return 112;
    if (weight <= 2500) return 134;
    return 149;
  };

  

  const deliveryCharge = getDeliveryCharge(totalWeight, cartItems.length);
  const total = cartTotal + deliveryCharge;
// whats app check out 

const WHATSAPP_PHONE_NUMBER = "919961561514"; 

const handleWhatsAppCheckout = () => {
  if (cartItems.length === 0) return;

  // each item in a clean bullet point
  const itemsText = cartItems
    .map(
      (item, index) =>
        `${index + 1}. *${item.name}* (${item.weight})\n   Qty: ${item.qty} × Rs ${getNumericPrice(item.price)} = Rs ${getNumericPrice(item.price) * item.qty}/-`
    )
    .join("\n\n");

  //the complete message
  const message = ` Hello aleeMAMA! I'd like to place an order:
${itemsText}
-----------------------------
*Items Subtotal:* Rs ${cartTotal}/-
*Total Weight:* ${totalWeight} g
*Delivery Charge:* Rs ${deliveryCharge}/-
*Total Amount Payable:* Rs ${total}/-

Please let me know how to proceed with payment and delivery details. Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;

  //  open WhatsApp in the app
  window.open(whatsappUrl, "_blank");
};
  return (
    <>
      {/* ── SLIDE-IN CART PANEL (right) ── */}
      <div style={{
        position: "fixed", top: 0, right: 0,
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
            fontFamily: "'Nunito', cursive",
            letterSpacing: "0.05em",
          }}>Cart</h2>
          <button onClick={closeCart} style={{
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
                Rs {getNumericPrice(item.price)}/–
              </div>

              {/* Total */}
              <div style={{ textAlign: "right", fontWeight: 800, color: "#5a2a1a", fontSize: "0.85rem" }}>
                Rs {getNumericPrice(item.price) * item.qty}/–
              </div>
            </div>
          ))}
        </div>

        {/* Totals + Checkout */}
        <div style={{ padding: "16px 24px 24px", borderTop: "2px solid #5a2a1a" }}>
          {[
            ["CART TOTAL", `Rs ${cartTotal}/–`],
            ["DELIVERY CHARGE", `Rs ${deliveryCharge}/–`],
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
            onClick={handleWhatsAppCheckout}
            disabled={cartItems.length === 0}
            style={{
              float: "right", marginTop: 12,
              background: cartItems.length === 0 ? "#8c7268" : "#5a2a1a",
              color: "#fff",
              border: "none", borderRadius: 8,
              padding: "10px 24px", fontWeight: 900,
              fontSize: "0.9rem",
              cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
              fontFamily: "'Nunito', cursive",
              letterSpacing: "0.05em",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => {
              if (cartItems.length > 0) e.currentTarget.style.background = "#7a3a2a";
            }}
            onMouseLeave={e => {
              if (cartItems.length > 0) e.currentTarget.style.background = "#5a2a1a";
            }}
          >
            CHECKOUT
          </button>
        </div>
      </div>

      {/* Cart Overlay */}
      {cartOpen && (
        <div
          onClick={closeCart}
          style={{
            position: "fixed", inset: 0, zIndex: 15,
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