import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import API from "@/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await API.post("/api/auth/login", { email, password });
        console.log("Login Response:", response.data);

        localStorage.setItem("token", response.data.token); // Store token in local storage
        localStorage.setItem("refresh_token", response.data.refresh_token); // Store refresh token
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data
        
        setMessage("Login Successful");
        toast({
          title: "Login Successful",
          description: "Welcome back to Sri Lankan Educational Revolution!",
        });

        // Redirect to home or dashboard page
        window.location.href = "/";

      } catch (error : any) {
        setMessage("Login Failed");
        toast({
          title: "Login Failed",
          description: error.response?.data?.message || error.response?.data?.error || "Login Failed.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter both email and password.",
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

      {/* Login Card */}
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-glow relative z-10">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base">
            Sign in to your account to continue learning
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-base border-gray-200 focus:border-primary focus:ring-primary"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full h-12 text-base font-semibold">
              Sign In
            </Button>
            {message && (
              <div className="mt-4 text-center text-sm text-gray-600">
                {message}
              </div>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 text-center">
          <div className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:text-primary/80 transition-colors">
              Create Account
            </Link>
          </div>
          
          <div className="text-xs text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;