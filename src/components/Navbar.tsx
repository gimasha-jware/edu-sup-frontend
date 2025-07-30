import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";

const Navbar = () => {
  return (
    <nav className="relative z-30 bg-white text-[hsl(var(--foreground))] border-b border-[hsl(var(--border))] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-[hsl(var(--primary))]">EduSriLanka</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#courses" className="hover:text-[hsl(var(--primary))] transition-colors">Courses</a>
            <a href="#universities" className="hover:text-[hsl(var(--primary))] transition-colors">Universities</a>
            <a href="#about" className="hover:text-[hsl(var(--primary))] transition-colors">About</a>
            <a href="#contact" className="hover:text-[hsl(var(--primary))] transition-colors">Contact</a>
          </div>

          {/* Language Selector + Auth Buttons */}
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Link to="/login">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button
                size="sm"
                className="bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary-glow))] transition-colors"
              >
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
