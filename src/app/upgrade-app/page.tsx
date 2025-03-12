'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OptimizedImage } from '@/components/OptimizedImage';
import { PandaPlayer } from '@/components/PandaPlayer';
import { PricingSection } from '@/components/pricing/PricingSection';

export default function InformacaoClient() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

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

  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      <header className="fixed top-0 w-full bg-[#111]/90 backdrop-blur-sm z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <OptimizedImage src="/ft-icone.png" alt="Futuros Tech Logo" width={40} height={40} />
          </Link>
          
          <a 
            href="https://t.me/+tOj6h-B6rrM0MDYx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 text-black bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            Entrar no Grupo
          </a>
        </div>
      </header>

      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light">
              <span className="text-neutral-200">Somente com uma Operação</span>
              <div className="mt-4">
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent font-medium">
                    você pode fazer o{' '}
                  </span>
                  <span className="relative inline-block group">
                    <span className="bg-gradient-to-r from-white via-neutral-100 to-white bg-clip-text text-transparent font-semibold">
                      Dobro do Investimento
                    </span>
                    <div className="absolute -bottom-1 left-0 w-full h-[1px]">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white to-white/40 animate-pulse" />
                    </div>
                    <div className="absolute -inset-1 bg-white/5 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </span>
                </span>
              </div>
            </h2>
          </div>

          <div className="bg-black rounded-2xl overflow-hidden mb-12 shadow-xl">
            <div className="relative pb-[56.25%]">
              <PandaPlayer videoId="6a82bc71-be86-4d83-be38-99cf230e7298" />
            </div>
          </div>

          <div className="relative mt-12 mb-16">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-out" 
                style={{ 
                  transform: `translateX(-${currentTestimonial * (windowWidth <= 768 ? 50 : 33.333)}%)`
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div 
                    key={num} 
                    className="w-1/2 md:w-1/3 flex-shrink-0 px-2"
                  >
                    <div className="relative rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={`/depoimento${num}.webp`}
                        alt={`Depoimento ${num}`}
                        width={400}
                        height={300}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-medium bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent">
              Faça o seu upgrade agora ou aguarde o desconto
            </h2>
          </div>

          <PricingSection />
        </div>
      </main>
    </div>
  );
}