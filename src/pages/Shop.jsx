import React, { useState } from "react";
import { motion } from "framer-motion";
import AddToCartButton from "../components/AddToCartButton";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import ip16 from "../assets/iPhone16/ip16.png";
import ip16e from "../assets/iPhone16/ip16e.png";
import ip16pro from "../assets/iPhone16/ip16pro.png";

const GREEN_COLOR = "#00d5be";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const productsMock = [
  {
    _id: "1",
    name: "iPhone 16",
    description: "The ultimate iPhone.",
    price: "999",
    image: ip16,
  },
  {
    _id: "2",
    name: "iPhone 16e",
    description: "Supercharged by M3.",
    price: "749",
    image: ip16e,
  },
  {
    _id: "3",
    name: "iPhone 16 Pro",
    description: "Smarter. Brighter. Mightier.",
    price: "1199",
    image: ip16pro,
  },
  {
    _id: "4",
    name: "iPhone 16 Pro Max",
    description: "Adaptive Audio. Now playing.",
    price: "1399",
    image: ip16pro,
  },
];

const Shop = () => {
  const [products] = useState(productsMock);

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-28 px-4 md:px-6">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold tracking-tighter"
          >
            The Store
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto"
          >
            The best way to buy the products you love.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product._id}
              variants={fadeInUp}
              className="relative group bg-gray-900 rounded-2xl p-6 flex flex-col text-center border border-white/10 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <motion.div
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${GREEN_COLOR}11, transparent 80%)`,
                }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <Link
                  to={`/product/${product._id}`}
                  className="block relative mb-6"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-52 object-contain transition-transform duration-300 group-hover:scale-105 rounded-lg"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                    initial={{ backdropFilter: "blur(0px)" }}
                    whileHover={{ backdropFilter: "blur(8px)" }}
                  >
                    <div className="flex items-center gap-2 font-semibold border-2 border-white rounded-full px-4 py-2">
                      <Eye size={18} />
                      View Product
                    </div>
                  </motion.div>
                </Link>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-400 flex-grow text-sm">
                  {product.description}
                </p>
                <p
                  className="font-bold my-4 text-2xl"
                  style={{ color: GREEN_COLOR }}
                >
                  ${product.price}
                </p>
                <div className="mt-auto pt-4">
                  <AddToCartButton productId={product._id} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Shop;
