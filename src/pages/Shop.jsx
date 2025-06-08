import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AddToCartButton from "../components/AddToCartButton";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products") // آدرس رو بسته به بک‌اند خودت تنظیم کن
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="overflow-x-hidden min-h-screen py-20 px-4 md:px-10 pb-[120px]">
      <section className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-white mb-10"
        >
          Our Products
        </motion.h1>

        {loading ? (
          <p className="text-white text-lg">Loading products...</p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"
          >
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                custom={index}
                className="position-relative backdrop-blur-md bg-black/40 shadow-lg p-6 rounded-xl text-white flex flex-col"
              >
                <motion.img
                  src={product.image}
                  alt={product.name}
                  variants={imageVariants}
                  className="w-full h-48 object-contain rounded-lg mb-4"
                />
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-semibold text-[#7EC8E3] mb-2"
                >
                  {product.name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {product.description}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-[#7EC8E3] font-bold mb-4"
                >
                  {product.price}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-auto flex gap-4 justify-center"
                >
                  <AddToCartButton productId={product._id} />
                  <motion.button
                    whileHover={{ backgroundColor: "#0000FF", color: "white" }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-[#7EC8E3] text-[#7EC8E3] px-4 py-2 rounded-xl hover:bg-[#0000FF] hover:text-white transition-all duration-300"
                  >
                    View Details
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}

export default Shop;
