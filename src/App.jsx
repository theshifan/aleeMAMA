import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Aleemama from "./pages/Aleemama";
import OurStory from "./pages/OurStory";
import ContactUs from "./pages/ContactUs";
import ProductCard from "./pages/Products"
// import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";


// Placeholder components for demo
const Recipes = () => <div style={{ padding: "2rem" }}><h2>Recipes Page</h2></div>;

export default function App() {
  return (
    <BrowserRouter>
        <CartProvider>
      <Routes>
        {/* 1. Nest everything inside the Layout element route */}
        <Route path="/" element={<Aleemama />}>

          {/* 2. Define your individual sub-pages here */}
          {/* <Route index element={<Home />} /> Renders at domain.com/ */}
          <Route path="our-story" element={<OurStory />} /> {/* Renders at domain.com/our-story */}
          <Route path="recipes" element={<Recipes />} /> {/* Renders at domain.com/recipes */}
          <Route path="contact-us" element={<ContactUs/>}/>
          <Route path="product" element={<ProductCard />} />
          
          {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
          {/* <Route path="cart" element={<Cart/>}/> */}
        </Route>
      </Routes>
              </CartProvider>

    </BrowserRouter>

  );
}