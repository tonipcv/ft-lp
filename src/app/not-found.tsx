'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { OptimizedImage } from '@/components/OptimizedImage';

export default function NotFound() {
  const [redirected, setRedirected] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const whatsappLink = "https://wa.me/557391778075";

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!redirected) {
      setRedirected(true);
      window.location.href = whatsappLink;
    }
  }, [countdown, redirected, whatsappLink]);

  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      <header className="fixed top-0 w-full bg-[#111]/90 backdrop-blur-sm z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <OptimizedImage src="/ft-icone.png" alt="Futuros Tech Logo" width={40} height={40} />
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-6">Página não encontrada</h1>
            <div className="flex flex-col items-center justify-center mb-8">
              <p className="text-xl mb-6">Redirecionando para WhatsApp em:</p>
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-white/5 rounded-full blur-md"></div>
                <div className="text-5xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent w-24 h-24 flex items-center justify-center rounded-full border-2 border-white/20">
                  {countdown}
                </div>
              </div>
            </div>
            <p className="text-sm mb-8">Se não for redirecionado automaticamente, clique no botão abaixo:</p>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 text-lg font-medium text-black bg-white rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              ACESSAR WHATSAPP →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
} 