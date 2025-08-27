import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'header.title': 'Bharat Krishi Guru',
    'header.subtitle': 'Digital Farming Companion',
    'header.signin': 'Sign In',
    'header.signup': 'Sign Up',
    'header.dashboard': 'Dashboard',
    
    // Hero
    'hero.title': 'Bharat Krishi Guru',
    'hero.subtitle': 'Your Digital Farming Companion',
    'hero.description': 'AI-powered crop disease detection, multilingual farming assistant, weather recommendations, and market insights - all in your local language',
    'hero.detectDisease': 'Detect Crop Disease',
    'hero.askAI': 'Ask AI Assistant',
    
    // Features
    'features.diseaseDetection': 'Disease Detection',
    'features.diseaseDesc': 'Upload crop images for instant AI diagnosis',
    'features.multilingualAssistant': 'Multilingual Assistant',
    'features.assistantDesc': 'Voice & text support in your language',
    'features.smartRecommendations': 'Smart Recommendations',
    'features.recommendationsDesc': 'Weather-based farming guidance',
    
    // Common
    'common.loading': 'Loading...',
    'common.refresh': 'Refresh',
    'common.signOut': 'Sign Out',
  },
  hi: {
    // Header
    'header.title': 'भारत कृषि गुरु',
    'header.subtitle': 'कृषि का डिजिटल साथी',
    'header.signin': 'साइन इन',
    'header.signup': 'साइन अप',
    'header.dashboard': 'डैशबोर्ड',
    
    // Hero
    'hero.title': 'भारत कृषि गुरु',
    'hero.subtitle': 'आपका डिजिटल कृषि साथी',
    'hero.description': 'AI-संचालित फसल रोग पहचान, बहुभाषी कृषि सहायक, मौसम सिफारिशें, और बाजार की जानकारी - सब आपकी स्थानीय भाषा में',
    'hero.detectDisease': 'फसल रोग की पहचान करें',
    'hero.askAI': 'AI सहायक से पूछें',
    
    // Features
    'features.diseaseDetection': 'रोग पहचान',
    'features.diseaseDesc': 'तुरंत AI निदान के लिए फसल की तस्वीरें अपलोड करें',
    'features.multilingualAssistant': 'बहुभाषी सहायक',
    'features.assistantDesc': 'आपकी भाषा में आवाज और टेक्स्ट सहायता',
    'features.smartRecommendations': 'स्मार्ट सिफारिशें',
    'features.recommendationsDesc': 'मौसम आधारित कृषि मार्गदर्शन',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.refresh': 'रीफ्रेश करें',
    'common.signOut': 'साइन आउट',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};