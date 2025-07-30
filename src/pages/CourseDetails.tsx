
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Users, Star, MapPin, Award, TrendingUp, BookOpen, Calendar, User, Building, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

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

const mockCourses: Course[] = [
  {
    id: 1,
    title: "Computer Science & Engineering",
    description: "Comprehensive computer science program covering algorithms, data structures, and software engineering.",
    level: "University",
    ageGroup: "18-25",
    duration: "4 years",
    students: 2400,
    rating: 4.9,
    price: 15000,
    instructor: "Prof. Sarah Chen",
    category: "Computer Science",
    image: "photo-1461749280684-dccba630e2f6",
    institutionType: "Government",
    location: "Colombo",
    universityRank: 1,
    examBoard: "UGC Sri Lanka",
    zScore: 1.8542,
    stream: "Physical Science"
  },
  {
    id: 2,
    title: "Medicine (MBBS)",
    description: "Bachelor of Medicine and Bachelor of Surgery - Premier medical degree program.",
    level: "University",
    ageGroup: "18-25",
    duration: "5 years",
    students: 856,
    rating: 4.9,
    price: 25000,
    instructor: "Dr. Michael Rodriguez",
    category: "Medicine",
    image: "photo-1559757148-5c350d0d3c56",
    institutionType: "Government",
    location: "Colombo",
    universityRank: 1,
    examBoard: "UGC Sri Lanka",
    zScore: 1.9876,
    stream: "Biological Science"
  },
  {
    id: 3,
    title: "Engineering Technology",
    description: "Practical engineering course focusing on IT, mechanical, and electrical engineering fundamentals.",
    level: "O/L",
    ageGroup: "14-16",
    duration: "2 years",
    students: 1200,
    rating: 4.7,
    price: 5500,
    instructor: "Eng. Lisa Park",
    category: "Engineering",
    image: "photo-1581091226825-a6a2a5aee158",
    institutionType: "Government",
    location: "Kandy",
    examBoard: "Department of Education"
  }
];

const CourseDetails = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const course = mockCourses.find(c => c.id === parseInt(id || "0"));

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Button 
            onClick={() => navigate("/")} 
            variant="ghost" 
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <Card>
              <div className="relative h-64 overflow-hidden rounded-t-lg">
                <img 
                  src={`https://images.unsplash.com/${course.image}?w=800&h=300&fit=crop`}
                  alt={course.title}
                  className="w-full h-full object-cover"
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
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600 mb-4">
                      {course.description}
                    </CardDescription>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{course.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">Rs. {course.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">per year</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Course Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Course Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Duration</p>
                        <p className="text-gray-600">{course.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Instructor</p>
                        <p className="text-gray-600">{course.instructor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Category</p>
                        <p className="text-gray-600">{course.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Institution Type</p>
                        <p className="text-gray-600">{course.institutionType}</p>
                      </div>
                    </div>
                    {course.examBoard && (
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Exam Board</p>
                          <p className="text-gray-600">{course.examBoard}</p>
                        </div>
                      </div>
                    )}
                    {course.universityRank && (
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">University Rank</p>
                          <p className="text-gray-600">#{course.universityRank}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>About This Course</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    This comprehensive {course.level.toLowerCase()} program is designed to provide students with 
                    in-depth knowledge and practical skills in {course.category.toLowerCase()}. 
                    Our experienced faculty and state-of-the-art facilities ensure that students receive 
                    the highest quality education.
                  </p>
                  <h4 className="font-semibold mt-4 mb-2">What You'll Learn:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Fundamental concepts and theories</li>
                    <li>Practical applications and hands-on experience</li>
                    <li>Industry-relevant skills and knowledge</li>
                    <li>Professional development and career preparation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card>
              <CardHeader>
                <CardTitle>Enroll Now</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">Rs. {course.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">per year</p>
                </div>
                
                {course.zScore && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Z-Score Requirement</span>
                    </div>
                    <p className="text-blue-700">Minimum Z-Score: {course.zScore}</p>
                  </div>
                )}
                
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                  Apply Now
                </Button>
                <Button variant="outline" className="w-full">
                  Download Brochure
                </Button>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Age Group:</span>
                  <span className="font-medium">{course.ageGroup} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Students Enrolled:</span>
                  <span className="font-medium">{course.students.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{course.location}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  Contact Admissions
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Visit
                </Button>
                <Button variant="outline" className="w-full">
                  Live Chat Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
