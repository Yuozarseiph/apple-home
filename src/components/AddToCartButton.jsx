import React from "react";
import axios from "axios";

function AddToCartButton({ productId }) {
  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    try {
      // First, get the product details by productId
      const productResponse = await axios.get(`/api/products/${productId}`);
      const product = productResponse.data;

      // Then, add the product to the user's cart
      const response = await axios.post(
        "/api/cart/add",
        { productId: productId }, // Only send productId
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to cart!");
    } catch (err) {
      // Print detailed error response
      console.error("Error adding to cart:", err.response ? err.response : err);
      alert("Could not add to cart.");
    }
  };

  return (
    <button
      onClick={addToCart}
      className="bg-[#7EC8E3] text-black px-4 py-2 rounded-xl hover:bg-blue-400 transition"
    >
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
