
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import AuthProvider, { useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import HabitTracker from "./pages/HabitTracker";
import Meditation from "./pages/Meditation";
import Mood from "./pages/Mood";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import LoginScreen from "./screens/LoginScreen";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      console.log("User is not logged in, redirecting to login");
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, isLoading, navigate]);
  
  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // Render nothing while redirecting
  if (!isLoggedIn) {
    return null;
  }
  
  console.log("Rendering protected content at:", location.pathname);
  return <>{children}</>;
};

// Login route component
const LoginRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      console.log("User is logged in, redirecting to home");
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (isLoggedIn) {
    return null; // Will be redirected by the useEffect
  }
  
  console.log("Rendering login screen");
  return <LoginScreen />;
};

// Create the query client as a function component to ensure it has the proper React context
const AppContent = () => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>
          <TooltipProvider>
            <Routes>
              <Route path="/login" element={<LoginRoute />} />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout>
                    <Index />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/habits" element={
                <ProtectedRoute>
                  <Layout>
                    <HabitTracker />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/meditation" element={
                <ProtectedRoute>
                  <Layout>
                    <Meditation />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/mood" element={
                <ProtectedRoute>
                  <Layout>
                    <Mood />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/progress" element={
                <ProtectedRoute>
                  <Layout>
                    <Progress />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Redirect root to home or login based on auth state */}
              <Route path="" element={<Navigate to="/" replace />} />
              
              {/* Default route for not found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  );
};

// Main App component
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
