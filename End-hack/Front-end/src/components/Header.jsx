import { Link } from "react-router-dom";

const Header = ({ isAuthenticated, onLoginClick }) => {
  return (
    <header className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-bold">
        <Link to="/" className="hover:text-yellow-400">
          CoFix
        </Link>
      </h1>

      {/* Navigation Links */}
      <nav className="space-x-4">
        {isAuthenticated && (
          <Link to="/report" className="hover:text-yellow-400">
            Report Issue
          </Link>
        )}
      </nav>

      {/* Login/Profile Button */}
      {isAuthenticated ? (
        <div className="flex items-center space-x-4">
          <span className="text-sm">Welcome!</span>
          <button 
            className="bg-yellow-400 text-black px-3 py-2 rounded hover:bg-yellow-300"
            onClick={() => {/* Add logout handler */}}
          >
            Logout
          </button>
        </div>
      ) : (
        <button 
          className="bg-yellow-400 text-black px-3 py-2 rounded hover:bg-yellow-300"
          onClick={onLoginClick}
        >
          Login
        </button>
      )}
    </header>
  );
};

export default Header;
