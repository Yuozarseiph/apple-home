import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const GREEN_COLOR = "#00d5be";

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/api/cart", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCartItems(response.data.filter((item) => item.product));
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      await axios.post("/api/cart/remove", { productId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCartItems((prev) => prev.filter((item) => item.product._id !== productId));
    } catch (err) {
      console.error("Remove error:", err.response?.data);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    try {
      await axios.post("/api/cart/update", { productId, quantity: newQuantity }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (err) {
      console.error("Update error:", err.response?.data);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0).toFixed(2);

  if (loading) {
  }
  
  const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 }}};
  const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }};

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-28 px-4 md:px-6">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
          
            <motion.ul layout className="space-y-6 lg:col-span-2" variants={staggerContainer} initial="hidden" animate="visible">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.li
                    key={item.product._id}
                    layout
                    variants={fadeInUp}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                    className="flex flex-col sm:flex-row gap-6 p-4 bg-gray-900 rounded-xl"
                  >
                    <img src={item.product.image || "..."} alt={item.product.name} className="w-full sm:w-28 h-40 sm:h-28 object-cover rounded-md" />
                    <div className="flex-grow flex flex-col">
                      <h3 className="text-xl font-semibold text-white">{item.product.name}</h3>
                      <p className="text-lg font-medium" style={{ color: GREEN_COLOR }}>${parseFloat(item.product.price).toFixed(2)}</p>
                      <div className="flex items-center mt-auto pt-4 gap-4">
                        <div className="flex items-center border border-gray-700 rounded-md">
                          <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="p-2 hover:bg-gray-800 transition-colors"><Minus size={16} /></button>
                          <span className="px-3 text-lg font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="p-2 hover:bg-gray-800 transition-colors"><Plus size={16} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.product._id)} className="text-gray-500 hover:text-red-500 transition-colors ml-auto p-2">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>

            <motion.div layout className="lg:col-span-1 lg:sticky lg:top-24 h-fit mt-12 lg:mt-0 p-6 bg-gray-900 rounded-xl border border-gray-800">
              <h2 className="text-2xl font-semibold border-b border-gray-800 pb-4 mb-4">Order Summary</h2>
              <div className="space-y-3 text-gray-400">
                 <div className="flex justify-between"><span>Subtotal</span> <span className="text-white">${total}</span></div>
                 <div className="flex justify-between"><span>Shipping</span> <span className="text-white">Free</span></div>
                 <div className="flex justify-between font-bold text-lg border-t border-gray-800 pt-4 mt-4 text-white">
                    <span>Total</span> 
                    <motion.span layout style={{ color: GREEN_COLOR }}>${total}</motion.span>
                 </div>
              </div>
               <motion.button
                onClick={() => navigate("/checkout")}
                className="w-full mt-6 text-black px-6 py-3 rounded-lg font-semibold shadow-lg text-lg"
                style={{ backgroundColor: GREEN_COLOR }}
                whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${GREEN_COLOR}66` }}
              >
                Proceed to Checkout
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
