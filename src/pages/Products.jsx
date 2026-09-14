import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import millet from '../assets/component/products pic/millet and beets.png';
import pancake from '../assets/component/products pic/pancake mix.png';
import ragiDates from '../assets/component/products pic/ragi date and almonds.png'
import { useCart } from "../context/CartContext";

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
    price: "285/-",
    months: "6+",
    color: "#b2d243",
    image: Kunnam,
  },
  {
    id: 3,
    name: "RAW BANANA POWDER (NENDRAN)",
    weight: "300 g",
    price: "280/-",
    months: "6+",
    color: "#ffce45",
    image: RawBana,
  },

  {
    id: 4,
    name: "RED BANAPPLE",
    weight: "250 g",
    price: "360/-",
    months: "7+",
    color: "#fb939d",
    image: RedBanapple,
  },
  {
    id: 5,
    name: "SWEET POTATO AND GRAINS",
    weight: "250 g",
    price: "300/-",
    months: "7+",
    color: "#984788",
    image: Sweetpotato,
  },
  {
    id: 6,
    name: "Ragi Dates & Almond",
    weight: "250 g",
    price: "320/-",
    months: "7+",
    color: "#bd7b68",
    image: ragiDates,
  },
  {
    id: 7,
    name: "SPROUTED RAGI NUTRI MIX",
    weight: "300 g",
    price: "290/-",
    months: "8+",
    color: "#edb062",
    image: NutriMix,
  },
  {
    id: 8,
    name: "PUMKISTA POWDER",
    weight: "250 g",
    price: "330/-",
    months: "8+",
    color: "#ccc14f",
    image: Pumkista,
  },
  {
    id: 9,
    name: "Carbanana And Almond Mix",
    weight: "250 g",
    price: "340/-",
    months: "8+",
    color: "#ff751f",
    image: Carbanana,
  },
  {
    id: 10,
    name: "POHA AND MAKAHANA",
    weight: "250 g",
    price: "320/-",
    months: "8+",
    color: "#d9d9d9",
    image: PohaAndMakahana,
  },
  {
    id: 11,
    name: "Millet And Beets",
    weight: "250 g",
    price: "320/-",
    months: "8+",
    color: "#d26872",
    image: millet,
  },
  {
    id: 12,
    name: "PanCake Mix",
    weight: "250 g",
    price: "320/-",
    months: "8+",
    color: "#ffeb99",
    image: pancake,
  },
  {
    id: 13,
    name: "MILKYLIX POWDER",
    weight: "250 g",
    price: "300/-",
    months: "12+",
    color: "#754012",
    image: Milkylix,
  },
  {
    id: 14,
    name: "ABC POWDER",
    weight: "250 g",
    price: "480/-",
    months: "24+",
    color: "#fb939d",
    image: AbcJuice,
  },
];

function ProductCard({ product, onProductClick }) {
  const imageRef = useRef(null);
  const cardRef = useRef(null);
  const [imageY, setImageY] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);   
  const { addToCart, openCart } = useCart();

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

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    if (typeof toggleCart === "function") {
      toggleCart();
    }
  };

  return (
    <div
      ref={cardRef}
      className="product-card-container"
      style={{
        background: product.color,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* LEFT: Text */}
      <div className="product-text-container">
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
          fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)",
          fontWeight: 900,
          color: "#ffffff",
          margin: "0 0 20px 0",
          lineHeight: 1.1,
          fontFamily: "'Nunito', cursive",
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

        <button
          type="button"
          onClick={handleAdd}
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

      {/* RIGHT: Product image wrapper */}
      <div
        ref={imageRef}
        className="product-image-wrapper"
        onClick={() => onProductClick(product.id)}
        style={{
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
            className="product-responsive-img"
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

        /* Default Desktop Layout */
        .product-card-container {
          height: 40vh;
          min-height: 450px;
          display: flex;
          flex-direction: row;
          align-items: center;

        }

        .product-text-container {
          flex: 1;
          padding: 0 32px;
          color: #fff;
          zIndex: 2;
        }

        // .product-image-wrapper {
        //   width: 50%;
        //   display: flex;
        //   align-items: center;
        //   justifyContent: center;
        //   cursor: pointer;
        // }

        .product-responsive-img {
          width: 500px;
          height: 700px;
// max-width: 90%;
          // max-height: 65vh;
          object-fit: contain;
          animation: hoverFloat 3s ease-in-out infinite;
          filter: drop-shadow(0 20px 30px rgba(0,0,0,0.4));
        }

        /* Tablet Screen Rules */
        @media (max-width: 1024px) {
          .product-image-wrapper {
            width: 45%;
          }
          .product-responsive-img {
            width: 360px;
            height: auto;
            max-height: 50vh;
          }
        }

        /* Mobile Screen Rules */
        @media (max-width: 768px) {
          .product-card-container {
            height: auto;
            min-height: 85vh;
            flex-direction: column-reverse;
            justify-content: center;
            padding: 36px 16px;
            text-align: center;
          }
          .product-text-container {
            padding: 16px 0 0 0;
          }
          .product-image-wrapper {
            width: 100%;
          }
          .product-responsive-img {
            width: 240px;
            max-width: 75vw;
            height: auto;
            max-height: 38vh;
          }
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