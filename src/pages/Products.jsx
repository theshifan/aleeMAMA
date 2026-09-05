import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ragi6M from '../assets/component/products pic/SP Ragi 6M.png'
import RawBana from '../assets/component/products pic/RAW banana nenedran.png'
import Kunnam from '../assets/component/products pic/Kunnam kaya raw banana.png'
import Sweetpotato from '../assets/component/products pic/Sweet Potato.png'
import Carbanana from '../assets/component/products pic/carbanana.png'
import Milkylix from '../assets/component/products pic/Milkylix.png'
import NutriMix from '../assets/component/products pic/Nutri mix.png'
import PohaAndMakahana from '../assets/component/products pic/Poha and Makhana.png'
import Pumkista from '../assets/component/products pic/Pumkista.png'
import RedBanapple from '../assets/component/products pic/Red banapple.png'
import AbcJuice from '../assets/component/products pic/ABC juice.png'
import { useCart } from "../context/CartContext";
// import ABC from '../assets/component/products pic/ABC juice.png'

const products = [
  {
    id: 1,
    name: "SPROUTED RAGI POWDER",
    weight: "300 g",
    price: "250/-",
    months: "6+",
    color: "#9a3612",
    image: Ragi6M,
  },
  {
    id: 2,
    name: "raw banana powder (kunnamkaya)",
    weight: "300 g",
    price: "230/-",
    months: "8+",
    color: "#b2d243",
    image: Kunnam,
  },
  {
    id: 3,
    name: "RAW BANANA POWDER (NENDRAN)",
    weight: "300 g",
    price: "280/-",
    months: "10+",
    color: "#ffce45",
    image: RawBana,
  },
  {
    id: 4,
    name: "SPROUTED RAGI NUTRI MIX",
    weight: "300 g",
    price: "280/-",
    months: "10+",
    color: "#edb062",
    image: NutriMix,
  },{
    id: 5,
    name: "POHA AND MAKAHANA",
    weight: "300 g",
    price: "280/-",
    months: "10+",
    color: "#d9d9d9",
    image: PohaAndMakahana,
  },
  {
    id: 6,
    name: "SWEET POTATO AND GRAINS",
    weight: "300 g",
    price: "280/-",
    months: "10+",
    color: "#984788",
    image: Sweetpotato,
  },
  {
    id: 7,
    name: "RED BANAPPLE",
    weight: "300 g",
    price: "280/-",
    months: "10+",
    color: "#fb939d",
    image: RedBanapple,
  },
   {
    id: 8,
    name: "PUMKISTA POWDER",
    weight: "300 g",
    price: "280/-",
    months: "10+",
    color: "#ccc14f",
    image: Pumkista,
  },
  {
    id: 9,
    name: "MILKYLIX POWDER",
    weight: "300 g",
    price: "280/-",
    months: "10+",
    color: "#754012",//#ecb870
    image: Milkylix,
  },
    {
    id: 10,
    name: "CARBANANA",
    weight: "300 g",
    price: "280/-",
    months: "10+",
    color: "#ff751f",//#fff8bd
    image: Carbanana,
  },
    {
    id: 11,
    name: "abC POWDER",
    weight: "300 g",
    price: "280/-",
    months: "10+",
    color: "#fb939d",//#ffe9db
    image: AbcJuice,
  },
];

function ProductCard({ product, onProductClick }) {
  const imageRef = useRef(null);
  const cardRef = useRef(null);
  const [imageY, setImageY] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);   
  const { addToCart, openCart } = useCart();
  const navigate = useNavigate(); // make sure useNavigate is imported at the top of Products.jsx

  useEffect(() => {
    // Find the Home scroll container
    const container = document.getElementById("home-scroll-container");
    if (!container) return;

    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relativeTop = rect.top - containerRect.top;
      const cardHeight = rect.height;

      // Progress: 0 = card at top, 1 = card fully scrolled past
      const scrolledPast = -relativeTop;
      const progress = Math.max(0, Math.min(1, scrolledPast / cardHeight));

      // Only the IMAGE moves and fades — text stays still
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
      {/* LEFT: Text — stays fixed in place */}
      <div style={{
        flex: 1,
        padding: "0 32px",
        color: "#fff",
        zIndex: 2,
      }}>
        {/* Months badge */}
        <div style={{
          display: "inline-block",
          background: "rgba(255,255,255,0.2)",
          border: "2px solid #fff",
          borderRadius: 8,
          padding: "4px 14px",
          fontSize: "0.95rem",
          fontWeight: 800,
          marginBottom: 16,
          fontFamily: "'Nunito', cursive",
        }}>
          {product.months} MONTHS
        </div>

        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 900,
          color: "#ffffff",
          margin: "0 0 20px 0",
          lineHeight: 1.1,
          fontFamily: "'Nunito', 'Comic Sans MS', cursive",
          textTransform: "uppercase",
        }}>
          {product.name}
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          fontWeight: 700,
          color: "#f6f3f0",
          margin: "8px 0",
          fontFamily: "'Nunito', cursive",
        }}>
          Weight : {product.weight}
        </p>
        <p style={{
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          fontWeight: 700,
          color: "#f4f1ef",
          margin: "8px 0",
          fontFamily: "'Nunito', cursive",
        }}>
          Price : {product.price}
        </p>
        <button onClick={() => addToCart(product)}
  style={{
    cursor: "pointer",
    marginTop: 12,
    background: "#fff",
    color: product.color || "#5a2a1a",
    border: "none",
    borderRadius: 20,
    padding: "8px 20px",
    fontWeight: 900,
    fontSize: "0.95rem",
    fontFamily: "'Nunito', cursive",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  }}
>
  Add to Cart 🛒
</button>
      </div>

      {/* RIGHT: Product image — scrolls down and fades as you scroll */}
      <div
        ref={imageRef}
        onClick={() => onProductClick(product.id)}
        style={{
          width: "40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transform: `translateY(${imageY}px)`,
          opacity: Math.max(0, imageOpacity),
          transition: "transform 0.1s linear, opacity 0.1s linear",
          zIndex: 2,
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "80%",
              maxWidth: 260,
              height: "auto",
              animation: "hoverFloat 3s ease-in-out infinite",
              filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.4))",
            }}
          />
        ) : (
          <div style={{
            width: 180,
            height: 240,
            background: "rgba(255,255,255,0.15)",
            border: "3px dashed rgba(255,255,255,0.5)",
            borderRadius: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // animation: "hoverFloat 3s ease-in-out infinite",
            filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.3))",
            color: "#fff",
            fontFamily: "'Nunito', cursive",
            textAlign: "center",
            padding: 16,
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🛍️</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, opacity: 0.8 }}>
              Product Image
            </div>
            <div style={{ fontSize: "0.75rem", opacity: 0.6, marginTop: 4 }}>
              Click to view
            </div>
          </div>
        )}
      </div>

      {/* Scalloped bottom edge */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3 }}>
        {/* <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", display: "block" }}
          preserveAspectRatio="none">
          <path
            d="M0,60 Q72,0 144,60 Q216,0 288,60 Q360,0 432,60 Q504,0 576,60 Q648,0 720,60 Q792,0 864,60 Q936,0 1008,60 Q1080,0 1152,60 Q1224,0 1296,60 Q1368,0 1440,60 Z"
            fill="rgba(0,0,0,0.2)"
          />
        </svg> */}
      </div>
    </div>
  );
}

export default function Products() {
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

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
          onProductClick={handleProductClick}
        />
      ))}
    </>
  );
}