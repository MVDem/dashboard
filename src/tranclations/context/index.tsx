import { createContext, useEffect, useState } from 'react';
import {
  AppLanguages,
  ITranslationContext,
  Language,
  TranslationProviderProps,
} from '../types';

export const TranslateContext = createContext<ITranslationContext>({});

export default function TranslateProvider({
  languages,
  userLanguage,
  children,
}: TranslationProviderProps) {
  const currentPage = 'home';
  const [language, setLanguage] = useState<Language>(languages[userLanguage]);
  const [selectedLanguage, setSelectedLanguage] =
    useState<AppLanguages>(userLanguage);

  useEffect(() => {
    setLanguage(languages[selectedLanguage]);
  }, [selectedLanguage]);

  return (
    <TranslateContext.Provider
      value={{
        language,
        setSelectedLanguage,
        page: currentPage,
        selectedLanguage,
      }}
    >
      {children}
    </TranslateContext.Provider>
  );
}
