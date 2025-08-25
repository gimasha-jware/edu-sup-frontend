import {
  BookOpen,
  Clock,
  Users,
  Star,
  Award,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface MediaItem {
  id: number;
  course_id: number;
  media_type: string;
  media_url: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  subContent: string | null;
  institutionType: string;
  category: string;
  courseDuration: number;
  courseFee: number;
  installAvailability: boolean;
  instructor: string | null;
  courseLevel: string;
  streams: string;
  locations: string;
  educationModes: string;
  ageGroup: string | null;
  minimumZScore: string | null;
  examBoard: string | null;
  mediaItems: MediaItem[];
  createdAt: string | null;
  updatedAt: string | null;
}

const mapCourseData = (data: any): Course => ({
  id: data.id,
  title: data.title,
  description: data.description,
  subContent: data.sub_content,
  institutionType: data.institute_type,
  category: data.category,
  courseDuration: data.course_duration,
  courseFee: data.course_fee,
  installAvailability: data.install_availability,
  instructor: data.instructor,
  courseLevel: data.course_level,
  streams: data.streams?.join(", ") || "",
  locations: data.locations?.join(", ") || "",
  educationModes: data.education_modes?.join(", ") || "",
  ageGroup: data.age_group,
  minimumZScore: data.minimum_z_score,
  examBoard: data.exam_board,
  mediaItems: data.media_items || [],
  createdAt: data.created_at,
  updatedAt: data.updated_at,
});

interface CourseGridProps {
  courses: Course[];
  userZScore: string;
  resetFilters: () => void;
}

const CourseGrid = () => {
  const { t } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const userZScore = localStorage.getItem("user_zscore") || "";

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://127.0.0.1:5000/api/courses/active", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data.map(mapCourseData));
    } catch (err: any) {
      setError("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const resetFilters = () => {
    fetchCourses();
  };

  const handleCourseClick = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  // Image Rotator Component
  const CourseImageRotator: React.FC<{ course: Course }> = ({ course }) => {
    const images = course.mediaItems.filter(
      (item) =>
        item.media_type == "png" ||
        item.media_type == "jpg" ||
        item.media_type == "jpeg" ||
        item.media_type == "gif"
    );

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (images.length > 1) {
        const interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000); // rotate every 3 seconds
        return () => clearInterval(interval);
      }
    }, [images.length]);

    if (images.length === 0) {
      return (
        <img
          src="https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg"
          alt={course.title}
          className="w-full h-full object-cover"
        />
      );
    }

    return (
      <img
        src={`http://127.0.0.1:5000/media/${images[
          currentIndex
        ].media_url.replace("\\", "/")}`}
        alt={course.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    );
  };

  if (courses.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          {t("noCourses")}
        </h3>
        <p className="text-gray-500 mb-4">{t("noCoursesDesc")}</p>
        <Button onClick={resetFilters} variant="outline">
          {t("clearFilters")}
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
            <CourseImageRotator course={course} />
            <div className="absolute top-4 left-4 flex gap-2 capitalize">
              <Badge variant="secondary" className="bg-white/90 text-gray-800">
                {course.courseLevel.replace("_", " ")}
              </Badge>
              <Badge
                variant="secondary"
                className={`${
                  course.institutionType === "University"
                    ? "bg-green-600"
                    : "bg-blue-600"
                } text-white`}
              >
                {course.institutionType}
              </Badge>
              {course.streams && (
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  {course.streams.split(", ")[0]}
                  {course.streams.split(", ").length > 1 && " ..."}
                </Badge>
              )}
              {course.ageGroup && (
                <Badge variant="secondary" className="bg-orange-600 text-white">
                  {course.ageGroup} years
                </Badge>
              )}
            </div>
            {course.minimumZScore && (
              <div className="absolute bottom-4 right-4">
                <Badge
                  variant="secondary"
                  className="bg-red-600 text-white flex items-center gap-1"
                >
                  <TrendingUp className="h-3 w-3" />
                  Z: {course.minimumZScore}
                </Badge>
              </div>
            )}
          </div>

          <CardHeader className="pb-3">
            <div className="flex justify-between items-start mb-2">
              <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {course.title}
              </CardTitle>
            </div>
            <CardDescription className="text-gray-600 line-clamp-2">
              {course.subContent}
            </CardDescription>
            {course.minimumZScore && userZScore && (
              <div className="mt-2">
                {parseFloat(userZScore) >= parseFloat(course.minimumZScore) ? (
                  <Badge className="bg-green-100 text-green-800 border-green-300">
                    {t("eligible")}
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800 border-red-300">
                    {t("notEligible")}
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
                  <span>{course.courseDuration} months</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{course.locations}</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {course.instructor}
                  </p>
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
                  <p className="text-2xl font-bold text-blue-600">
                    Rs. {course.courseFee.toLocaleString()}
                  </p>
                  <Button
                    className="mt-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCourseClick(course.id);
                    }}
                  >
                    {t("applyNow")}
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
