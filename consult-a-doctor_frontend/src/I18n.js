import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ArabicTranslation from './translations/arabicTranslation';
import EnglishTranslation from './translations/englishTranslation';



i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: {
        translation:{
          lang: EnglishTranslation
        }
      },
      ar: {
        translation: {
          lang: ArabicTranslation
        }
      }
    }
  });

export default i18n;
