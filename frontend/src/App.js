import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route,useNavigate,useLocation,Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./components/home/Home";
import Mail from "./components/Tanishka files/Mail";
import Dashboard from "./components/dashboard/Dashboard";


const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    const token = localStorage.getItem('token');
    if (!sessionId || !token) {
      console.log("Session");
      
      setIsLoading(false);
      setIsAuthenticated(false);
      navigate('/');
      return;
    }

    axios
      .post("http://localhost:5000/api/verifysession", { sessionId })
      .then((response) => {
        if (response.data.valid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("sessionId");
          
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("sessionId");
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const AppContent = () => {


  return (
      <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/sending-mail"
        element={
          <ProtectedRoute>
            <Mail />
          </ProtectedRoute>
        }
      />
      <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  );
};

export default App;