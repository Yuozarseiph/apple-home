import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch cart items from the server when component mounts
    const fetchCart = async () => {
      try {
        // Make GET request to /api/cart with authorization token
        const response = await axios.get("/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Filter out any invalid cart items that don't have a product object
        const validItems = response.data.filter((item) => item.product);
        setCartItems(validItems);
      } catch (error) {
        // Log error if fetching cart fails
        console.error("Failed to load cart:", error);
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Function to remove an item from the cart
  const removeFromCart = async (productId) => {
    try {
      // Send POST request to remove the product from cart on server
      await axios.post(
        "/api/cart/remove",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update state locally to remove the item without refetching
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.product._id !== productId)
      );
    } catch (err) {
      // Log error and show alert if removal fails
      console.error("Remove error:", err.response?.data);
      alert("Failed to remove item from cart");
    }
  };

  // Calculate total price by summing up price * quantity of each item
  const total = cartItems
    .reduce((sum, item) => {
      const price = parseFloat(item.product?.price);
      return sum + (isNaN(price) ? 0 : price) * item.quantity;
    }, 0)
    .toFixed(2);

  // Show loading text while data is being fetched
  if (loading)
    return (
      <div className="text-white bg-image-iPhone text-center py-10">Loading your cart...</div>
    );

  return (
    <div className="bg-image-iPhone text-white min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Your Cart</h1>

        {cartItems.length === 0 ? (
          // Show message if cart is empty
          <p className="text-center text-xl text-gray-300">
            Your cart is empty.
          </p>
        ) : (
          <>
            {/* List of cart items */}
            <ul className="space-y-6">
              {cartItems.map((item) => (
                <li
                  key={item.product._id}
                  className="position-relative mt-2 flex flex-col md:flex-row items-center gap-4 p-4 backdrop-blur-md bg-black/10 rounded-lg shadow-lg"
                >
                  {/* Product image with fallback */}
                  <img
                    src={item.product.image || "/placeholder.jpg"}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  {/* Product details */}
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-xl font-semibold">
                      {item.product.name}
                    </h3>
                    <p>
                      ${parseFloat(item.product.price).toFixed(2)}{" "}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Total and checkout button */}
            <div className="mt-8 flex justify-between items-center">
              <p className="text-xl font-semibold">
                Total: <span className="text-[#7EC8E3]">${total}</span>
              </p>
              <button
                onClick={() => {
                  navigate("/checkout");
                }}
                className="bg-[#7EC8E3] text-black px-6 py-2 rounded-full hover:bg-blue-400 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}

        {/* Link to continue shopping */}
        <div className="mt-8 text-center">
          <a href="/shop" className="text-[#7EC8E3] hover:underline">
            ← Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
}

export default Cart;
