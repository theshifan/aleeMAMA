import React from 'react';

const InstagramCardPlaceholder = ({ myPictureUrl, username, caption, likes }) => {
  return (
    <div style={{
      maxWidth: 470,
      width: "100%",
      background: "#ffdf86",
      border: "1px solid #dbdbdb",
      borderRadius: 12,
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      fontFamily: "'Nunito', sans-serif",
      margin: "0 auto",
      overflow: "hidden",
    }}>

      {/* ── HEADER ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Profile pic */}
          <div style={{
            width: 36, height: 36,
            minWidth: 36,
            borderRadius: "50%",
            background: "#f2e796",
            border: "2px solid #ffffff",
          }} />
          {/* Username */}
          {username ? (
            <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#262626" }}>
              {username}
            </span>
          ) : (
            <div style={{
              width: 100, height: 10,
              background: "#ede9a9",
              borderRadius: 4,
            }} />
          )}
        </div>
        {/* Options dots */}
        <div style={{
          color: "#fffccd",
          fontWeight: 700,
          letterSpacing: 2,
          cursor: "pointer",
          fontSize: "1rem",
        }}>•••</div>
      </div>

      {/* ── MAIN IMAGE ── */}
      <div style={{
        width: "100%",
        aspectRatio: "1 / 1",
        background: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}>
        {myPictureUrl ? (
          <img
            src={myPictureUrl}
            alt="User content"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 8,
            color: "#b0b0b0", fontSize: "0.85rem",
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke="#c0c0c0" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            Your Picture Here
          </div>
        )}
      </div>

      {/* ── ACTION BUTTONS ── */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 16px 6px",
      }}>
        <div style={{ display: "flex", gap: 16 }}>
          {/* Heart */}
          <button style={iconBtnStyle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="#fbfbf4" strokeWidth="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
          {/* Comment */}
          <button style={iconBtnStyle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="#fbfbf4" strokeWidth="2">
              <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/>
            </svg>
          </button>
          {/* Send / DM */}
          <button
            style={iconBtnStyle}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15) rotate(-20deg)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1) rotate(0deg)"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="#fbfbf4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {/* Paper plane body */}
              <path d="M21 3L3 10.5l7.5 3L21 3z" />
              <path d="M10.5 13.5L14 21l7-18" />
              <path d="M10.5 13.5l3.5 3.5" />
            </svg>
          </button>
        </div>
        {/* Save */}
        <button style={iconBtnStyle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="#fbfbf4" strokeWidth="2">
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
          </svg>
        </button>
      </div>

      {/* ── LIKES ── */}
      <div style={{ padding: "0 16px 4px", fontWeight: 700, fontSize: "0.85rem", color: "#262626" }}>
        {likes ? `${likes} likes` : (
          <div style={{ width: 70, height: 10, background: "#ede9a9", borderRadius: 4 }} />
        )}
      </div>

      {/* ── CAPTION ── */}
      <div style={{ padding: "4px 16px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
        {caption ? (
          <p style={{ fontSize: "0.85rem", color: "#262626", margin: 0, lineHeight: 1.5 }}>
            <span style={{ fontWeight: 700 }}>{username} </span>
            {caption}
          </p>
        ) : (
          <>
            <div style={{ width: 70, height: 10, background: "#ede9a9", borderRadius: 4 }} />
            <div style={{ width: "85%", height: 8, background: "#ede9a9", borderRadius: 4 }} />
            <div style={{ width: "50%", height: 8, background: "#ede9a9", borderRadius: 4 }} />
          </>
        )}
      </div>

    </div>
  );
};

// Shared icon button style
const iconBtnStyle = {
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 0.2s ease",
};

export default InstagramCardPlaceholder;