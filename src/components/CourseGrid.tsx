import { BookOpen, Clock, Users, Star, Award, MapPin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

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
}

interface CourseGridProps {
  courses: Course[];
  userZScore: string;
  resetFilters: () => void;
}

const CourseGrid = ({ courses, userZScore, resetFilters }: CourseGridProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleCourseClick = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  if (courses.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('noCourses')}</h3>
        <p className="text-gray-500 mb-4">{t('noCoursesDesc')}</p>
        <Button onClick={resetFilters} variant="outline">
          {t('clearFilters')}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card 
          key={course.id} 
          className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
          onClick={() => handleCourseClick(course.id)}
        >
          <div className="relative h-48 overflow-hidden">
            <img 
              src={`https://images.unsplash.com/${course.image}?w=400&h=200&fit=crop`}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant="secondary" className="bg-white/90 text-gray-800">
                {course.level}
              </Badge>
              <Badge variant="secondary" className={`${course.institutionType === 'Government' ? 'bg-green-600' : 'bg-blue-600'} text-white`}>
                {course.institutionType}
              </Badge>
              {course.stream && (
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  {course.stream}
                </Badge>
              )}
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-orange-600 text-white">
                {course.ageGroup} years
              </Badge>
            </div>
            {course.universityRank && (
              <div className="absolute bottom-4 left-4">
                <Badge variant="secondary" className="bg-yellow-500 text-white flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  Rank #{course.universityRank}
                </Badge>
              </div>
            )}
            {course.zScore && (
              <div className="absolute bottom-4 right-4">
                <Badge variant="secondary" className="bg-red-600 text-white flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Z: {course.zScore}
                </Badge>
              </div>
            )}
          </div>
          
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start mb-2">
              <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {course.title}
              </CardTitle>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium text-gray-700">{course.rating}</span>
              </div>
            </div>
            <CardDescription className="text-gray-600 line-clamp-2">
              {course.description}
            </CardDescription>
            {course.zScore && userZScore && (
              <div className="mt-2">
                {parseFloat(userZScore) >= course.zScore ? (
                  <Badge className="bg-green-100 text-green-800 border-green-300">
                    {t('eligible')}
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800 border-red-300">
                    {t('notEligible')}
                  </Badge>
                )}
              </div>
            )}
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{course.location}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">{course.instructor}</p>
                  <div className="flex gap-1 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {course.category}
                    </Badge>
                    {course.examBoard && (
                      <Badge variant="outline" className="text-xs">
                        {course.examBoard}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">Rs. {course.price.toLocaleString()}</p>
                  <Button 
                    className="mt-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCourseClick(course.id);
                    }}
                  >
                    {t('applyNow')}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CourseGrid;
