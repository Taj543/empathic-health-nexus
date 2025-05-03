
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define types for the authentication context
interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock authentication - in a real app, this would connect to a backend
  useEffect(() => {
    // Check if there's a saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock login - replace with real authentication in production
      // This simulates a network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple validation
      if (!email || !password || password.length < 6) {
        throw new Error("Invalid credentials");
      }
      
      const mockUser = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock signup - replace with real registration in production
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!email || !password || password.length < 6) {
        throw new Error("Invalid credentials");
      }
      
      const mockUser = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock Google login - replace with real OAuth in production
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUser = {
        id: "google-" + Math.random().toString(36).substr(2, 9),
        email: "user" + Math.floor(Math.random() * 1000) + "@gmail.com",
        name: "Google User",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + Math.random(),
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock logout - replace with real logout in production
      await new Promise(resolve => setTimeout(resolve, 300));
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, googleLogin, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
