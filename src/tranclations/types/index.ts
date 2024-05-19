export type AppLanguages = 'EN' | 'HE';

export type LanguageDir = string | 'ltr' | 'rtl';

export interface ITranslationContext {
  language?: Language;
  page?: string;
  setSelectedLanguage?: (language: AppLanguages) => void;
  selectedLanguage?: AppLanguages;
}

export interface TranslationProviderProps {
  languages: Languages;
  userLanguage: AppLanguages;
  children: React.ReactNode;
}

export interface Languages {
  [key: string]: Language;
}

export interface Language {
  dir: LanguageDir;
  pages?: Pages;
}

export interface Pages {
  [key: string]: Page;
}

export interface Page {
  [key: string]: Block;
}

export interface Block {
  [key: string]: string;
}

export interface Config {
  default: AppLanguages;
  languages: Languages;
}
