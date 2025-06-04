// src/pages/BlogPost.js

import React, { useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import gsap from "gsap";

function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((post) => post.slug === slug);

  const titleRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.1, ease: "power2.out" }
      );
    }
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power2.out" }
      );
    }
  }, []);

  if (!post) {
    return (
      <div className="text-white text-center py-20">Blog not found !!!</div>
    );
  }

  return (
    <div className="bg-image-iPhone text-white min-h-screen py-20 pb-[120px] pt-30">
      <div
        ref={containerRef}
        className="container relative w-full max-w-4xl rounded-2xl p-10 shadow-2xl border-2 border-white/20 bg-gradient-to-br from-white/10 via-[#7EC8E3]/10 to-black/30 backdrop-blur-2xl mx-auto"
      >
        <h1
          ref={titleRef}
          className="text-4xl font-extrabold mb-6 text-[#7EC8E3] drop-shadow-[0_2px_16px_rgba(126,200,227,0.6)]"
        >
          {post.title}
        </h1>
        <article
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="mt-10">
          <Link to="/blog" className="text-[#7EC8E3]">
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
