"use client";

import { useState } from "react";
import { Globe, Apple, PlaySquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Download() {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');

  return (
    <div className="font-montserrat bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-zinc-950/80 backdrop-blur-sm z-50 border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="Futuros Tech"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
          
          <button
            onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <Globe className="h-3 w-3" />
            {language.toUpperCase()}
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-light mb-16 tracking-wider bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
          {language === 'pt' ? 'Faça o Download do App' : 'Download the App'}
        </h1>

        <div className="grid md:grid-cols-2 gap-12 w-full max-w-2xl">
          {/* App Store Card */}
          <a 
            href="https://apps.apple.com/br/app/fip/id6738362588"
            className="group flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-8 hover:border-zinc-600 transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Apple className="w-12 h-12 mb-4 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            <span className="text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors">
              App Store
            </span>
          </a>

          {/* Android APK Download */}
          <a 
            href="/futurostech-v1.apk"
            className="group flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-8 hover:border-zinc-600 transition-all duration-300"
            download
          >
            <PlaySquare className="w-12 h-12 mb-4 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            <span className="text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors">
              Android
            </span>
          </a>
        </div>

        <p className="text-xs text-zinc-600 mt-16">
          © {new Date().getFullYear()} Futuros Tech
        </p>
      </div>
    </div>
  );
} 