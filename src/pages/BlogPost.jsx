// src/pages/BlogPost.js

import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

function BlogPost() {
  // Get the 'slug' parameter from the URL
  const { slug } = useParams();

  // Find the blog post that matches the slug
  const post = blogPosts.find((post) => post.slug === slug);

  // If no post is found, display a not found message
  if (!post) {
    return <div className="text-white text-center py-20">Blog not found !!!</div>;
  }

  return (
    <div className="bg-image-iPhone text-white min-h-screen py-20 pt-30">
      {/* Container with blurred background and shadow */}
      <div className="container backdrop-blur-md bg-black/10 shadow-lg mx-auto px-6 max-w-4xl">
        {/* Animated post title */}
        <motion.h1
          className="text-4xl font-bold mb-6 text-[#7EC8E3]"
          initial={{ opacity: 0 }}           // Start hidden
          animate={{ opacity: 1 }}           // Fade in animation
          transition={{ duration: 0.6 }}     // Animation duration
        >
          {post.title}
        </motion.h1>

        {/* Blog content rendered as HTML */}
        <article
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back link to the main blog page */}
        <div className="mt-10">
          <a href="/blog" className="text-[#7EC8E3] hover:underline">
            &larr; Back to Blog
          </a>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
