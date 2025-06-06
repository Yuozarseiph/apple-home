// src/pages/BlogPost.js

import React, { useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ثبت ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((post) => post.slug === slug);

  const titleRef = useRef(null);
  const containerRef = useRef(null);

  // Animate with ScrollTrigger
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  if (!post) {
    return (
      <div className="text-white text-center py-20">Blog not found !!!</div>
    );
  }

  return (
    <div className="bg-image-iPhone text-gray-800 min-h-screen py-20 pb-[120px] pt-30">
      <div
        ref={containerRef}
        className="container relative w-full max-w-4xl rounded-2xl p-10 shadow-2xl border border-gray-200 bg-white/90 backdrop-blur-sm mx-auto"
      >
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl font-extrabold mb-6 text-[#00a4c4] drop-shadow-[0_2px_16px_rgba(0,164,196,0.2)]"
        >
          {post.title}
        </h1>

        {/* Content */}
        <article
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back to Blog */}
        <div className="mt-10">
          <Link to="/blog" className="text-[#00a4c4] hover:text-[#0077b6] transition-colors">
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;