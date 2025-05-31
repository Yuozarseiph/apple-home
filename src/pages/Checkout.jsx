import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function Checkout() {
  // State for form data: name, email, address, cvv
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cvv: "",
  });

  // State for error message display
  const [error, setError] = useState("");

  // State to show success message after payment
  const [success, setSuccess] = useState(false);

  // State to hold card number in 4 parts
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);

  // State for expiry date (month and year)
  const [expiryDate, setExpiryDate] = useState({ month: "", year: "" });

  // Refs to handle focus on card number inputs
  const cardRefs = useRef([]);

  // Refs to handle focus on expiry month and year inputs
  const expiryRefs = useRef({ month: null, year: null });

  // Ref for CVV input field
  const cvvRef = useRef(null);

  // Handle general form input changes (name, email, address, cvv)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle changes in each card number segment
  // Only allow up to 4 digits, auto-focus next input on full input
  const handleCardNumberChange = (index, value) => {
    if (/^\d{0,4}$/.test(value)) {
      const updatedCardNumber = [...cardNumber];
      updatedCardNumber[index] = value;
      setCardNumber(updatedCardNumber);

      if (value.length === 4 && index < 3) {
        cardRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle changes in expiry date inputs
  // For month, allow max 12, auto-focus to year if 2 digits entered
  // For year, auto-focus CVV if 2 digits entered
  const handleExpiryDateChange = (field, value) => {
    if (field === "month" && /^\d{0,2}$/.test(value) && value <= 12) {
      setExpiryDate((prev) => ({ ...prev, month: value }));
      if (value.length === 2) {
        expiryRefs.current.year?.focus();
      }
    } else if (field === "year" && /^\d{0,2}$/.test(value)) {
      setExpiryDate((prev) => ({ ...prev, year: value }));
      if (value.length === 2) {
        cvvRef.current?.focus();
      }
    }
  };

  // Validate form inputs before submitting
  const validateForm = () => {
    const { name, email, address, cvv } = formData;
    const fullCardNumber = cardNumber.join("");
    if (
      !name ||
      !email ||
      !address ||
      !fullCardNumber ||
      !expiryDate.month ||
      !expiryDate.year ||
      !cvv
    ) {
      setError("All fields are required.");
      return false;
    }

    // Simple email validation regex
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return false;
    }

    // Check if card number is exactly 16 digits
    if (fullCardNumber.length !== 16) {
      setError("Please enter a valid card number.");
      return false;
    }

    // Check expiry date length (MM and YY)
    if (expiryDate.month.length !== 2 || expiryDate.year.length !== 2) {
      setError("Please enter a valid expiry date.");
      return false;
    }

    setError("");
    return true;
  };

  // Handle form submission
  // Validate form, then send API request to clear cart
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Send POST request to clear shopping cart
        await axios.post(
          "/api/cart/clear",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Show success message
        setSuccess(true);
      } catch (error) {
        // Handle failure to clear cart
        console.error("Failed to clear cart:", error);
        setError("Failed to clear cart. Please try again.");
      }
    }
  };

  return (
    <div className="bg-image-iPhone text-white min-h-screen py-20 pb-[120px] px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>

        {success ? (
          // Display success message on successful payment
          <motion.div
            className="bg-green-500 text-white p-6 rounded-lg text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl">Payment Successful!</h2>
            <p>
              Your order has been placed successfully. Thank you for your
              purchase!
            </p>
          </motion.div>
        ) : (
          <>
            {/* Display error message if exists */}
            {error && (
              <motion.div
                className="bg-red-500 text-white p-6 rounded-lg mb-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {error}
              </motion.div>
            )}

            {/* Checkout form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 flex flex-col md:flex-row">
                {/* Name input */}
                <div className="mb-4 w-full md:w-1/2 md:mb-0 md:mr-2">
                  <label className="block text-xl mb-2">Name</label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7EC8E3] bg-[#003E73] text-white placeholder:text-[#A6C8E3]"
                    required
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Email input */}
                <div className="w-full md:w-1/2 md:ml-2">
                  <label className="block text-xl mb-2">Email</label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7EC8E3] bg-[#003E73] text-white placeholder:text-[#A6C8E3]"
                    required
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Address input */}
              <div className="mb-4">
                <label className="block text-xl mb-2">Address</label>
                <motion.input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 mb-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7EC8E3] bg-[#003E73] text-white placeholder:text-[#A6C8E3]"
                  required
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Card Number input split into 4 fields */}
              <div className="mb-4">
                <label className="block text-xl mb-2">Card Number</label>
                <div className="flex flex-col gap-2 md:flex-row">
                  {cardNumber.map((num, index) => (
                    <motion.input
                      key={index}
                      type="text"
                      value={num}
                      onChange={(e) =>
                        handleCardNumberChange(index, e.target.value)
                      }
                      ref={(el) => (cardRefs.current[index] = el)}
                      className="w-full md:w-1/4 p-3 mb-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7EC8E3] bg-[#003E73] text-white placeholder:text-[#A6C8E3]"
                      maxLength="4"
                      required
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  ))}
                </div>
              </div>

              {/* Expiry date inputs */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-xl mb-2">Expiry Month</label>
                  <motion.input
                    type="text"
                    value={expiryDate.month}
                    onChange={(e) =>
                      handleExpiryDateChange("month", e.target.value)
                    }
                    ref={(el) => (expiryRefs.current.month = el)}
                    className="w-full p-3 mb-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7EC8E3] bg-[#003E73] text-white placeholder:text-[#A6C8E3]"
                    maxLength="2"
                    placeholder="MM"
                    required
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xl mb-2">Expiry Year</label>
                  <motion.input
                    type="text"
                    value={expiryDate.year}
                    onChange={(e) =>
                      handleExpiryDateChange("year", e.target.value)
                    }
                    ref={(el) => (expiryRefs.current.year = el)}
                    className="w-full p-3 mb-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7EC8E3] bg-[#003E73] text-white placeholder:text-[#A6C8E3]"
                    maxLength="2"
                    placeholder="YY"
                    required
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                {/* CVV input */}
                <div className="flex-1">
                  <label className="block text-xl mb-2">CVV</label>
                  <motion.input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    ref={cvvRef}
                    className="w-full p-3 mb-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7EC8E3] bg-[#003E73] text-white placeholder:text-[#A6C8E3]"
                    required
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Submit button with hover and tap animations */}
              <motion.button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-[#7EC8E3] text-black rounded-full hover:bg-blue-400 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Complete Purchase
              </motion.button>
            </motion.form>
          </>
        )}
      </div>
    </div>
  );
}

export default Checkout;
