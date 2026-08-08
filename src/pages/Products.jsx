import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Primary images
import Ragi6M from '../assets/component/products pic/SP Ragi 6M.png';
import RawBana from '../assets/component/products pic/RAW banana nenedran.png';
import Kunnam from '../assets/component/products pic/Kunnam kaya raw banana.png';
import Sweetpotato from '../assets/component/products pic/Sweet Potato.png';
import Carbanana from '../assets/component/products pic/carbanana.png';
import Milkylix from '../assets/component/products pic/Milkylix.png';
import NutriMix from '../assets/component/products pic/Nutri mix.png';
import PohaAndMakahana from '../assets/component/products pic/Poha and Makhana.png';
import Pumkista from '../assets/component/products pic/Pumkista.png';
import RedBanapple from '../assets/component/products pic/Red banapple.png';
import AbcJuice from '../assets/component/products pic/ABC juice.png';


import Kunnaming from '../assets/component/Ingredients/kunnamkai.png'
import Sweetpotatoing from '../assets/component/Ingredients/sweet potato.png'
import Carbananaing from '../assets/component/Ingredients/carbanana.png'
import Milkylixing from '../assets/component/Ingredients/milkyliks.png'
import Pumkistaing from '../assets/component/Ingredients/pimkista.png'
// import abcing from '../assets/component/Ingredients/abc.png'
import m6Ragi from '../assets/component/Ingredients/6Msproutedragi.png'
import abcing from '../assets/component/Ingredients/abc.png'
import poha from '../assets/component/Ingredients/PohaAndMakhana.png'
import redbanaing from '../assets/component/Ingredients/redbanana.png'
import rawbana from '../assets/component/Ingredients/Raw banana.png'
import NutriMixing from '../assets/component/Ingredients/Nutri Mix.png'
// import 6ragi from '../assets/component/ingredients/6Msproutedragi.png'





const products = [
  { 
    id: 1, 
    name: "SPROUTED RAGI POWDER", 
    weight: "300 g", 
    price: "250/-", 
    months: "6 + MONTHS", 
    color: "#9a3612", 
    image: Ragi6M,
    popupImage: m6Ragi // 👈 Add your imported popup image here (e.g. Ragi6MPopup)
  },
  { id: 2, name: "raw banana powder (kunnamkaya)", weight: "300 g", price: "320/-", months: "6 + MONTHS", color: "#b2d243", image: Kunnam, popupImage: Kunnaming },
  { id: 3, name: "RAW BANANA POWDER (NENDRAN)", weight: "300 g", price: "285/-", months: "6 + MONTHS", color: "#ffce45", image: RawBana, popupImage: rawbana },
  { id: 4, name: "SPROUTED RAGI NUTRI MIX", weight: "250 g", price: "290/-", months: "8 + MONTHS", color: "#edb062", image: NutriMix, popupImage: NutriMixing },
  { id: 5, name: "POHA AND MAKAHANA", weight: "250 g", price: "320/-", months: "8 + MONTHS", color: "#d9d9d9", image: PohaAndMakahana, popupImage: poha },
  { id: 6, name: "SWEET POTATO AND GRAINS", weight: "250 g", price: "320/-", months: "8 + MONTHS", color: "#984788", image: Sweetpotato, popupImage: Sweetpotatoing },
  { id: 7, name: "RED BANAPPLE", weight: "250 g", price: "360/-", months: "8 + MONTHS", color: "#fb939d", image: RedBanapple, popupImage: redbanaing },
  { id: 8, name: "PUMKISTA POWDER", weight: "250 g", price: "320/-", months: "8 + MONTHS", color: "#ccc14f", image: Pumkista, popupImage: Pumkistaing },
  { id: 9, name: "MILKYLIX POWDER", weight: "250 g", price: "300/-", months: "1 YEAR +", color: "#754012", image: Milkylix, popupImage: Milkylixing },
  { id: 10, name: "CARBANANA", weight: "300 g", price: "280/-", months: "8 + MONTHS", color: "#ff751f", image: Carbanana, popupImage: Carbananaing },
  { id: 11, name: "abC POWDER", weight: "300 g", price: "280/-", months: "ALL AGES", color: "#fb939d", image: AbcJuice, popupImage: abcing },
];

function ProductCard({ product, onImageClick }) {
  const imageRef = useRef(null);
  const cardRef = useRef(null);
  const [imageY, setImageY] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);

  useEffect(() => {
    const container = document.getElementById("home-scroll-container");
    if (!container) return;

    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relativeTop = rect.top - containerRect.top;
      const cardHeight = rect.height;

      const scrolledPast = -relativeTop;
      const progress = Math.max(0, Math.min(1, scrolledPast / cardHeight));

      setImageY(progress * 120);
      setImageOpacity(1 - progress * 1.5);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        height: "71vh",
        background: product.color,
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* LEFT: Text */}
      <div style={{ flex: 1, padding: "0 32px", color: "#fff", zIndex: 2 }}>
        <div style={{
          display: "inline-block", background: "rgba(255,255,255,0.2)",
          border: "2px solid #fff", borderRadius: 8, padding: "4px 14px",
          fontSize: "0.95rem", fontWeight: 800, marginBottom: 16,
          fontFamily: "'Nunito', cursive",
        }}>
          {product.months}
        </div>

        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, color: "#ffffff",
          margin: "0 0 20px 0", lineHeight: 1.1,
          fontFamily: "'Nunito', 'Comic Sans MS', cursive", textTransform: "uppercase",
        }}>
          {product.name}
        </h1>

        <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", fontWeight: 700, color: "#ffffff", margin: "8px 0", fontFamily: "'Nunito', cursive" }}>
          Weight : {product.weight}
        </p>
        <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", fontWeight: 700, color: "#ffffff", margin: "8px 0", fontFamily: "'Nunito', cursive" }}>
          Price : {product.price}
        </p>
      </div>

      {/* RIGHT: Product Image Button */}
      <div
        ref={imageRef}
        style={{
          width: "40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${imageY}px)`,
          opacity: Math.max(0, imageOpacity),
          transition: "transform 0.1s linear, opacity 0.1s linear",
          zIndex: 2,
          overflow: "hidden",  
          height: "100%",  
        }}
      >
         {/* ── INSTRUCTION TEXT — rotated label style ── */}
        <div style={{
          position: "absolute",
          top: "15%",
          right: "2%",
          zIndex: 3,
          pointerEvents: "none",
          transform: "rotate(30deg)",
          transformOrigin: "center center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}>
          <span style={{
            color: "white",
            fontFamily: "'Nunito', 'Comic Sans MS', cursive",
            fontSize: "0.665rem",     // ← much smaller
            fontWeight: 900,
            whiteSpace: "nowrap",
            textShadow: "0 1px 3px rgba(0,0,0,0.4)",
          }}>
            click on the product to
          </span>
          <span style={{
            color: "white",
            fontFamily: "'Nunito', 'Comic Sans MS', cursive",
            fontSize: "0.675rem",     // ← much smaller
            fontWeight: 900,
            whiteSpace: "nowrap",
            textShadow: "0 1px 3px rgba(0,0,0,0.4)",
          }}>
            know about the ingredients
          </span>
          {/* Small arrow */}
          <svg width="24" height="20" viewBox="0 0 24 20"
           width="24" height="20" viewBox="0 0 24 20"
           style={{ transform: "scaleX(-1)" }}  // ← flips horizontally
          >
            <path d="M 3,3 Q 12,14 21,8"
              stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M 16,4 L 21,8 L 17,13"
              stroke="white" strokeWidth="2" fill="none"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <button
          type="button"
          onClick={() => onImageClick(product)}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            outline: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "80%",
                maxWidth: 569,
                height: "auto",
                animation: "hoverFloat 3s ease-in-out infinite",
                filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.4))",
              }}
            />
          ) : (
            <div style={{
              width: 180, height: 240, background: "rgba(255,255,255,0.15)",
              border: "3px dashed rgba(255,255,255,0.5)", borderRadius: 16,
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", color: "#fff", fontFamily: "'Nunito', cursive",
              textAlign: "center", padding: 16,
            }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🛍️</div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, opacity: 0.8 }}>Product Image</div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <style>{`
        @keyframes hoverFloat {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-18px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onImageClick={(prod) => setSelectedProduct(prod)}
        />
      ))}

      {/* ── POPUP MODAL DISPLAYING THE NEW POPUP PICTURE ── */}
      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              style={{
                position: "absolute",
                top: -45,
                right: -10,
                background: "#f5d533",
                color: "#5a2a1a",
                border: "2px solid #5a2a1a",
                borderRadius: "50%",
                width: 36,
                height: 36,
                fontSize: "1.2rem",
                fontWeight: 900,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
            >
              ✕
            </button>

            {/* 💡 SHOWS THE CUSTOM POPUP IMAGE IF SUPPLIED, OTHERWISE FALLS BACK TO THE MAIN IMAGE */}
            <img
              src={selectedProduct.popupImage || selectedProduct.image}
              alt={`${selectedProduct.name} Details`}
              style={{
                maxWidth: "100%",
                maxHeight: "70vh",
                objectFit: "contain",
                filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.5))",
                borderRadius: 12,
              }}
            />

            {/* Caption */}
            <div style={{ marginTop: 16, color: "#fff", textAlign: "center", fontFamily: "'Nunito', cursive" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 900, margin: "0 0 6px 0", color: "#f5d533" }}>
                {selectedProduct.name}
              </h2>
              <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700 }}>
                {selectedProduct.weight} • {selectedProduct.price}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}