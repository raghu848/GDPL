'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NavbarVex: React.FC = () => {
  return (
    <>
      <nav className="px-6 md:px-12 lg:px-16 pt-6 w-full z-50 fixed top-0 left-0">
        <div className="liquid-glass rounded-full px-8 py-5 flex items-center justify-between max-w-7xl mx-auto border border-white/10">
          {/* Left: Phone */}
          <div className="flex items-center gap-2">
            <a href="tel:+917789000077" className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden lg:block text-white font-bold text-xs font-serif">+91 77890 00077</span>
            </a>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/">
              <Image
                src="/images/GDPL_Logo_white2.png"
                alt="GDPL Logo"
                width={100}
                height={40}
                className="h-8 md:h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-4 md:gap-8 text-[10px] md:text-xs font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase text-white">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-[#D4AF37] transition-colors">Projects</Link>
            <Link href="/about" className="hover:text-[#D4AF37] transition-colors">About</Link>
            <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

    </>
  );
};

export default NavbarVex;
