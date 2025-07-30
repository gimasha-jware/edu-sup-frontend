
import { Filter, TrendingUp, MapPin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

interface FiltersSectionProps {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedAge: string;
  setSelectedAge: (age: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedInstitutionType: string;
  setSelectedInstitutionType: (type: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedStream: string;
  setSelectedStream: (stream: string) => void;
  userZScore: string;
  setUserZScore: (score: string) => void;
  resetFilters: () => void;
}

const FiltersSection = ({
  selectedLevel,
  setSelectedLevel,
  selectedAge,
  setSelectedAge,
  selectedCategory,
  setSelectedCategory,
  selectedInstitutionType,
  setSelectedInstitutionType,
  selectedLocation,
  setSelectedLocation,
  selectedStream,
  setSelectedStream,
  userZScore,
  setUserZScore,
  resetFilters
}: FiltersSectionProps) => {
  const { t } = useLanguage();

  const levels = ["O/L", "A/L", "University", "Vocational", "Part-time", "Online Courses", "Physical Courses"];
  const ageGroups = ["5-16", "8-16", "10-16", "10-18", "14-16", "16-18", "16-40", "16-45", "16-50", "18-25", "18-35", "Anyone"];
  const categories = [
    "Computer Science", "Engineering", "Medicine", "Law", "Mathematics", 
    "Business", "Arts", "Psychology", "Agriculture", "Technology", "Marketing",
    "Language", "Hospitality", "Beauty", "Automotive", "Fashion", "Music", "Sports"
  ];
  const institutionTypes = ["Government", "Private"];
  
  // Sri Lankan Districts/Locations
  const locations = [
    "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
    "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochhi", "Mannar",
    "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
    "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
    "Moneragala", "Ratnapura", "Kegalle"
  ];
  
  const streams = ["Physical Science", "Biological Science", "Commerce", "Arts", "Technology"];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-wrap items-center gap-4 justify-between mb-6">
        <div className="flex items-center gap-2 text-gray-700">
          <Filter className="h-5 w-5" />
          <span className="font-semibold text-lg">{t('filterCourses')}</span>
        </div>
        
        <Button variant="outline" onClick={resetFilters} className="hover:bg-gray-50">
          {t('clearFilters')}
        </Button>
      </div>

      {/* Quick Category Buttons */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          Quick Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={selectedLevel === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedLevel("all")}
          >
            All Courses
          </Button>
          <Button 
            variant={selectedLevel === "University" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedLevel("University")}
          >
            University Programs
          </Button>
          <Button 
            variant={selectedAge === "Anyone" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedAge("Anyone")}
          >
            Courses for Anyone
          </Button>
          <Button 
            variant={selectedAge === "5-16" || selectedAge === "8-16" || selectedAge === "10-16" || selectedAge === "10-18" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedAge("10-16")}
          >
            School Students
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger>
            <SelectValue placeholder={t('educationalLevel')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allLevels')}</SelectItem>
            {levels.map(level => (
              <SelectItem key={level} value={level}>{level}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedAge} onValueChange={setSelectedAge}>
          <SelectTrigger>
            <SelectValue placeholder={t('ageGroup')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allAges')}</SelectItem>
            {ageGroups.map(age => (
              <SelectItem key={age} value={age}>
                {age === "Anyone" ? "Anyone" : `${age} ${t('years')}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder={t('subjectCategory')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allCategories')}</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedInstitutionType} onValueChange={setSelectedInstitutionType}>
          <SelectTrigger>
            <SelectValue placeholder={t('institutionType')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allTypes')}</SelectItem>
            {institutionTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Location/District" />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto">
            <SelectItem value="all">All Districts</SelectItem>
            {locations.map(location => (
              <SelectItem key={location} value={location}>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  {location}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStream} onValueChange={setSelectedStream}>
          <SelectTrigger>
            <SelectValue placeholder="A/L Stream" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Streams</SelectItem>
            {streams.map(stream => (
              <SelectItem key={stream} value={stream}>{stream}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Enhanced Z-Score Section for Government University Applications */}
      <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-green-700">
            <TrendingUp className="h-5 w-5" />
            <span className="font-semibold">Government University Application - Z Score</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Z-Score
              </label>
              <Input
                type="number"
                step="0.0001"
                placeholder="Enter your Z-Score (e.g. 1.8542)"
                value={userZScore}
                onChange={(e) => setUserZScore(e.target.value)}
                className="border-green-300 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="mb-1">
                💡 <strong>Tip:</strong> Enter your Z-Score to see courses you're eligible for
              </p>
              <p className="text-xs text-gray-500">
                Courses will be filtered based on minimum Z-Score requirements
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;
