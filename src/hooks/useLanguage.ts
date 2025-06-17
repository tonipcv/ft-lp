import { useState, useEffect } from 'react';

export function useLanguage() {
  const [language, setLanguage] = useState('pt');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language.toLowerCase();
      setLanguage(browserLang.startsWith('pt') ? 'pt' : 'en');
    }
  }, []);

  return language;
} 