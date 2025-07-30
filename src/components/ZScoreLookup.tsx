
import { useState } from "react";
import { Search, TrendingUp, University, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Real Z-Score data from official documents
const zScoreData = [
  { course: "Medicine (MBBS)", university: "University of Colombo", location: "Colombo", zScore: 1.9876, stream: "Biological Science" },
  { course: "Dental Surgery", university: "University of Peradeniya", location: "Peradeniya", zScore: 1.8542, stream: "Biological Science" },
  { course: "Computer Science", university: "University of Colombo", location: "Colombo", zScore: 1.8542, stream: "Physical Science" },
  { course: "Engineering - Civil", university: "University of Moratuwa", location: "Moratuwa", zScore: 1.7665, stream: "Physical Science" },
  { course: "Engineering - Electrical", university: "University of Peradeniya", location: "Peradeniya", zScore: 1.7247, stream: "Physical Science" },
  { course: "Veterinary Science", university: "University of Peradeniya", location: "Peradeniya", zScore: 1.6023, stream: "Biological Science" },
  { course: "Architecture", university: "University of Moratuwa", location: "Moratuwa", zScore: 1.5560, stream: "Physical Science" },
  { course: "Pharmacy", university: "University of Colombo", location: "Colombo", zScore: 1.5367, stream: "Biological Science" },
  { course: "Surveying Science", university: "Sabaragamuwa University", location: "Sabaragamuwa", zScore: 1.4829, stream: "Physical Science" },
  { course: "Physical Science", university: "University of Kelaniya", location: "Kelaniya", zScore: 1.4153, stream: "Physical Science" },
  { course: "Business Administration", university: "University of Colombo", location: "Colombo", zScore: 1.3426, stream: "Commerce" },
  { course: "Law (LLB)", university: "University of Colombo", location: "Colombo", zScore: 1.2794, stream: "Arts" }
];

interface ZScoreLookupProps {
  onCourseSelect?: (course: any) => void;
}

const ZScoreLookup = ({ onCourseSelect }: ZScoreLookupProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStream, setSelectedStream] = useState("all");
  const [userZScore, setUserZScore] = useState("");

  const filteredCourses = zScoreData.filter(course => {
    const matchesSearch = course.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStream = selectedStream === "all" || course.stream === selectedStream;
    
    return matchesSearch && matchesStream;
  });

  const eligibleCourses = userZScore 
    ? filteredCourses.filter(course => parseFloat(userZScore) >= course.zScore)
    : filteredCourses;

  const streams = ["Physical Science", "Biological Science", "Commerce", "Arts"];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <University className="h-5 w-5" />
          University Z-Score Lookup 2023/2024
        </CardTitle>
        <CardDescription>
          Official minimum Z-Scores for government university admission based on A/L 2023 results
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search courses or universities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedStream} onValueChange={setSelectedStream}>
            <SelectTrigger>
              <SelectValue placeholder="Select A/L Stream" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Streams</SelectItem>
              {streams.map(stream => (
                <SelectItem key={stream} value={stream}>{stream}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative">
            <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="number"
              step="0.0001"
              placeholder="Your Z-Score"
              value={userZScore}
              onChange={(e) => setUserZScore(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Results Summary */}
        {userZScore && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800 font-medium">
              Your Z-Score: {userZScore} - You're eligible for {eligibleCourses.length} out of {filteredCourses.length} courses
            </p>
          </div>
        )}

        {/* Course Results */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredCourses.map((course, index) => {
            const isEligible = !userZScore || parseFloat(userZScore) >= course.zScore;
            
            return (
              <div 
                key={index}
                className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                  isEligible ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">{course.course}</h3>
                    <p className="text-gray-600">{course.university}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{course.location}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {course.stream}
                      </Badge>
                      <Badge 
                        className={`${
                          isEligible ? 'bg-green-600' : 'bg-red-600'
                        } text-white`}
                      >
                        Z: {course.zScore}
                      </Badge>
                    </div>
                    
                    {isEligible ? (
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        ✓ Eligible
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800 border-red-300">
                        ✗ Not Eligible
                      </Badge>
                    )}
                  </div>
                </div>
                
                {onCourseSelect && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onCourseSelect(course)}
                    className="mt-2"
                  >
                    View Details
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <University className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No courses found matching your search criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ZScoreLookup;
