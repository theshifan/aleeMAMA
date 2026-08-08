// src/component/ChatbotButton.jsx
import aleemamaImg from "../aleemama_face.png";

export default function ChatbotButton() {
  return (
    <div style={{
      position: "absolute", 
      bottom: 24, right: 24,
        zIndex: 30, // Keeps it floating on top of the footer and content
      display: "flex", 
      flexDirection: "row-reversed", 
      alignItems: "center", 
      gap: 8,
    }}>
      {/* Speech Bubble Tooltip */}
      <div style={{
        background: "#fff", 
        border: "2px solid #5a2a1a",
        borderRadius: 8, 
        padding: "6px 14px",
        fontSize: "0.85rem", 
        fontWeight: 700, 
        color: "#5a2a1a",
        whiteSpace: "nowrap",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
      }}>
        Talk with aleeMAMA
      </div>

      {/* Circular Avatar Button */}
      <button
        // onClick={() => alert("Chatbot coming soon!")} chnage this comment to see the alert 
        style={{
          width: 72, 
          height: 72, 
          borderRadius: "50%",
          background: "#f5d533", 
          border: "3px solid #5a2a1a",
          cursor: "pointer", 
          overflow: "hidden",
          padding: 0, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        <img src={aleemamaImg} alt="aleeMAMA" style={{ width: "100%", height: "70%" }} />
      </button>
    </div>
  );
}