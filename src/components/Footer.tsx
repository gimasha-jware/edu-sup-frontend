
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">EduSearch Sri Lanka</h3>
            <p className="text-gray-400">Comprehensive education platform covering O/L, A/L, University, Vocational Training, and Part-time courses for all ages.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Academic Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Computer Science & IT</li>
              <li>Engineering & Technology</li>
              <li>Medicine & Health</li>
              <li>Law & Legal Studies</li>
              <li>Business & Management</li>
              <li>Arts & Creative</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Vocational Training</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Digital Marketing</li>
              <li>Web Development</li>
              <li>Culinary Arts</li>
              <li>Beauty & Cosmetology</li>
              <li>Automotive Repair</li>
              <li>Fashion Design</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">For Children</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Coding for Kids</li>
              <li>English & Drama</li>
              <li>Music Lessons</li>
              <li>Art Classes</li>
              <li>Swimming</li>
              <li>Mathematics Tutoring</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2024 EduSearch Sri Lanka. Education for Every Age & Career Path.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
