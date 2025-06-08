import React from "react";
import nfimg from "../assets/not-found.svg";
import { Link } from "react-router-dom";
import CreativeButton from "../components/CreativeButton";
export default function PageNotFound() {
  return (

      <div className="bg-white overflow-x-hidden text-white min-h-screen pt-24 pb-[120px] px-6 flex flex-col items-center justify-center">
        {/* Your SVG below. Replace the example with your actual SVG code */}
        
          <Link
            to="/"
            className=" px-6 py-3 rounded-full transition cursor-pointer mb-6"
          >
            <CreativeButton text={"Go to Home"} className=""></CreativeButton>
          </Link>
        
        <img src={nfimg} alt="" />
      </div>
  );
}
