"use client";

import { useState } from "react";
import Image from "next/image";
import { Globe, ChevronRight } from "lucide-react";
import * as fbq from '@/lib/fpixel';

export default function Quiz() {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    capital: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track the form submission
    fbq.event('Lead', {
      content_name: 'quiz_submission',
      currency: 'BRL',
      value: 0
    });

    // Redirect to the promotional page
    window.location.href = '/desconto';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="font-montserrat bg-black text-white min-h-screen">
      {/* Language Selector */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
          className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <Globe className="h-3 w-3" />
          {language.toUpperCase()}
        </button>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Área de Membros Link */}
          <div className="flex justify-end mb-4">
            <a
              href="https://ai.futurostech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
            >
              {language === 'pt' ? 'Área VIP' : 'VIP Area'}
              <ChevronRight className="h-3 w-3" />
            </a>
          </div>

          <Image
            src="/logo.jpg"
            alt="Futuros Tech"
            width={120}
            height={120}
            className="mx-auto mb-12"
          />
          
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 border border-green-500/20 rounded-2xl p-8">
              <span className="inline-block px-4 py-1 bg-green-500/10 text-green-400 text-sm rounded-full border border-green-500/20 mb-6">
                {language === 'pt' ? 'Curso 100% Gratuito' : 'Free Course'}
              </span>
              
              <h2 className="text-2xl font-light mb-6 text-white/90">
                {language === 'pt' 
                  ? '10.000% de Valorização no Mercado de Criptomoedas Começando do Zero' 
                  : '10.000% of Cryptocurrency Market Value Starting from Zero'}
              </h2>
            </div>
          </div>

          <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-lg p-8">
            <h3 className="text-xl font-light mb-6 text-center text-white/90">
              {language === 'pt'
                ? 'Preencha seus dados para receber acesso'
                : 'Fill in your details to receive access'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={language === 'pt' ? "Seu nome completo" : "Your full name"}
                    required
                    className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={language === 'pt' ? "Seu melhor e-mail" : "Your best email"}
                    required
                    className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder={language === 'pt' ? "Seu WhatsApp" : "Your WhatsApp"}
                    required
                    className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="capital"
                    value={formData.capital}
                    onChange={handleInputChange}
                    placeholder={language === 'pt' ? "Capital para investir" : "Investment capital"}
                    required
                    className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full relative overflow-hidden group bg-black border border-green-500/20 text-green-400 font-medium rounded-lg px-6 py-3 text-sm transition-all duration-300
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-500/10 before:via-green-500/20 before:to-green-500/10 
                before:translate-x-[-100%] before:hover:translate-x-0 before:transition-transform before:duration-300
                hover:border-green-500/40 hover:text-green-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]"
              >
                <span className="relative z-10">
                  {language === 'pt' 
                    ? 'Receber Acesso ao Curso Gratuito' 
                    : 'Get Free Course Access'}
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,197,94,0.1),transparent_70%)]"></div>
                </div>
              </button>
            </form>
          </div>

          <p className="text-xs text-neutral-500 mt-6 mb-16 max-w-md mx-auto">
            {language === 'pt'
              ? 'Seus dados estão seguros e você receberá o acesso ao curso imediatamente após o cadastro.'
              : 'Your data is secure and you will receive course access immediately after registration.'}
          </p>

          {/* Nova seção de Potenciais */}
          <div className="mt-20">
            <h3 className="text-3xl font-light mb-12 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
              {language === 'pt' 
                ? 'Potencial de Valorização das Criptomoedas' 
                : 'Cryptocurrency Growth Potential'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Bitcoin Card */}
              <div className="group bg-gradient-to-b from-black to-black border border-white/10 rounded-lg p-6 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-light text-white/80">Bitcoin</span>
                  <span className="text-white font-medium">+480%</span>
                </div>
                <div className="relative h-32 bg-gradient-to-r from-white/5 to-transparent rounded-lg overflow-hidden flex items-center justify-center group-hover:from-white/10 group-hover:to-transparent transition-all duration-300">
                  <svg className="w-full h-20 text-white/10" viewBox="0 0 100 30">
                    <path
                      d="M0 30 Q 25 0 50 20 T 100 10 L 100 30 L 0 30"
                      fill="currentColor"
                      className="group-hover:text-white/20 transition-all duration-300"
                    />
                  </svg>
                </div>
                <p className="text-sm text-neutral-400 mt-4">
                  {language === 'pt'
                    ? 'Previsão para 2024-2025'
                    : 'Forecast for 2024-2025'}
                </p>
              </div>

              {/* Ethereum Card */}
              <div className="group bg-gradient-to-b from-black to-black border border-white/10 rounded-lg p-6 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-light text-white/80">Ethereum</span>
                  <span className="text-white font-medium">+380%</span>
                </div>
                <div className="relative h-32 bg-gradient-to-r from-white/5 to-transparent rounded-lg overflow-hidden flex items-center justify-center group-hover:from-white/10 group-hover:to-transparent transition-all duration-300">
                  <svg className="w-full h-20 text-white/10" viewBox="0 0 100 30">
                    <path
                      d="M0 30 Q 35 10 50 25 T 100 15 L 100 30 L 0 30"
                      fill="currentColor"
                      className="group-hover:text-white/20 transition-all duration-300"
                    />
                  </svg>
                </div>
                <p className="text-sm text-neutral-400 mt-4">
                  {language === 'pt'
                    ? 'Previsão para 2024-2025'
                    : 'Forecast for 2024-2025'}
                </p>
              </div>

              {/* Altcoins Card */}
              <div className="group bg-gradient-to-b from-black to-black border border-white/10 rounded-lg p-6 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-light text-white/80">Altcoins</span>
                  <span className="text-white font-medium">+1200%</span>
                </div>
                <div className="relative h-32 bg-gradient-to-r from-white/5 to-transparent rounded-lg overflow-hidden flex items-center justify-center group-hover:from-white/10 group-hover:to-transparent transition-all duration-300">
                  <svg className="w-full h-20 text-white/10" viewBox="0 0 100 30">
                    <path
                      d="M0 30 Q 15 5 50 15 T 100 5 L 100 30 L 0 30"
                      fill="currentColor"
                      className="group-hover:text-white/20 transition-all duration-300"
                    />
                  </svg>
                </div>
                <p className="text-sm text-neutral-400 mt-4">
                  {language === 'pt'
                    ? 'Potencial médio das principais altcoins'
                    : 'Average potential of major altcoins'}
                </p>
              </div>
            </div>

            <p className="text-sm text-neutral-400 mt-8 max-w-2xl mx-auto bg-gradient-to-r from-white/5 via-white/10 to-white/5 p-4 rounded-lg border border-white/10">
              {language === 'pt'
                ? 'Projeções baseadas em análises técnicas e fundamentalistas. Resultados passados não garantem ganhos futuros.'
                : 'Projections based on technical and fundamental analysis. Past results do not guarantee future gains.'}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center bg-black">
        <p className="text-neutral-500 text-xs">
          Futuros Tech - Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}
