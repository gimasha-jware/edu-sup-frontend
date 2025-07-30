
import React from 'react';
import { Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: t('english'), flag: '🇺🇸' },
    { code: 'si', name: t('sinhala'), flag: '🇱🇰' },
    { code: 'ta', name: t('tamil'), flag: '🇱🇰' }
  ];

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-white" />
      <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'si' | 'ta')}>
        <SelectTrigger className="w-auto border-white/20 bg-white/10 text-white hover:bg-white/20">
          <SelectValue placeholder={t('selectLanguage')} />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
