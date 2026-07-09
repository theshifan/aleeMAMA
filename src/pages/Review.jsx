import { useEffect, useRef, useState } from "react";
import InstagramCardPlaceholder from "../assets/component/InstagramCard";

const reviews = [
  { id: 1, username: "priya_mama", myPictureUrl: null, caption: "My baby absolutely loves the Sprouted Ragi Powder! So wholesome and natural 💛", likes: "124" },
  { id: 2, username: "anu_kitchen", myPictureUrl: null, caption: "Finally found something I can trust for my little one. No preservatives, no sugar! 🌿", likes: "98" },
  { id: 3, username: "sreeja_momlife", myPictureUrl: null, caption: "Grandmother approved nutrition ❤️ My 8 month old finishes every spoon!", likes: "210" },
  { id: 4, username: "divya.r", myPictureUrl: null, caption: "The multigrain mix is a game changer. Pure, simple, real food 🙌", likes: "76" },
  { id: 5, username: "nitha_family", myPictureUrl: null, caption: "Been using aleeMAMA for 3 months now. Best decision ever!", likes: "183" },
  { id: 6, username: "reshma_baby", myPictureUrl: null, caption: "Love that I can actually read every ingredient. No hidden stuff! 🌾", likes: "145" },
];

export default function Review() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const [active, setActive] = useState(0);
  const [isInView, setIsInView] = useState(false);

  // Detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll carousel when in view
  // useEffect(() => {
  //   if (!isInView) return;
  //   const interval = setInterval(() => {
  //     setActive(prev => {
  //       const next = (prev + 1) % reviews.length;
  //       scrollToCard(next);
  //       return next;
  //     });
  //   }, 2500);
  //   return () => clearInterval(interval);
  // }, [isInView]);

  const scrollToCard = (index) => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.children[index];
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  const goTo = (index) => {
    setActive(index);
    scrollToCard(index);
  };

  return (
    <div
      ref={sectionRef}
      style={{
        padding: "60px 0 60px",
        // background: "#fffdf0",
        overflow: "hidden",
      }}
    >
      {/* ── TITLE ── */}
      <div style={{ textAlign: "center", marginBottom: 32, padding: "0 24px" }}>
        <h2 style={{
          fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
          fontWeight: 900,
          color: "#5a2a1a",
          margin: "0 0 8px",
          fontFamily: "'Nunito', 'Comic Sans MS', cursive",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}>
          Reviews
        </h2>
        <div style={{
          width: 60, height: 4,
          background: "#f5d533",
          borderRadius: 2,
          margin: "0 auto 12px",
        }} />
        <p style={{ color: "#a07040", fontSize: "1rem", margin: 0 }}>
          What our aleeMAMA families are saying 💛
        </p>
      </div>

      {/* ── CAROUSEL ── */}
      <div style={{ position: "relative" }}>

        {/* Left arrow */}
        <button
          onClick={() => goTo((active - 1 + reviews.length) % reviews.length)}
          style={{
            position: "absolute", left: 8, top: "50%",
            transform: "translateY(-50%)",
            zIndex: 5,
            background: "#fff",
            border: "2px solid #f5d533",
            borderRadius: "50%",
            width: 40, height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="#5a2a1a" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        {/* Cards row */}
        <div
          ref={carouselRef}
          style={{
            display: "flex",
            gap: 20,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            padding: "12px 60px",
          }}
        >
          {reviews.map((review, i) => (
            <div
              key={review.id}
              style={{
                scrollSnapAlign: "center",
                flexShrink: 0,
                width: "min(340px, 80vw)",
                // transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: active === i ? "scale(1.04)" : "scale(0.96)",
                opacity: active === i ? 1 : 0.7,
              }}
            >
              <InstagramCardPlaceholder
                // myPictureUrl={review.myPictureUrl}
                // username={review.username}
                // caption={review.caption}
                // likes={review.likes}
              />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => goTo((active + 1) % reviews.length)}
          style={{
            position: "absolute", right: 8, top: "50%",
            transform: "translateY(-50%)",
            zIndex: 5,
            background: "#fff",
            border: "2px solid #f5d533",
            borderRadius: "50%",
            width: 40, height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="#5a2a1a" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      {/* ── DOTS ── */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 8,
        marginTop: 20,
      }}>
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: active === i ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: active === i ? "#5a2a1a" : "#f5d533",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* ── CTA ── */}
      <div style={{
        textAlign: "center",
        marginTop: 36,
        padding: "0 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}>
        <p style={{ color: "#5a2a1a", fontWeight: 800, fontSize: "1rem", margin: 0 }}>
          Share your aleeMAMA moment! 📸
        </p>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 24px",
            background: "#fff",
            color: "#5a2a1a", borderRadius: 24,
            fontWeight: 800, fontSize: "0.9rem",
            textDecoration: "none",
            fontFamily: "'Nunito', cursive",
            boxShadow: "0 4px 15px rgba(221,42,123,0.3)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="#5a2a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5"/>
            <circle cx="12" cy="12" r="5"/>
            <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
          </svg>
          _alee_mama_
        </a>
      </div>
    </div>
  );
}