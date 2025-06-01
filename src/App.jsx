// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Shop from "./pages/Shop";
import BottomNav from "./components/BottomNav";
import About from "./pages/About";
import FAQ from "./pages/Faq";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import Team from "./pages/Team";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Dashboard from "./pages/Dashboard";
import BlogPost from "./pages/BlogPost";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PageNotFound from "./pages/PageNotFound";
import DynamicIsland from "./components/DynamicIsland";

function App() {
  return (
    <Router>
      <DynamicIsland />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/cart" element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          } />

        <Route path="/checkout" element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          } />
          
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/team" element={<Team />} />
        {/* 404 Page Not Found route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
