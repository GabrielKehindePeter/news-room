"use client"; // if using the Next.js app router

import React from "react";
import Typewriter from "typewriter-effect";

const Hero = () => {
  return (
      <div className="text-sm text-amber-400 p-2 text-center">
        <Typewriter
          options={{
            strings: [
              "Welcome to my new site built with next.js framework with typescript, and tailwind css. It's actually exciting working with it."
            ],
            autoStart: true,
            loop: true,
            delay: 75,
          }}
        />
      </div>
  );
};

export default Hero;
