
import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroSection from "@/components/HeroSection";
import FiltersSection from "@/components/FiltersSection";
import CourseGrid from "@/components/CourseGrid";
import Footer from "@/components/Footer";
import ZScoreLookup from "@/components/ZScoreLookup";
import { mockCourses } from "@/data/mockCourses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  ageGroup: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  instructor: string;
  category: string;
  image: string;
  institutionType: string;
  location: string;
  universityRank?: number;
  examBoard?: string;
  zScore?: number;
  stream?: string;
  universityName?: string;
  courseCode?: string;
}

const Index = () => {
  const { t } = useLanguage();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedAge, setSelectedAge] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedInstitutionType, setSelectedInstitutionType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedStream, setSelectedStream] = useState("all");
  const [userZScore, setUserZScore] = useState("");

  const filteredCourses = useMemo(() => {

    return mockCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
      
      // Enhanced age matching - handle "Anyone" category and school students
      const matchesAge = selectedAge === "all" || 
                        course.ageGroup === selectedAge ||
                        (selectedAge === "Anyone" && (course.ageGroup.includes("16-") || course.ageGroup.includes("18-"))) ||
                        (selectedAge === "10-16" && (course.ageGroup === "5-16" || course.ageGroup === "8-16" || course.ageGroup === "10-16" || course.ageGroup === "10-18"));
      
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
      const matchesInstitutionType = selectedInstitutionType === "all" || course.institutionType === selectedInstitutionType;
      const matchesLocation = selectedLocation === "all" || course.location === selectedLocation;
      const matchesStream = selectedStream === "all" || course.stream === selectedStream;
      
      // Enhanced Z-Score filtering - only filter university courses with Z-Score requirements
      const matchesZScore = !userZScore || 
                           !course.zScore || 
                           parseFloat(userZScore) >= course.zScore;
      
      // console.log(`Filtering course ${course.title}:`, {
      //   matchesSearch,
      //   matchesLevel,
      //   matchesAge,
      //   matchesCategory,
      //   matchesInstitutionType,
      //   matchesLocation,
      //   matchesStream,
      //   matchesZScore
      // });
      
      return matchesSearch && matchesLevel && matchesAge && matchesCategory && 
             matchesInstitutionType && matchesLocation && matchesStream && matchesZScore;
    });
  }, [searchTerm, selectedLevel, selectedAge, selectedCategory, selectedInstitutionType, selectedLocation, selectedStream, userZScore]);

  const resetFilters = () => {
    setSelectedLevel("all");
    setSelectedAge("all");
    setSelectedCategory("all");
    setSelectedInstitutionType("all");
    setSelectedLocation("all");
    setSelectedStream("all");
    setSearchTerm("");
    setUserZScore("");
  };

  // Count courses by category for quick stats
  const universityCoursesCount = mockCourses.filter(c => c.level === "University").length;
  const schoolCoursesCount = mockCourses.filter(c => 
    c.ageGroup === "5-16" || c.ageGroup === "8-16" || c.ageGroup === "10-16" || c.ageGroup === "10-18"
  ).length;
  const anyoneCoursesCount = mockCourses.filter(c => 
    c.ageGroup.includes("16-") || c.ageGroup.includes("18-")
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">

      <Navbar />
      <HeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{universityCoursesCount}</div>
              <div className="text-sm text-gray-600">University Programs</div>
              <div className="text-xs text-gray-500 mt-1">Government & Private</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{schoolCoursesCount}</div>
              <div className="text-sm text-gray-600">School Student Courses</div>
              <div className="text-xs text-gray-500 mt-1">O/L, A/L & Part-time</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{anyoneCoursesCount}</div>
              <div className="text-sm text-gray-600">Courses for Anyone</div>
              <div className="text-xs text-gray-500 mt-1">Vocational & Professional</div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="courses">Browse Courses</TabsTrigger>
            <TabsTrigger value="zscore">Z-Score Lookup</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="space-y-6">
            <FiltersSection
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              selectedAge={selectedAge}
              setSelectedAge={setSelectedAge}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedInstitutionType={selectedInstitutionType}
              setSelectedInstitutionType={setSelectedInstitutionType}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedStream={selectedStream}
              setSelectedStream={setSelectedStream}
              userZScore={userZScore}
              setUserZScore={setUserZScore}
              resetFilters={resetFilters}
            />

            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {filteredCourses.length} {filteredCourses.length === 1 ? t('course') : t('coursesFound')}
                </h2>
                {userZScore && (
                  <div className="text-sm text-green-600 mt-1">
                    Showing courses for Z-Score: {userZScore} and above
                  </div>
                )}
              </div>
              
              {filteredCourses.length > 0 && (
                <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border">
                  {selectedLevel !== "all" && `${selectedLevel} • `}
                  {selectedAge !== "all" && `${selectedAge === "Anyone" ? "Anyone" : selectedAge + " years"} • `}
                  {selectedLocation !== "all" && `${selectedLocation} • `}
                  All Matches
                </div>
              )}
            </div>

            <CourseGrid 
              courses={filteredCourses} 
              userZScore={userZScore} 
              resetFilters={resetFilters} 
            />
          </TabsContent>
          
          <TabsContent value="zscore">
            <ZScoreLookup />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
