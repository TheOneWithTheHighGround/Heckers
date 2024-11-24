import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import MapView from './components/MapView';
import IssueCard from './components/IssueCard';
import LoginModal from './components/LoginModal';
import IssueDetails from './components/IssueDetails';

const issues = [
  {
    id: 1,
    title: "Broken Road",
    description: "A huge pothole causing accidents.",
    location: [19.076, 72.8777],
    imageUrl: "https://via.placeholder.com/400",
    status: "Reported",
  },
  // Add more sample issues if needed
];

// ... other imports

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Clear any authentication tokens or session data
    navigate('/login'); // Redirect to login page
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header
          isAuthenticated={isAuthenticated}
          onLoginClick={() => setIsLoginModalOpen(true)}
          onLogoutClick={handleLogout} 
        />

        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  {isAuthenticated ? (
                    <MapView issues={issues} />
                  ) : (
                    <LoginModal
                      onClose={() => setIsLoginModalOpen(false)}
                      onLoginSuccess={handleLogin}
                    />
                  )}
                </div>
              }
            />
            {/* ... other routes */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
