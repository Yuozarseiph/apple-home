import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
const blogPosts = {
  'designing-for-connection': {
    title: 'Designing for Connection',
    author: 'Alex Doe',
    date: 'September 15, 2025',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    content: '<p>In a world of digital noise, true connection is rare. Our philosophy is simple: technology should bridge distances, not create them. Every product is designed with intuitive interfaces and thoughtful features that make interactions feel natural and human.</p><p>We focus on the little details—the subtle feedback, the seamless integration—that make technology disappear, leaving only the experience. It\'s not just about features; it\'s about fostering moments that matter.</p>',
  },
  'the-future-of-everyday-tech': {
    title: 'The Future of Everyday Tech',
    author: 'Jane Smith',
    date: 'September 10, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    content: '<p>The home of tomorrow is smart, sustainable, and built around you. We\'re exploring how technology can adapt to our lives, anticipating our needs without being intrusive. From energy-efficient designs to materials that last, we are building a future where technology serves us responsibly.</p><p>Our vision is a home that learns, supports, and grows with you, making everyday life simpler and more beautiful.</p>',
  },
   'strength-through-simplicity': {
    title: 'Strength Through Simplicity',
    author: 'Alex Doe',
    date: 'September 5, 2025',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    content: '<p>The most powerful tools are often the simplest to use. We strip away the unnecessary, focusing on core functionality that empowers you without overwhelming. Our design process is a constant pursuit of clarity and elegance, ensuring that every feature has a purpose.</p><p>This commitment to simplicity results in products that are not only beautiful but also incredibly powerful, letting you achieve more with less effort.</p>',
  },
  'beyond-the-screen': {
    title: 'Beyond the Screen',
    author: 'Chris Lee',
    date: 'August 28, 2025',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    content: '<p>The next frontier of interaction lies beyond the glowing rectangles in our hands. We are exploring how augmented reality, haptic feedback, and ambient computing can create richer, more integrated experiences. Imagine technology that you feel, rather than see—information and assistance woven into the fabric of your environment.</p><p>This is not about escaping the digital world, but about making it a more natural and intuitive part of our physical reality.</p>',
  }
};

const ScrollProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    return <motion.div className="fixed top-0 left-0 right-0 h-1 origin-left" style={{ scaleX, backgroundColor: '#00d5be' }} />;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts[slug];

  if (!post) {
    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Post not found</h1>
            <Link to="/blog" className="text-[#00d5be] hover:underline">
                Back to Blog
            </Link>
        </div>
    );
  }
  
  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <>
      <ScrollProgressBar />
      <div className="bg-black text-gray-300 min-h-screen">
        <div className="container max-w-3xl mx-auto px-4 py-12 md:py-20">
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <Link to="/blog" className="inline-flex items-center text-gray-400 hover:text-[#00d5be] transition-colors font-semibold mb-8 group">
              <ArrowLeft size={18} className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          </motion.div>

          <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden mb-12">
            <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="absolute bottom-8 left-8 text-4xl md:text-5xl font-bold text-white tracking-tighter"
            >
              {post.title}
            </motion.h1>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="flex items-center space-x-6 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-800">
              <div className="flex items-center gap-2"><User size={14} /> <span>{post.author}</span></div>
              <div className="flex items-center gap-2"><Calendar size={14} /> <span>{post.date}</span></div>
              <div className="flex items-center gap-2"><Clock size={14} /> <span>{post.readTime}</span></div>
            </motion.div>

            <motion.article
              variants={fadeInUp}
              className="prose prose-lg prose-invert max-w-none 
                         prose-p:leading-relaxed prose-p:text-gray-400 
                         prose-headings:text-white prose-strong:text-white"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}
