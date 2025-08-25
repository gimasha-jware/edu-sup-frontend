import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  MapPin,
  Award,
  TrendingUp,
  BookOpen,
  Calendar,
  User,
  Building,
  GraduationCap,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Image as ImageIcon,
  Video,
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

// Import backend
const backendUrl = import.meta.env.BACKEND_URL;
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
const CourseDetails = () => {
  const MediaCarousel = ({ mediaItems }: { mediaItems: MediaItem[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-rotate images every 3 seconds
    useEffect(() => {
      if (!mediaItems || mediaItems.length === 0) return;

      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = (prev + 1) % mediaItems.length;
          const currentMedia = mediaItems[nextIndex];
          const isVideo =
            currentMedia?.media_type === "mp4" ||
            currentMedia?.media_type === "mov" ||
            currentMedia?.media_type === "avi";

          // Skip auto-rotation for videos
          if (isVideo) return prev;
          return nextIndex;
        });
      }, 3000);

      return () => clearInterval(interval);
    }, [mediaItems]);

    // Default image as base64 SVG
    const defaultImageSrc =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNkZGY0ZmYiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI2VkZTlmZSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2Y5ZjVmZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0MDAsIDE1MCkiPjxyZWN0IHg9Ii00MCIgeT0iLTMwIiB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHJ4PSI4IiBmaWxsPSIjYjNiZmNjIi8+PHBhdGggZD0iTTAgMGwxNiAxNmgtMzJsMTYtMTZ6IiBmaWxsPSIjOWNhM2FmIi8+PGNpcmNsZSBjeD0iMTUiIGN5PSItMTAiIHI9IjQiIGZpbGw9IiNmZmI0MDAiLz48L2c+PHRleHQgeD0iNTAlIiB5PSI2NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzY4NzQ4MSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q291cnNlIEltYWdlPC90ZXh0Pjwvc3ZnPg==";

    if (!mediaItems || mediaItems.length === 0) {
      return (
        <div className="h-64 overflow-hidden rounded-t-lg">
          <img
            src={defaultImageSrc}
            alt="Default course image"
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    const currentMedia = mediaItems[currentIndex];
    const isVideo =
      currentMedia?.media_type === "mp4" ||
      currentMedia?.media_type === "mov" ||
      currentMedia?.media_type === "avi";

    const handleNext = () => {
      setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    };

    const handlePrev = () => {
      setCurrentIndex(
        (prev) => (prev - 1 + mediaItems.length) % mediaItems.length
      );
    };
    return (
      <div className="relative h-64 overflow-hidden rounded-t-lg">
        {isVideo ? (
          <video
            src={`http://127.0.0.1:5000/media/${currentMedia.media_url.replace(
              /\\/g,
              "/"
            )}`}
            className="w-full h-full object-cover"
            poster={defaultImageSrc}
            muted
          />
        ) : (
          <img
            src={`http://127.0.0.1:5000/media/${currentMedia.media_url.replace(
              /\\/g,
              "/"
            )}`}
            alt="Course media"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultImageSrc;
            }}
          />
        )}

        {/* Navigation Arrows */}
        {mediaItems.length > 1 && (
          <>
            <Button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
          </>
        )}

        {/* Media Indicators */}
        {mediaItems.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Badges Overlay */}
        {course && (
          <>
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge
                variant="secondary"
                className="bg-white/90 border-black text-gray-800 capitalize"
              >
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
                  {course.streams}
                </Badge>
              )}
            </div>

            {course.ageGroup && (
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-orange-600 text-white">
                  {course.ageGroup} years
                </Badge>
              </div>
            )}
          </>
        )}

        {/* Media Type Badge */}
        {/* <div className="absolute top-2 left-2">
        <Badge variant="secondary" className="bg-white/90 text-gray-800">
          {isVideo ? "Video" : "Image"} {currentIndex + 1}/{mediaItems.length}
        </Badge>
      </div> */}
      </div>
    );
  };

  const MediaGallery = ({ mediaItems }: { mediaItems: MediaItem[] }) => {
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);

    // Default image as base64 SVG
    const defaultImageSrc =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQyIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZGRmNGZmIi8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNlZGU5ZmUiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmOWY1ZmYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQyKSIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMCwgMTAwKSI+PHJlY3QgeD0iLTIwIiB5PSItMTUiIHdpZHRoPSI0MCIgaGVpZ2h0PSIzMCIgcng9IjQiIGZpbGw9IiNiM2JmY2MiLz48cGF0aCBkPSJNIDAgMCBsIDggOCBoIC0xNiBsIDggLTggeiIgZmlsbD0iIzljYTNhZiIvPjxjaXJjbGUgY3g9IjgiIGN5PSItNSIgcj0iMiIgZmlsbD0iI2ZmYjQwMCIvPjwvZz48L3N2Zz4=";

    const images =
      mediaItems?.filter(
        (item) =>
          item.media_type == "png" ||
          item.media_type == "jpg" ||
          item.media_type == "jpeg" ||
          item.media_type == "gif"
      ) || [];
    const videos =
      mediaItems?.filter(
        (item) =>
          item.media_type === "mp4" ||
          item.media_type === "mov" ||
          item.media_type === "avi"
      ) || [];

    const handleVideoPlay = (video: MediaItem) => {
      setSelectedVideo(video);
      setShowVideoModal(true);
    };

    const closeVideoModal = () => {
      setShowVideoModal(false);
      setSelectedVideo(null);
    };

    if (!mediaItems || mediaItems.length === 0) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Course Media
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={defaultImageSrc}
                  alt="Default course image"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <span className="text-gray-600 text-sm">
                    No media available
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Highlights
              </div>
              <div className="flex gap-2">
                {images.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {images.length} {images.length === 1 ? "Image" : "Images"}
                  </Badge>
                )}
                {videos.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {videos.length} {videos.length === 1 ? "Video" : "Videos"}
                  </Badge>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {/* Display Images */}
              {images.map((media, index) => (
                <div
                  key={`img-${media.id}`}
                  className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                >
                  <img
                    src={`http://127.0.0.1:5000/media/${media.media_url.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt={`Course media ${index + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = defaultImageSrc;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors">
                    <div className="absolute top-2 left-2">
                      <Badge
                        variant="secondary"
                        className="bg-white/90 text-gray-800 text-xs"
                      >
                        <ImageIcon className="h-3 w-3 mr-1" />
                        Image
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}

              {/* Display Videos */}
              {videos.map((media, index) => (
                <div
                  key={`vid-${media.id}`}
                  className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => handleVideoPlay(media)}
                >
                  <video
                    src={`http://127.0.0.1:5000/media/${media.media_url.replace(
                      /\\/g,
                      "/"
                    )}`}
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-gray-800 text-xs"
                    >
                      <Video className="h-3 w-3 mr-1" />
                      Video
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Video Modal */}
        {showVideoModal && selectedVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh]">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Course Video</h3>
                <Button
                  onClick={closeVideoModal}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative aspect-video">
                <video
                  src={`http://127.0.0.1:5000/media/${selectedVideo.media_url.replace(
                    /\\/g,
                    "/"
                  )}`}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://127.0.0.1:5000/api/courses/find/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCourse(mapCourseData(res.data));
      } catch (error: any) {
        if (error.response?.status === 404) {
          setError("Course not found");
        } else {
          console.log("error", error);
          setError("Failed to fetch course");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-red-500 text-lg">{error}</p>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (!course) return null;

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
              <MediaCarousel mediaItems={course.mediaItems} />

              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                      {course.title}
                    </CardTitle>
                    {course.subContent && (
                      <CardDescription className="text-lg text-gray-600 mb-4">
                        {course.subContent}
                      </CardDescription>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-600 capitalize">
                      {course.locations && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{course.locations}</span>
                        </div>
                      )}
                      {course.educationModes && (
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{course.educationModes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">
                      Rs. {course.courseFee.toLocaleString()}
                    </p>

                    <Badge
                      className={`${
                        course.installAvailability
                          ? "bg-green-600"
                          : "bg-red-600"
                      } text-white mt-2`}
                    >
                      {course.installAvailability
                        ? "Installments Available"
                        : "No Installments"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Media Gallery */}
            <MediaGallery mediaItems={course.mediaItems} />

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
                        <p className="text-gray-600">
                          {course.courseDuration} months
                        </p>
                      </div>
                    </div>
                    {course.instructor && (
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Instructor</p>
                          <p className="text-gray-600">{course.instructor}</p>
                        </div>
                      </div>
                    )}
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
                        <p className="text-gray-600">
                          {course.institutionType}
                        </p>
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
                    {course.educationModes && (
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Education Modes</p>
                          <p className="text-gray-600 capitalize">
                            {course.educationModes}
                          </p>
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
                    {course.description}
                  </p>
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
                  <p className="text-3xl font-bold text-blue-600">
                    Rs. {course.courseFee.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {course.installAvailability
                      ? "Installments Available"
                      : "No Installments"}
                  </p>
                </div>

                {course.minimumZScore && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">
                        Z-Score Requirement
                      </span>
                    </div>
                    <p className="text-blue-700">
                      Minimum Z-Score: {course.minimumZScore}
                    </p>
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
                {course.ageGroup && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age Group:</span>
                    <span className="font-medium">{course.ageGroup} years</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Course Level:</span>
                  <span className="font-medium capitalize">
                    {course.courseLevel.replace("_", " ")}
                  </span>
                </div>
                {course.locations && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium capitalize">
                      {course.locations}
                    </span>
                  </div>
                )}
                {course.streams && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Streams:</span>
                    <span className="font-medium capitalize">
                      {course.streams}
                    </span>
                  </div>
                )}
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
