import React from "react";
import nfimg from "../assets/not-found.svg";
import { Link } from "react-router-dom";
export default function PageNotFound() {
  return (
    <div className="bg-gradient-to-r from-[#050A30] via-[#090979] to-[#050A30] text-white min-h-screen pt-24 pb-[120px] px-6 flex flex-col items-center justify-center">
      {/* Your SVG below. Replace the example with your actual SVG code */}
            <Link
        to="/"
        className="bg-black text-white px-6 py-3 rounded-full transition cursor-pointer"
      >
        Go Back Home
      </Link>
      <img src={nfimg} alt="" />

    </div>
  );
}