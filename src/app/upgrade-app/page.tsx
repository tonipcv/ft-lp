'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OptimizedImage } from '@/components/OptimizedImage';
import { PandaPlayer } from '@/components/PandaPlayer';
import { PricingSection } from '@/components/pricing/PricingSection';
import { useRouter } from 'next/navigation';
import { translations } from '@/translations/terms';
import { useLanguage } from '@/hooks/useLanguage';

export default function InformacaoClient() {
  const router = useRouter();
  const language = useLanguage();
  const t = translations[language as keyof typeof translations];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [redirected, setRedirected] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const whatsappLink = "https://wa.me/5511976650763?text=Olá%20quero%20acesso%20aos%206%20novos%20sinais%20de%20entradas%20de%20criptomoedas%20de%20hoje!";

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
          
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 text-black bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            {t.accessSignals}
          </a>
        </div>
      </header>

      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex flex-col items-center justify-center mb-8">
              <p className="text-xl mb-6">{t.redirectingText}</p>
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-white/5 rounded-full blur-md"></div>
                <div className="text-5xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent w-24 h-24 flex items-center justify-center rounded-full border-2 border-white/20">
                  {countdown}
                </div>
              </div>
            </div>
            <p className="text-sm mb-8">{t.clickText}</p>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 text-lg font-medium text-black bg-white rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {t.accessButton}
            </a>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full bg-[#111]/90 backdrop-blur-sm z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
            {t.footerLink}
          </Link>
        </div>
      </footer>
    </div>
  );
}