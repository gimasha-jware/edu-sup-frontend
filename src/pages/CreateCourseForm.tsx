import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  X,
  Upload,
  FileImage,
  Video,
  GraduationCap,
  Building,
  MapPin,
  Grip,
  Clock,
  DollarSign,
  User,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CourseFormData {
  title: string;
  description: string;
  sub_content: string;
  institute_type: string;
  category: string;
  course_duration: string;
  course_fee: string;
  install_availability: boolean;
  instructor: string;
  course_level: string;
  age_group: string;
  minimum_z_score: string;
  exam_board: string;
  streams: string[];
  locations: string[];
  education_modes: string[];
  media_files: File[];
}

interface ValidationErrors {
  [key: string]: string;
}

const CreateCourseForm = () => {
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    sub_content: "",
    institute_type: "",
    category: "",
    course_duration: "",
    course_fee: "",
    install_availability: false,
    instructor: "",
    course_level: "",
    age_group: "",
    minimum_z_score: "",
    exam_board: "",
    streams: [],
    locations: [],
    education_modes: [],
    media_files: [],
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newStream, setNewStream] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const { toast } = useToast();

  // Options for dropdowns
  const institutionTypes = [
    "University",
    "College",
    "Institute",
    "School",
    "Training Center",
  ];

  const categories = [
    "IT",
    "Engineering",
    "Business",
    "Medicine",
    "Arts",
    "Science",
    "Technology",
    "Management",
    "Education",
  ];

  const courseLevels = [
    "primary education",
    "junior education",
    "ordinary level",
    "advanced level",
    "certificate",
    "NVQ",
    "diploma",
    "higher national diploma",
    "degree",
    "masters",
    "PhD",
  ];

  const educationModeOptions = ["online", "onsite"];

  // Enhanced validation function based on backend requirements
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Required field validations (matching backend required_fields)
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.institute_type)
      newErrors.institute_type = "Institution type is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.course_level)
      newErrors.course_level = "Course level is required";

    // Course duration validation (must be positive integer)
    if (!formData.course_duration || !formData.course_duration.trim()) {
      newErrors.course_duration = "Course duration is required";
    } else {
      const duration = parseInt(formData.course_duration);
      if (isNaN(duration) || duration <= 0) {
        newErrors.course_duration =
          "Course duration must be a positive integer";
      }
    }

    // Course fee validation (must be positive number)
    if (!formData.course_fee || !formData.course_fee.trim()) {
      newErrors.course_fee = "Course fee is required";
    } else {
      const fee = parseFloat(formData.course_fee);
      if (isNaN(fee) || fee < 0) {
        newErrors.course_fee = "Course fee must be a positive number";
      }
    }

    // Education modes validation (at least one required)
    if (formData.education_modes.length === 0) {
      newErrors.education_modes = "At least one education mode is required";
    }

    // Z-Score validation (0-3 range if provided)
    if (formData.minimum_z_score && formData.minimum_z_score.trim()) {
      const zScore = parseFloat(formData.minimum_z_score);
      if (isNaN(zScore) || zScore < 0 || zScore > 3) {
        newErrors.minimum_z_score = "Z-Score must be between 0 and 3";
      }
    }

    // Media file validation (max 3 photos, 1 video based on backend)
    const imageFiles = formData.media_files.filter((file) =>
      file.type.startsWith("image/")
    );
    const videoFiles = formData.media_files.filter((file) =>
      file.type.startsWith("video/")
    );

    if (imageFiles.length > 3) {
      newErrors.media_files = "Maximum 3 photos allowed";
    }
    if (videoFiles.length > 1) {
      newErrors.media_files = "Maximum 1 video allowed";
    }

    // File size validation (50MB per file)
    const oversizedFiles = formData.media_files.filter(
      (file) => file.size > 50 * 1024 * 1024
    );
    if (oversizedFiles.length > 0) {
      newErrors.media_files = "Each file must be under 50MB";
    }

    // File type validation
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/avi",
      "video/mov",
    ];
    const invalidFiles = formData.media_files.filter(
      (file) => !allowedTypes.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      newErrors.media_files =
        "Only JPEG, PNG, GIF images and MP4, AVI, MOV videos are allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CourseFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addStream = () => {
    if (
      newStream.trim() &&
      !formData.streams.includes(newStream.trim().toLowerCase())
    ) {
      setFormData((prev) => ({
        ...prev,
        streams: [...prev.streams, newStream.trim().toLowerCase()],
      }));
      setNewStream("");
    }
  };

  const removeStream = (streamToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      streams: prev.streams.filter((stream) => stream !== streamToRemove),
    }));
  };

  const addLocation = () => {
    if (
      newLocation.trim() &&
      !formData.locations.includes(newLocation.trim().toLowerCase())
    ) {
      setFormData((prev) => ({
        ...prev,
        locations: [...prev.locations, newLocation.trim().toLowerCase()],
      }));
      setNewLocation("");
    }
  };

  const removeLocation = (locationToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      locations: prev.locations.filter(
        (location) => location !== locationToRemove
      ),
    }));
  };

  const handleEducationModeChange = (mode: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      education_modes: checked
        ? [...prev.education_modes, mode]
        : prev.education_modes.filter((m) => m !== mode),
    }));

    // Clear education mode error when user selects at least one
    if (checked && errors.education_modes) {
      setErrors((prev) => ({ ...prev, education_modes: "" }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    // Filter valid files based on backend requirements
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/avi",
      "video/mov",
    ];

    const validFiles = files.filter((file) => {
      return allowedTypes.includes(file.type) && file.size <= 50 * 1024 * 1024;
    });

    setFormData((prev) => ({
      ...prev,
      media_files: [...prev.media_files, ...validFiles],
    }));

    // Clear media file errors when user uploads valid files
    if (validFiles.length > 0 && errors.media_files) {
      setErrors((prev) => ({ ...prev, media_files: "" }));
    }
  };

  const removeMediaFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      media_files: prev.media_files.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(
        `[name="${firstErrorField}"]`
      );
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const formDataToSend = new FormData();

      // Add text fields (matching backend format)
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "media_files") return;

        if (Array.isArray(value)) {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (typeof value === "boolean") {
          formDataToSend.append(key, String(value));
        } else {
          formDataToSend.append(key, String(value));
        }
      });

      // Add media files
      formData.media_files.forEach((file) => {
        formDataToSend.append("media_files", file);
      });

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:5000/api/courses/add",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      toast({
        title: "✅ Course Created",
        description: "The course has been successfully created.",
      });

      setSuccess(true);
      // Reset form after successful submission
      setTimeout(() => {
        clearForm();
        setSuccess(false);
      }, 3000);
    } catch (error: any) {
      console.error("Course creation failed:", error);

      if (error.response?.data?.errors) {
        const backendErrors: ValidationErrors = {};
        error.response.data.errors.forEach((err: string) => {
          // Parse backend error messages
          if (err.includes("required")) {
            const fieldMatch = err.match(/'([^']+)'/);
            const field = fieldMatch ? fieldMatch[1] : "general";
            backendErrors[field] = err;
          } else if (err.includes("photos")) {
            backendErrors.media_files = err;
          } else if (err.includes("video")) {
            backendErrors.media_files = err;
          } else {
            backendErrors.general = err;
          }
        });
        setErrors(backendErrors);
      } else {
        setErrors({
          general:
            error.response?.data?.error || "An unexpected error occurred",
        });
      }
      toast({
        title: "❌ Error",
        description: "Failed to create course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({
      title: "",
      description: "",
      sub_content: "",
      institute_type: "",
      category: "",
      course_duration: "",
      course_fee: "",
      install_availability: false,
      instructor: "",
      course_level: "",
      age_group: "",
      minimum_z_score: "",
      exam_board: "",
      streams: [],
      locations: [],
      education_modes: [],
      media_files: [],
    });
    setErrors({});
  };

  // Helper function to get media file counts
  const getMediaCounts = () => {
    const images = formData.media_files.filter((f) =>
      f.type.startsWith("image/")
    ).length;
    const videos = formData.media_files.filter((f) =>
      f.type.startsWith("video/")
    ).length;
    return { images, videos };
  };

  const mediaCount = getMediaCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <GraduationCap className="h-6 w-6" />
              Create New Course
            </CardTitle>
            <CardDescription className="text-blue-100">
              Fill in the details to create a new course. Fields marked with *
              are required.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800 animate-fade-in">
                <CheckCircle className="h-5 w-5" />
                Course created successfully!
              </div>
            )}

            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
                <AlertCircle className="h-5 w-5" />
                {errors.general}
              </div>
            )}

            <div className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Basic Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Course Title *
                    </label>
                    <input
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Enter course title"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        errors.title
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Sub Content
                    </label>
                    <input
                      type="text"
                      value={formData.sub_content}
                      onChange={(e) =>
                        handleInputChange("sub_content", e.target.value)
                      }
                      placeholder="Brief subtitle or tagline"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Detailed course description"
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      errors.description
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Institution Type *
                    </label>
                    <select
                      name="institute_type"
                      value={formData.institute_type}
                      onChange={(e) =>
                        handleInputChange("institute_type", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        errors.institute_type
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <option value="">Select institution type</option>
                      {institutionTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.institute_type && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.institute_type}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        errors.category
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Course Level *
                    </label>
                    <select
                      name="course_level"
                      value={formData.course_level}
                      onChange={(e) =>
                        handleInputChange("course_level", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        errors.course_level
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <option value="">Select course level</option>
                      {courseLevels.map((level) => (
                        <option key={level} value={level}>
                          {level
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </option>
                      ))}
                    </select>
                    {errors.course_level && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.course_level}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Course Details
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Duration (months) *
                    </label>
                    <input
                      name="course_duration"
                      type="number"
                      min="1"
                      step="1"
                      value={formData.course_duration}
                      onChange={(e) =>
                        handleInputChange("course_duration", e.target.value)
                      }
                      placeholder="12"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        errors.course_duration
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    />
                    {errors.course_duration && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.course_duration}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Course Fee (Rs.) *
                    </label>
                    <input
                      name="course_fee"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.course_fee}
                      onChange={(e) =>
                        handleInputChange("course_fee", e.target.value)
                      }
                      placeholder="50000"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        errors.course_fee
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    />
                    {errors.course_fee && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.course_fee}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Age Group
                    </label>
                    <input
                      type="text"
                      value={formData.age_group}
                      onChange={(e) =>
                        handleInputChange("age_group", e.target.value)
                      }
                      placeholder="18-25"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Instructor
                    </label>
                    <input
                      type="text"
                      value={formData.instructor}
                      onChange={(e) =>
                        handleInputChange("instructor", e.target.value)
                      }
                      placeholder="Dr. John Smith"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Minimum Z-Score
                    </label>
                    <input
                      name="minimum_z_score"
                      type="number"
                      min="0"
                      max="3"
                      step="0.01"
                      value={formData.minimum_z_score}
                      onChange={(e) =>
                        handleInputChange("minimum_z_score", e.target.value)
                      }
                      placeholder="1.50"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        errors.minimum_z_score
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    />
                    {errors.minimum_z_score && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.minimum_z_score}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Exam Board
                    </label>
                    <input
                      type="text"
                      value={formData.exam_board}
                      onChange={(e) =>
                        handleInputChange("exam_board", e.target.value)
                      }
                      placeholder="Cambridge, Edexcel, etc."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Installment Available
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        handleInputChange(
                          "install_availability",
                          !formData.install_availability
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        formData.install_availability
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          formData.install_availability
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Education Modes */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  Education Modes *
                </h3>
                <div className="flex flex-wrap gap-2">
                  {educationModeOptions.map((mode) => (
                    <label
                      key={mode}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition-all duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={formData.education_modes.includes(mode)}
                        onChange={(e) =>
                          handleEducationModeChange(mode, e.target.checked)
                        }
                        className="mr-2"
                      />
                      {mode}
                    </label>
                  ))}
                </div>
              </div>

              {/* Streams */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Grip className="h-5 w-5 text-blue-600" />
                  Required Streams
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newStream}
                    onChange={(e) => setNewStream(e.target.value)}
                    placeholder="Add stream (e.g., Physical Science)"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addStream())
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition-all duration-200"
                  />
                  <Button
                    onClick={addStream}
                    variant="outline"
                    className="px-4 py-3"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.streams.map((stream) => (
                    <Badge
                      key={stream}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1 hover:bg-gray-200 transition-colors duration-200"
                    >
                      {stream}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                        onClick={() => removeStream(stream)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Course Locations
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="Add location (e.g., Colombo)"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addLocation())
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 
                               hover:border-gray-400 transition-all duration-200"
                  />
                  <Button
                    onClick={addLocation}
                    variant="outline"
                    className="px-4 py-3"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.locations.map((location) => (
                    <Badge
                      key={location}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1 hover:bg-gray-200 
                                 transition-colors duration-200"
                    >
                      {location}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                        onClick={() => removeLocation(location)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Media Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Upload className="h-5 w-5 text-blue-600" />
                  Upload Media (max 3 images, 1 video)
                </h3>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-600"
                />
                {errors.media_files && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.media_files}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {formData.media_files.map((file, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-2 px-3 py-1"
                    >
                      {file.type.startsWith("image/") ? (
                        <FileImage className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Video className="h-4 w-4 text-purple-600" />
                      )}
                      <span className="truncate max-w-[120px]">
                        {file.name}
                      </span>
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                        onClick={() => removeMediaFile(index)}
                      />
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  {mediaCount.images} images, {mediaCount.videos} video selected
                </p>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-4">
                <Button
                  onClick={clearForm}
                  variant="outline"
                  disabled={loading}
                >
                  Clear
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? "Submitting..." : "Create Course"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateCourseForm;
