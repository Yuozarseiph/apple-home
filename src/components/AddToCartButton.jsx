import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Loader2, Check } from "lucide-react";

const toast = (message, isError = false) => {
  const toastElement = document.createElement("div");
  toastElement.className = `fixed top-5 right-5 text-white py-2 px-4 rounded-lg shadow-lg ${
    isError ? "bg-red-600" : "bg-green-600"
  }`;
  toastElement.innerText = message;
  document.body.appendChild(toastElement);
  setTimeout(() => {
    toastElement.remove();
  }, 3000);
};

function AddToCartButton({ productId }) {
  const [status, setStatus] = useState("idle");
  const GREEN_COLOR = "#00d5be";

  const addToCart = async () => {
    if (status !== "idle") return;
    const token = localStorage.getItem("token");
    if (!token) {
      toast("You must be logged in...", true);
      return;
    }
    setStatus("loading");
    try {
      await axios.post(
        "/api/cart/add",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus("success");
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status === "success" || status === "error") {
      if (status === "success") toast("Added to cart!");
      if (status === "error") toast("Could not add to cart.", true);
      const timer = setTimeout(() => setStatus("idle"), 2500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <motion.button
      onClick={addToCart}
      disabled={status !== "idle"}
      type="button"
      className="
        relative w-full h-12 rounded-lg font-semibold overflow-hidden
        bg-[#15202b] border border-[#00d5be]
        text-[#00d5be]
        flex items-center justify-center
        shadow-sm
        hover:bg-gradient-to-r hover:from-[#10b981] hover:to-[#3b82f6]
        active:scale-95
        transition duration-300
        disabled:opacity-60 disabled:cursor-not-allowed
      "
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {status === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            <span>Add to Cart</span>
          </motion.div>
        )}
        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Loader2 size={20} className="animate-spin" />
            <span>Adding...</span>
          </motion.div>
        )}
        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-black bg-[#00d5be] px-4 py-2 rounded-lg font-bold"
          >
            <Check size={20} />
            <span>Added!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default AddToCartButton;
