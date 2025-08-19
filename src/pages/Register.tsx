import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import API from "@/api";
import { loginWithGoogle } from "@/services/auth";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    user_type: "student", // Default user type
  });
  const { toast } = useToast();
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      toast({
        title: "Passwords do not match",
        description: "Please make sure both password fields are identical.",
        variant: "destructive",
      });
      return;
    }

    if (Object.values(formData).some(field => field.trim() === "")) {
      setMessage("Please fill in all required fields.");
      toast({
        title: "Registration Failed",
        description: "All fields are required.",
        variant: "destructive",
      });
      return;
    }
    setMessage(""); // Clear previous messages
    console.log("Registering with data:", formData);

    try {
      const response = await API.post("/api/auth/register", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        user_type: formData.user_type,
      });

      console.log("Signup Response:", response.data);
      setMessage("Account Created Successfully");
      
      toast({
        title: "Account Created Successfully",
        description: "Welcome to Sri Lankan Educational Revolution! Please check your email to verify your account.",
      });
    } catch (error: any) {
      console.error("Registration Error:", error);
      setMessage("Registration Failed");
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Registration Failed.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const user = await loginWithGoogle(); // backend will auto-create user if new
      localStorage.setItem("user", JSON.stringify(user));

      toast({
        title: "Account Created Successfully",
        description: `Welcome, ${user.name || "User"}!`,
      });

      window.location.href = "/";
    } catch (error: any) {
      console.error("Google register failed:", error);
      toast({
        title: "Google Registration Failed",
        description: error.message || "Something went wrong with Google sign up.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl"></div>
      
      {/* Header */}
      <div className="absolute top-8 left-8">
        <Link to="/" className="text-white text-xl font-bold hover:text-white/90 transition-colors">
          Sri Lankan Educational Revolution
        </Link>
      </div>

      {/* Language Selector */}
      <div className="absolute top-8 right-8">
        <div className="flex items-center gap-2 text-white/80 text-sm">
          <span>🌐</span>
          <span>English</span>
        </div>
      </div>

      {/* Signup Card */}
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-glow relative z-10">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Join the Revolution
          </CardTitle>
          <CardDescription className="text-base">
            Create your account to access courses
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="h-12 text-base border-gray-200 focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="h-12 text-base border-gray-200 focus:border-primary focus:ring-primary"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="h-12 text-base border-gray-200 focus:border-primary focus:ring-primary"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                className="h-12 text-base border-gray-200 focus:border-primary focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="h-12 text-base border-gray-200 focus:border-primary focus:ring-primary"
                required
              />
            </div>

            <div className="flex items-start space-x-2">
              <input type="checkbox" className="mt-1 rounded border-gray-300" required />
              <label className="text-xs text-gray-600 leading-relaxed">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full h-12 text-base font-semibold">
              Create Account
            </Button>
            {message && (
              <div className="mt-4 text-center text-sm text-gray-600">
                {message}
              </div>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 text-center">
          <Button
            type="button"
            onClick={handleGoogleRegister}
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>
          <div className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
              Sign In
            </Link>
          </div>
          
          <div className="text-xs text-gray-500">
            Join thousands of students advancing their education
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;