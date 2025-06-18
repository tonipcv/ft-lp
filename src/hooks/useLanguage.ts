import { useState, useEffect } from 'react';

type Language = 'pt' | 'en';

export function useLanguage(): Language {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language.toLowerCase();
      setLanguage(browserLang.startsWith('pt') ? 'pt' : 'en');
    }
  }, []);

  return language;
} 