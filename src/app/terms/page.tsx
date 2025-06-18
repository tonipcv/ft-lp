'use client';

import React from 'react';
import Link from 'next/link';
import { OptimizedImage } from '@/components/OptimizedImage';
import { translations } from '@/translations/terms';
import { useLanguage } from '@/hooks/useLanguage';

export default function Terms() {
  const language = useLanguage();
  const t = translations[language as keyof typeof translations];

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
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-sm text-neutral-400 mb-8">{t.lastUpdate}</p>
          
          <div className="prose prose-invert max-w-none">
            <div className="bg-white/5 p-6 rounded-lg mb-8">
              <div className="whitespace-pre-wrap font-light text-sm leading-relaxed">
                {t.content}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 