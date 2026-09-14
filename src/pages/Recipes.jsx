import { useRef, useState } from "react";
import MediaCard from "../assets/component/RecipieCard";
import abc from "../assets/component/Recipe_video/abc_123.mp4"
import pumkista from "../assets/component/Recipe_video/pumkista.mp4"
import millets from "../assets/component/Recipe_video/millet adn beet.mp4"
import haleema from "../assets/component/Recipe_video/haleema.mp4"
import product from "../assets/component/Recipe_video/product list.mp4"
import gift from "../assets/component/Recipe_video/gift.mp4"
import grand from "../assets/component/Recipe_video/grandma.mp4"
import why from "../assets/component/Recipe_video/why.mp4"
import calicut from "../assets/component/Recipe_video/calicut.mp4"

const recipes = [
  { id: 1, title: "Ragi Porridge",  mediaUrl: millets, mediaType: "video" },
  { id: 2, title: "Wheat Khichdi", mediaUrl: why, mediaType: "video" },
  { id: 3, title: "Multigrain Mix", mediaUrl: haleema, mediaType: "video" },
  { id: 4, title: "Fruit Blend",    mediaUrl: pumkista, mediaType: "video" },
  { id: 5, title: "Rice Cereal",    mediaUrl: product, mediaType: "video" },
  { id: 6, title: "Veggie Mash",    mediaUrl: gift, mediaType: "video" },
  { id: 7, title: "Veggie Mash",    mediaUrl: grand, mediaType: "video" },
  { id: 8, title: "Veggie Mash",    mediaUrl: abc, mediaType: "video" },
  { id: 9, title: "Veggie Mash",    mediaUrl: calicut, mediaType: "video" },


];

export default function Recipes() {
  const rowRef = useRef(null);
  const [active, setActive] = useState(null);

  const scroll = (dir) => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: dir * 220, behavior: "smooth" });
  };

  return (
    <div style={{
      background: "#ffffff",
      padding: "40px 0 40px",
      fontFamily: "'Nunito', 'Comic Sans MS', cursive",
    }}>

      {/* ── TITLE ROW ── */}
      <div style={{
        padding: "0 28px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <h2 style={{
          fontSize: "clamp(2rem, 6vw, 3rem)",
          fontWeight: 900,
          color: "#5a2a1a",
          margin: 0,
          fontFamily: "'Nunito', 'Comic Sans MS', cursive",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}>
          REELS
        </h2>

        {/* Arrow controls */}
        {/* <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => scroll(-1)} style={arrowBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="#5a2a1a" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button onClick={() => scroll(1)} style={arrowBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="#5a2a1a" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div> */}
      </div>

      {/* ── INFINITE LOOP CAROUSEL ── */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track:hover .marquee-inner {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className="marquee-track"
        style={{
          overflow: "hidden",
          padding: "8px 0 16px",
          cursor: "grab",
        }}
      >
        {/* Duplicate cards so loop is seamless */}
        <div
          className="marquee-inner"
          style={{
            display: "flex",
            gap: 16,
            width: "max-content",
            animation: `marquee ${recipes.length * 3}s linear infinite`,
            paddingLeft: 28,
          }}
        >
          {/* Original set */}
          {[...recipes, ...recipes].map((recipe, i) => (
            <div
              key={i}
              onClick={() => setActive(i % recipes.length)}
              style={{
                flexShrink: 0,
                transition: "transform 0.2s ease",
                outline: active === i % recipes.length ? "2.5px solid #5a2a1a" : "none",
                borderRadius: 20,
                cursor: "pointer",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <MediaCard
                mediaUrl={recipe.mediaUrl}
                mediaType={recipe.mediaType}
                caption={recipe.title}
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

const arrowBtn = {
  width: 36, height: 36,
  borderRadius: "50%",
  border: "2px solid #f5d533",
  background: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  transition: "background 0.2s",
};