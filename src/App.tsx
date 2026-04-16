import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { ProductProvider } from "./contexts/ProductContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AllProducts from "./pages/AllProducts";
import Arrivals from "./pages/Arrivals";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/arrivals" element={<Arrivals />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/about" element={<About />} />
                <Route path="/auth" element={<Auth />} />              <Route path="/admin" element={<Admin />} />                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
