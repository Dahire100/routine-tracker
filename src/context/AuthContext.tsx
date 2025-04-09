
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

// Define the shape of our authentication context
type AuthContextType = {
  isLoggedIn: boolean;
  user: UserType | null;
  login: (email: string, password: string, username?: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, username?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

// User type definition
type UserType = {
  id: string;
  name: string;
  email: string;
  username?: string;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: async () => false,
  register: async () => false,
  logout: async () => {},
  isLoading: true,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Authentication provider component
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        console.log("Checking login status from localStorage");
        const userJson = localStorage.getItem('@user');
        if (userJson) {
          const userData = JSON.parse(userJson);
          console.log("Found user data:", userData);
          setUser(userData);
          setIsLoggedIn(true);
          toast({
            title: "Welcome back",
            description: `Hello, ${userData.username || userData.name}!`,
          });
        } else {
          console.log("No user data found in localStorage");
        }
      } catch (error) {
        console.error('Failed to retrieve user data', error);
      } finally {
        console.log("Auth loading complete");
        setIsLoading(false);
      }
    };
    
    checkLoginStatus();
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string, username?: string) => {
    try {
      setIsLoading(true);
      console.log("Login attempt with:", { email, username });
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Basic validation (in a real app, this would be server-side)
      if (email && password) {
        // Mock user data - in a real app, this would come from your backend
        const userData: UserType = {
          id: '1',
          name: 'Test User',
          email: email,
          username: username || email.split('@')[0], // Use part of email as username if not provided
        };
        
        console.log("Login successful, storing user data:", userData);
        
        // Store user data in localStorage
        localStorage.setItem('@user', JSON.stringify(userData));
        
        // Update state
        setUser(userData);
        setIsLoggedIn(true);
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${userData.username || userData.name}!`,
        });
        
        return true;
      }
      console.log("Login validation failed");
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock registration function
  const register = async (email: string, password: string, name: string, username?: string) => {
    try {
      setIsLoading(true);
      console.log("Registration attempt with:", { email, name, username });
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Basic validation
      if (email && password && name) {
        // Mock user data
        const userData: UserType = {
          id: Date.now().toString(), // Generate a random ID
          name: name,
          email: email,
          username: username || email.split('@')[0], // Use part of email as username if not provided
        };
        
        console.log("Registration successful, storing user data:", userData);
        
        // Store user data
        localStorage.setItem('@user', JSON.stringify(userData));
        
        // Update state
        setUser(userData);
        setIsLoggedIn(true);
        
        toast({
          title: "Registration successful",
          description: `Welcome to MindfulMe, ${username || name}!`,
        });
        
        return true;
      }
      console.log("Registration validation failed");
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "Please try again with different information.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      console.log("Logging out user");
      localStorage.removeItem('@user');
      setUser(null);
      setIsLoggedIn(false);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: "There was an error logging out.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Auth provider state:", { isLoggedIn, isLoading, user: user?.username });

  // Provide the auth context value
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
