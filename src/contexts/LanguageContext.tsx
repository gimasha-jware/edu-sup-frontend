
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'si' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    title: "Sri Lankan Educational Revolution",
    subtitle: "Discover courses from O/L to University level - Government & Private Institutions",
    searchPlaceholder: "Search courses, universities, subjects...",
    courses: "Courses",
    students: "Students",
    topRanked: "Top Ranked Universities",
    govPrivate: "Government & Private",
    zScoreSelection: "Z-Score Selection",
    
    // Filters
    filterCourses: "Filter Courses",
    clearFilters: "Clear All Filters",
    educationalLevel: "Educational Level",
    ageGroup: "Age Group",
    subjectCategory: "Subject Category",
    institutionType: "Institution Type",
    location: "Location",
    alStream: "A/L Stream",
    yourZScore: "Your Z-Score (Optional)",
    zScorePlaceholder: "Enter your Z-Score (e.g., 1.5000)",
    zScoreHelper: "Enter your Z-Score to see eligible university courses",
    
    // Common
    allLevels: "All Levels",
    allAges: "All Ages",
    allCategories: "All Categories",
    allTypes: "All Types",
    allLocations: "All Locations",
    allStreams: "All Streams",
    years: "years",
    
    // Course details
    eligible: "✓ Eligible - Your Z-Score qualifies!",
    notEligible: "✗ Not Eligible - Z-Score too low",
    applyNow: "Apply Now",
    
    // Results
    coursesFound: "Courses Found",
    course: "Course",
    showingCourses: "Showing courses for Z-Score:",
    noCourses: "No courses found",
    noCoursesDesc: "Try adjusting your search criteria or filters",
    
    // Language selector
    selectLanguage: "Select Language",
    english: "English",
    sinhala: "සිංහල",
    tamil: "தமிழ்"
  },
  si: {
    // Header
    title: "ශ්‍රී ලංකාවේ අධ්‍යාපන විප්ලවය",
    subtitle: "සා.පො.ස සිට විශ්වවිද්‍යාල මට්ටම දක්වා පාඨමාලා සොයා ගන්න - රජයේ සහ පෞද්ගලික ආයතන",
    searchPlaceholder: "පාඨමාලා, විශ්වවිද්‍යාල, විෂයයන් සොයන්න...",
    courses: "පාඨමාලා",
    students: "සිසුන්",
    topRanked: "ඉහළම ශ්‍රේණිගත විශ්වවිද්‍යාල",
    govPrivate: "රජයේ සහ පෞද්ගලික",
    zScoreSelection: "Z-ලකුණු තේරීම",
    
    // Filters
    filterCourses: "පාඨමාලා පෙරීම",
    clearFilters: "සියලු පෙරණයන් ඉවත් කරන්න",
    educationalLevel: "අධ්‍යාපන මට්ටම",
    ageGroup: "වයස් කණ්ඩායම",
    subjectCategory: "විෂය ප්‍රවර්ගය",
    institutionType: "ආයතන වර්ගය",
    location: "ස්ථානය",
    alStream: "උ.පෙළ ධාරාව",
    yourZScore: "ඔබේ Z-ලකුණු (විකල්ප)",
    zScorePlaceholder: "ඔබේ Z-ලකුණු ඇතුළත් කරන්න (උදා., 1.5000)",
    zScoreHelper: "සුදුසුකම් ලැබෙන විශ්වවිද්‍යාල පාඨමාලා බැලීමට ඔබේ Z-ලකුණු ඇතුළත් කරන්න",
    
    // Common
    allLevels: "සියලු මට්ටම්",
    allAges: "සියලු වයස්",
    allCategories: "සියලු ප්‍රවර්ග",
    allTypes: "සියලු වර්ග",
    allLocations: "සියලු ස්ථාන",
    allStreams: "සියලු ධාරා",
    years: "වර්ෂ",
    
    // Course details
    eligible: "✓ සුදුසුයි - ඔබේ Z-ලකුණු සුදුසුකම් ලබයි!",
    notEligible: "✗ සුදුසු නැත - Z-ලකුණු ඉතා අඩුයි",
    applyNow: "දැන් අයදුම් කරන්න",
    
    // Results
    coursesFound: "පාඨමාලා හමු විය",
    course: "පාඨමාලාව",
    showingCourses: "Z-ලකුණු සඳහා පාඨමාලා පෙන්වමින්:",
    noCourses: "පාඨමාලා හමු නොවිය",
    noCoursesDesc: "ඔබේ සෙවීම් නිර්ණායක හෝ පෙරණයන් සකස් කිරීමට උත්සාහ කරන්න",
    
    // Language selector
    selectLanguage: "භාෂාව තෝරන්න",
    english: "English",
    sinhala: "සිංහල",
    tamil: "தமிழ்"
  },
  ta: {
    // Header
    title: "இலங்கை கல்விப் புரட்சி",
    subtitle: "சாதாரண தரம் முதல் பல்கலைக்கழக அளவு வரை பாடநெறிகளைக் கண்டறியுங்கள் - அரசு மற்றும் தனியார் நிறுவனங்கள்",
    searchPlaceholder: "பாடநெறிகள், பல்கலைக்கழகங்கள், பாடங்களைத் தேடுங்கள்...",
    courses: "பாடநெறிகள்",
    students: "மாணவர்கள்",
    topRanked: "உயர் தரப்படுத்தப்பட்ட பல்கலைக்கழகங்கள்",
    govPrivate: "அரசு மற்றும் தனியார்",
    zScoreSelection: "Z-மதிப்பெண் தேர்வு",
    
    // Filters
    filterCourses: "பாடநெறிகளை வடிகட்டுக",
    clearFilters: "எல்லா வடிகட்டிகளையும் அழிக்கவும்",
    educationalLevel: "கல்வி நிலை",
    ageGroup: "வயது குழு",
    subjectCategory: "பாட வகை",
    institutionType: "நிறுவன வகை",
    location: "இடம்",
    alStream: "உயர்தர பிரிவு",
    yourZScore: "உங்கள் Z-மதிப்பெண் (விருப்பமானது)",
    zScorePlaceholder: "உங்கள் Z-மதிப்பெண்ணை உள்ளிடவும் (எ.கா., 1.5000)",
    zScoreHelper: "தகுதியான பல்கலைக்கழக பாடநெறிகளைப் பார்க்க உங்கள் Z-மதிப்பெண்ணை உள்ளிடவும்",
    
    // Common
    allLevels: "எல்லா நிலைகள்",
    allAges: "எல்லா வயதினர்",
    allCategories: "எல்லா வகைகள்",
    allTypes: "எல்லா வகைகள்",
    allLocations: "எல்லா இடங்கள்",
    allStreams: "எல்லா பிரிவுகள்",
    years: "ஆண்டுகள்",
    
    // Course details
    eligible: "✓ தகுதியானது - உங்கள் Z-மதிப்பெண் தகுதி பெறுகிறது!",
    notEligible: "✗ தகுதியற்றது - Z-மதிப்பெண் மிக குறைவு",
    applyNow: "இப்போது விண்ணப்பிக்கவும்",
    
    // Results
    coursesFound: "பாடநெறிகள் கண்டறியப்பட்டன",
    course: "பாடநெறி",
    showingCourses: "Z-மதிப்பெண்ணுக்கான பாடநெறிகளைக் காட்டுகிறது:",
    noCourses: "பாடநெறிகள் இல்லை",
    noCoursesDesc: "உங்கள் தேடல் அளவுகோல்கள் அல்லது வடிகட்டிகளை சரிசெய்ய முயற்சிக்கவும்",
    
    // Language selector
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    english: "English",
    sinhala: "සිංහල",
    tamil: "தமிழ்"
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
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
