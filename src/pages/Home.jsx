import { useState, useRef } from "react";
import aleemamaImg from '../assets/aleemama_face.png';
import Footer from "../assets/component/Footer";
import ChatbotButton from "../assets/component/Chatbot_button";
import MenuBar from "../assets/component/MenuBar";
import OurStory from "./OurStory";
import ContactUs from "./ContactUs";
import Products from "./Products";
import Review from "./Review";
import Recipes from "./Recipes";

export default function Home() {
  const ourStoryRef = useRef(null);
  const contactUsRef = useRef(null);
  const productRef = useRef(null);
  const reviewRef = useRef(null);
  const RecipesRef = useRef(null);


  const scrollToSection = (section) => {
    if (section === "our-story" && ourStoryRef.current) {
      ourStoryRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (section === "contact-us" && contactUsRef.current) {
      contactUsRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (section === "product" && productRef.current) {
      productRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (section === "review" && reviewRef.current) {
      reviewRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (section === "recipie" && RecipesRef.current) {
      RecipesRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // add more sections here later e.g. product, contact etc
  };

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "#ffffff",
      fontFamily: "'Nunito', 'Comic Sans MS', cursive",
      overflow: "hidden",
    }}>

      {/* MenuBar — pass scrollToSection so it can trigger scrolls */}
      <MenuBar onNavigate={scrollToSection} />

      {/* ── SCROLLABLE CONTENT ── */}
      <div style={{
        position: "absolute",
        top: 64,
        left: 0, right: 0, bottom: 0,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}>

        {/* ── HERO SECTION ── */}
        <div style={{
          minHeight: "calc(100vh - 64px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
        }}>
          <img src={aleemamaImg} alt="Grandma"
            style={{ width: "min(400px, 80vw)", height: "auto" }} />
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.8rem)", color: "#5a2a1a",
            fontWeight: 900, textAlign: "center", margin: "10px 0",
            fontFamily: "'Nunito', 'Comic Sans MS', cursive",
          }}>
            Welcome to aleeMAMA
          </h1>
          <p style={{ color: "#a07040", fontSize: "1.2rem", padding: "20px" }}>
            Your page content goes here ✨
          </p>
        </div>

        {/* ── OUR STORY SECTION ── */}
        <div ref={ourStoryRef}>
          <OurStory />
        </div>
        <div ref={productRef}>
          <Products></Products>
        </div>
        <div ref={reviewRef}>
          <Review></Review>
        </div>
        <div ref={RecipesRef}>
          <Recipes></Recipes>
        </div>

        <div ref={contactUsRef}>
          <ContactUs></ContactUs>
        </div>

        {/* ── FOOTER ── */}
        <Footer />

      </div>

      {/* Chatbot always floating */}
      <ChatbotButton />

    </div>
  );
}