import { useLanguageStore } from '../store/authStore';
import { en } from '../i18n/en';
import { hi } from '../i18n/hi';
import { mr } from '../i18n/mr';
import type { Language } from '@sahay/shared';

export function useLanguage() {
  const { language, setLanguage } = useLanguageStore();

  const t = language === 'hi' ? hi : language === 'mr' ? mr : en;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : language === 'hi' ? 'mr' : 'en');
  };

  return {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isHindi: language === 'hi' || language === 'mr',
    isHindiOnly: language === 'hi',
    isMarathi: language === 'mr',
  };
}
