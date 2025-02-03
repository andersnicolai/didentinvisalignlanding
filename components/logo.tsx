"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LOGO_PATHS = {
  static: '/images/logo/DiDent-logo-A1-e1733310238845.jpg',
  video: 'https://storage.googleapis.com/msgsndr/7zGDabJudfn9AdfzT6N5/media/679020f16debad5c0a33f9d6.mp4'
} as const;

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      href="/" 
      className="relative block w-[180px] h-[60px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full">
        {/* Statisk logo som alltid er synlig */}
        <Image
          src={LOGO_PATHS.static}
          alt="DiDent Logo"
          fill
          className={`object-contain transition-opacity duration-300 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          priority
        />
        
        {/* Video logo som vises på hover */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={LOGO_PATHS.video} type="video/mp4" />
        </video>
      </div>
    </Link>
  );
} 