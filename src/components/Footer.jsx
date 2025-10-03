import React from 'react';
import { Github, Linkedin, Heart, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t-4 border-primary text-white/90 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          
          {/* Left Side - Brand/Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <span className="text-black font-bold text-lg sm:text-xl">🎮</span>
            </div>
            <div>
              <h3 className="font-['Archivo_Black'] text-sm sm:text-base text-primary">Bit Persona</h3>
              <p className="text-xs text-white/60 font-['Space_Grotesk']">Gaming Edition</p>
            </div>
          </div>

          {/* Center - Made with love */}
          <div className="flex items-center gap-2 text-xs sm:text-3xl text-white/70 font-['Space_Grotesk']">
            {/* <Code className="w-3 h-3 sm:w-4 sm:h-4" /> */}
            {/* <span>Made with</span>
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-current animate-pulse" />
            <span>for 8bit Creatives</span> */}
            <h1>More personas coming soon!</h1>
          </div>

          {/* Right Side - Social Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://github.com/vivek-650"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-primary border-2 border-gray-600 hover:border-black rounded shadow-[2px_2px_0px_0px_rgba(255,219,51,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-black transition-colors" />
            </a>
            
            <a
              href="https://linkedin.com/in/curiousvivek"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 hover:bg-primary border-2 border-blue-500 hover:border-black rounded shadow-[2px_2px_0px_0px_rgba(255,219,51,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-black transition-colors" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-700 text-center">
          <p className="text-xs text-white/50 font-['Space_Grotesk']">
            © 2025 Bit Persona Playground. Built for the gaming community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;