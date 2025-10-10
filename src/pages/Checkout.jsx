import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { CreditCard, CheckCircle } from "lucide-react";

function Checkout() {
  const [formData, setFormData] = useState({ name: "", email: "", address: "", cvv: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const [expiryDate, setExpiryDate] = useState({ month: "", year: "" });
  const cardRefs = useRef([]);
  const expiryRefs = useRef({ month: null, year: null });
  const cvvRef = useRef(null);

  // Form handling logic remains largely the same...
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCardNumberChange = (index, value) => {
    if (/^\d{0,4}$/.test(value)) {
      const newCardNumber = [...cardNumber];
      newCardNumber[index] = value;
      setCardNumber(newCardNumber);
      if (value.length === 4 && index < 3) cardRefs.current[index + 1]?.focus();
    }
  };
   const handleExpiryDateChange = (field, value) => {
    if (field === "month" && /^\d{0,2}$/.test(value) && value <= 12) {
      setExpiryDate((prev) => ({ ...prev, month: value }));
      if (value.length === 2) expiryRefs.current.year?.focus();
    } else if (field === "year" && /^\d{0,2}$/.test(value)) {
      setExpiryDate((prev) => ({ ...prev, year: value }));
      if (value.length === 2) cvvRef.current?.focus();
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simplified validation for demonstration
    if (cardNumber.join("").length !== 16 || !formData.name || !formData.email) {
        return setError("Please fill all required fields correctly.");
    }
    setError("");
    try {
        await axios.post("/api/cart/clear", {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
        setSuccess(true);
    } catch (err) {
        setError("Payment failed. Please try again.");
    }
  };

  const inputStyles = "w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 transition";

  return (
    <div className="bg-gray-900 text-white min-h-screen py-24 pb-28 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-teal-400">Checkout</h1>

        {success ? (
          <motion.div
            className="bg-green-500/20 border border-green-500 text-white p-6 rounded-lg text-center flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle size={48} className="text-green-400" />
            <h2 className="text-2xl font-semibold">Payment Successful!</h2>
            <p>Your order has been placed. Thank you for your purchase!</p>
          </motion.div>
        ) : (
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {error && <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg mb-4 text-center">{error}</div>}
            
            <div className="space-y-4">
              <div>
                <label className="block text-lg mb-2 text-gray-300">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label className="block text-lg mb-2 text-gray-300">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputStyles} required />
              </div>
               <div>
                <label className="block text-lg mb-2 text-gray-300">Card Number</label>
                <div className="flex gap-2">
                  {cardNumber.map((num, index) => (
                    <input key={index} type="text" value={num} onChange={(e) => handleCardNumberChange(index, e.target.value)} ref={(el) => (cardRefs.current[index] = el)} className={`${inputStyles} text-center`} maxLength="4" required />
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-lg mb-2 text-gray-300">Expiry</label>
                  <div className="flex gap-2">
                     <input type="text" value={expiryDate.month} onChange={(e) => handleExpiryDateChange("month", e.target.value)} ref={(el) => (expiryRefs.current.month = el)} className={`${inputStyles} text-center`} maxLength="2" placeholder="MM" required />
                     <input type="text" value={expiryDate.year} onChange={(e) => handleExpiryDateChange("year", e.target.value)} ref={(el) => (expiryRefs.current.year = el)} className={`${inputStyles} text-center`} maxLength="2" placeholder="YY" required />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-lg mb-2 text-gray-300">CVV</label>
                  <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} ref={cvvRef} className={inputStyles} required />
                </div>
              </div>

              <motion.button type="submit" className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition font-semibold" whileHover={{ scale: 1.05 }}>
                <CreditCard size={20} /> Complete Purchase
              </motion.button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
}

export default Checkout;
