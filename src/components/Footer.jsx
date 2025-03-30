import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-indigo-400">Global Groupware Solutions Limited</h2>
            <p className="text-sm text-gray-400 mt-2">
              Empowering your digital journey with innovative solutions.
            </p>
          </div>

          {/* Navigation Links */}
       
       

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400">📍 123 Main Street, City, Country</p>
            <p className="text-sm text-gray-400">📧 contact@yourcompany.com</p>
            <p className="text-sm text-gray-400">📞 +123 456 7890</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} YourCompany. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
