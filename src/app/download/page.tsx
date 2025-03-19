"use client";

import { useState } from "react";
import { Globe, X } from "lucide-react";
import Link from "next/link";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";

export default function Download() {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [showModal, setShowModal] = useState(false);

  const handleAndroidClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleDownload = () => {
    window.location.href = "https://drive.google.com/file/d/1WO-_Y6lbJ47gbzzaBvLBWfRmq1D1ZJ5x/view?usp=sharing";
    setShowModal(false);
  };

  return (
    <div className="font-montserrat bg-black text-white min-h-screen flex flex-col items-center justify-center">
      {/* Minimal Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <OptimizedImage
              src="/logo.jpg"
              alt="Futuros Tech"
              width={32}
              height={32}
              className="rounded-full"
              priority
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

      <div className="w-full max-w-md mx-auto px-4 flex flex-col items-center justify-center space-y-12">
        {/* App Store Download */}
        <a 
          href="https://apps.apple.com/br/app/fip/id6738362588"
          className="w-full flex justify-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <OptimizedImage
            src="/apple.png"
            alt="App Store"
            width={180}
            height={60}
            className="w-auto h-14 hover:opacity-80 transition-opacity"
            priority
          />
        </a>

        {/* Android APK Download */}
        <button 
          onClick={handleAndroidClick}
          className="w-full flex justify-center"
        >
          <OptimizedImage
            src="/google.png"
            alt="Google Play"
            width={180}
            height={60}
            className="w-auto h-14 hover:opacity-80 transition-opacity"
            priority
          />
        </button>

        <p className="text-xs text-zinc-600 mt-8">
          © {new Date().getFullYear()} Futuros Tech
        </p>
      </div>

      {/* Simplified Installation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 max-w-sm w-full p-6 relative rounded-lg">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4 text-sm text-zinc-300 mt-4">
              <p>
                {language === 'pt' 
                  ? 'Clique no botão abaixo para baixar o app'
                  : 'Click the button below to download the app'}
              </p>
            </div>

            <Button
              onClick={handleDownload}
              className="mt-6 w-full bg-zinc-800 hover:bg-zinc-700 text-white border-none"
            >
              {language === 'pt' ? 'Download' : 'Download'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 