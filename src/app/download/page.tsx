"use client";

import { useState } from "react";
import { Globe, Apple, PlaySquare, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
          <button 
            onClick={handleAndroidClick}
            className="group flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-8 hover:border-zinc-600 transition-all duration-300"
          >
            <PlaySquare className="w-12 h-12 mb-4 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            <span className="text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors">
              Android
            </span>
          </button>
        </div>

        <p className="text-xs text-zinc-600 mt-16">
          © {new Date().getFullYear()} Futuros Tech
        </p>
      </div>

      {/* Installation Tutorial Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-lg w-full p-6 relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-light mb-6">
              {language === 'pt' ? 'Como instalar o app' : 'How to install the app'}
            </h3>

            <div className="space-y-4 text-sm text-zinc-300">
              <p>
                {language === 'pt' 
                  ? '1. Clique no botão de download abaixo'
                  : '1. Click the download button below'}
              </p>
              <p>
                {language === 'pt'
                  ? '2. Ao baixar o arquivo APK, você receberá um aviso de segurança. Isso é normal, pois o app não está na Play Store'
                  : '2. When downloading the APK file, you will receive a security warning. This is normal as the app is not on the Play Store'}
              </p>
              <p>
                {language === 'pt'
                  ? '3. Nas configurações do seu Android, permita a instalação de apps de fontes desconhecidas'
                  : '3. In your Android settings, allow installation of apps from unknown sources'}
              </p>
              <p>
                {language === 'pt'
                  ? '4. Abra o arquivo APK baixado e siga as instruções de instalação'
                  : '4. Open the downloaded APK file and follow the installation instructions'}
              </p>
            </div>

            <button
              onClick={handleDownload}
              className="mt-8 w-full bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg px-6 py-3 text-sm hover:bg-green-500/20 transition-colors"
            >
              {language === 'pt' ? 'Fazer Download' : 'Download'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 