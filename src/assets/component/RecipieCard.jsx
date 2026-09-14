import { useRef, useState } from "react";

export default function MediaCard({ mediaUrl, mediaType = "image", caption }) {
  const [liked, setLiked] = useState(false);
  const videoRef = useRef(null);

  const handleMediaClick = () => {
    if (mediaType === "video" && videoRef.current) {
      videoRef.current.paused
        ? videoRef.current.play()
        : videoRef.current.pause();
    }
  };

  return (
    <div style={{
      width: 250,
      height: 400,
      borderRadius: 20,
      overflow: "hidden",
      flexShrink: 0,
      position: "relative",   /* everything is layered on top of the image */
      cursor: "pointer",
      boxShadow: "0 4px 16px rgba(235, 235, 24, 0.15)",
    }}>

      {/* ── FULL BLEED MEDIA — fills entire card ── */}
      <div
        onClick={handleMediaClick}
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        {mediaUrl ? (
          mediaType === "video" ? (
            <video
  ref={videoRef}
  src={mediaUrl}
  loop
  playsInline
  autoPlay
  muted
  // controls
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover"
  }}
/>
          ) : (
            <img
              src={mediaUrl}
              alt={caption || "media"}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )
        ) : (
          /* Placeholder */
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(180deg, #b8d4e8 55%, #7ab535 55%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "60%" }}>
              <ellipse cx="90" cy="70" rx="45" ry="32" fill="rgba(255, 255, 255, 0.9)"/>
              <ellipse cx="62" cy="80" rx="28" ry="22" fill="rgba(255,255,255,0.9)"/>
              <ellipse cx="118" cy="82" rx="34" ry="25" fill="rgba(255,255,255,0.9)"/>
            </svg>
          </div>
        )}
      </div>

      {/* ── TOP: blue dot overlay ── */}
      <div style={{
        position: "absolute",
        top: 10, left: 10,
        zIndex: 2,
        width: 10, height: 10,
        borderRadius: "50%",
        background: "#f6e200",
      }} />

      {/* ── BOTTOM: gradient overlay + actions ── */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        zIndex: 2,
        background: "linear-gradient(transparent, rgba(235, 208, 0, 0.45))",
        padding: "24px 10px 10px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}>
        {/* Pill bar */}
        <div style={{
          flex: 1,
          height: 22,
          background: "rgba(252, 248, 0, 0.25)",
          borderRadius: 11,
          backdropFilter: "blur(4px)",
        }} />

        {/* Heart */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(l => !l); }}
          style={{
            background: "none", border: "none",
            padding: 0, cursor: "pointer",
            display: "flex", alignItems: "center",
            flexShrink: 0,
            transition: "transform 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.3)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24"
            fill={liked ? "#f6e200" : "none"}
            stroke={liked ? "#f6e200" : "rgba(247, 243, 243, 0.9)"}
            strokeWidth="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>

        {/* Send */}
        <button
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "none", border: "none",
            padding: 0, cursor: "pointer",
            display: "flex", alignItems: "center",
            flexShrink: 0,
            transition: "transform 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.3) rotate(-20deg)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1) rotate(0deg)"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.9)" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 3L3 10.5l7.5 3L21 3z"/>
            <path d="M10.5 13.5L14 21l7-18"/>
          </svg>
        </button>
      </div>

    </div>
  );
}