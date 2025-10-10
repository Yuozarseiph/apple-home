import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const blogPosts = [
    { slug: 'designing-for-connection', title: 'Designing for Connection', excerpt: 'How thoughtful design brings people closer and makes every interaction feel more human.', image: 'https://placehold.co/1200x600/00d5be/000000?text=Featured+Post' },
    { slug: 'the-future-of-everyday-tech', title: 'The Future of Everyday Tech', excerpt: 'We explore how smart, sustainable design is shaping the home of tomorrow.', image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Blog+Post+2' },
    { slug: 'strength-through-simplicity', title: 'Strength Through Simplicity', excerpt: 'The most powerful experiences are often the simplest. Here’s how we empower without overwhelming.', image: 'https://placehold.co/600x400/2a2a2a/ffffff?text=Blog+Post+3' },
    { slug: 'beyond-the-screen', title: 'Beyond the Screen', excerpt: 'Exploring the boundaries of digital interaction and physical space.', image: 'https://placehold.co/600x400/3a3a3a/ffffff?text=Blog+Post+4' },
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 20, duration: 0.8 },
  },
};

const BlogPostCard = ({ post, isFeatured = false }) => {
  const GREEN_COLOR = "#00d5be";
  
  if (isFeatured) {
    return (
      <motion.div 
        className="col-span-1 md:col-span-3"
        variants={fadeInUp}
      >
        <Link to={`/blog/${post.slug}`} className="block group relative overflow-hidden rounded-2xl shadow-2xl">
          <motion.div 
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="md:flex items-center bg-gray-900"
          >
            <div className="md:w-1/2">
              <img className="w-full h-64 md:h-full object-cover" src={post.image} alt={post.title} />
            </div>
            <div className="md:w-1/2 p-8 md:p-12">
              <p className="text-sm font-semibold mb-2" style={{color: GREEN_COLOR}}>Featured Article</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">{post.title}</h2>
              <p className="text-gray-400 mb-6">{post.excerpt}</p>
              <div className="inline-flex items-center font-semibold text-white">
                Read more <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 213, 190, 0.2)" }}
      className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col group"
    >
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
        <img
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          src={post.image}
          alt={post.title}
        />
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/blog/${post.slug}`}>
          <h5 className="mb-3 text-xl font-bold tracking-tight text-white group-hover:text-[#00d5be] transition-colors">
            {post.title}
          </h5>
        </Link>
        <p className="text-gray-400 text-sm flex-grow mb-4">{post.excerpt}</p>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center mt-auto font-semibold text-[#00d5be] text-sm"
        >
          Read more <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default function Blog() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="bg-black text-white min-h-screen py-24 pb-28 px-4 md:px-6">
      <div className="container mx-auto">
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold tracking-tighter text-white"
          >
            From Our Team
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto"
          >
            Insights, ideas, and stories from the intersection of design and technology.
          </motion.p>
        </motion.div>

        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
        >
          {featuredPost && <BlogPostCard post={featuredPost} isFeatured />}
          {otherPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}