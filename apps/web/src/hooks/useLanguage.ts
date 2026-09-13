import { useLanguageStore } from '../store/authStore';
import { en } from '../i18n/en';
import { hi } from '../i18n/hi';
import type { Language } from '@sahay/shared';

export function useLanguage() {
  const { language, setLanguage } = useLanguageStore();

  const t = language === 'hi' ? hi : en;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isHindi: language === 'hi',
  };
}
