import { 
  FaShieldAlt, 
  FaMoon, 
  FaUserCircle, 
  FaChevronDown
} from 'react-icons/fa';

export const Header = () => (
   <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-8 py-4 shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-900 flex items-center gap-2">
          <FaShieldAlt className="text-blue-900" /> ShieldSync Secure Audit Panel
        </h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <FaMoon /> Dark
          </button>
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg cursor-pointer">
            <FaUserCircle className="text-gray-600" />
            <span>Admin User</span>
            <FaChevronDown className="text-gray-400 text-sm" />
          </div>
        </div>
      </header>
);