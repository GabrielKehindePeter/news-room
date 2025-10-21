import React from "react";
import MarqueeText from "./Scroll";
import { Facebook, Instagram , Twitter  } from 'lucide-react';


const Preheader = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 p-2 border-b-2 border-blue-600 items-center">
        {/* Title - full width on mobile, left on larger screens */}
        <div className="w-full sm:col-span-1 flex justify-center sm:justify-start">
          <h2 className="text-base sm:text-xl font-bold text-blue-600 text-center sm:text-left">
            News Head Lines
          </h2>
        </div>

        {/* Marquee - takes the middle columns on larger screens, full width on mobile */}
        <div className="w-full sm:col-span-4">
          {/* wrap marquee so it can shrink / scroll nicely on small screens */}
          <div className="overflow-hidden whitespace-nowrap text-sm sm:text-base">
            <MarqueeText />
          </div>
        </div>

        {/* Social icons - hide or stack on mobile; align to right on larger screens */}
        <div className="w-full sm:col-span-1 flex justify-center sm:justify-end">
          <div className="flex items-center gap-3 text-sm sm:text-xl">
            {/* Replace these placeholders with your actual icons */}
            <span className="sr-only">Social</span>
            <button aria-label="facebook" className="p-1">
              {/* icon */}
              <Facebook className="text-white rounded-sm"/>
            </button>
            <button aria-label="twitter" className="p-1">
              {/* icon */}
              <Instagram className="text-white rounded-sm"/>
            </button>
            <button aria-label="instagram" className="p-1  rounded-sm">
              <Twitter className="text-white"/>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preheader;
