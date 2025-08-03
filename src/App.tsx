
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { BottomNavigation } from "@/components/health/BottomNavigation";
import { Bot } from "lucide-react";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MedicalAI from "./pages/MedicalAI";
import Emotional from "./pages/Emotional";
import Diagnostics from "./pages/Diagnostics";
import Knowledge from "./pages/Knowledge";
import Profile from "./pages/Profile";
import HealthConnections from "./pages/HealthConnections";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/health-connections" element={
              <ProtectedRoute>
                <HealthConnections />
              </ProtectedRoute>
            } />
            <Route path="/emotional" element={
              <ProtectedRoute>
                <Emotional />
              </ProtectedRoute>
            } />
            <Route path="/diagnostics" element={
              <ProtectedRoute>
                <Diagnostics />
              </ProtectedRoute>
            } />
            <Route path="/knowledge" element={
              <ProtectedRoute>
                <Knowledge />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Global Bottom Navigation - only show on protected routes */}
          <Routes>
            <Route path="/login" element={null} />
            <Route path="/signup" element={null} />
            <Route path="*" element={
              <ProtectedRoute>
                <>
                  <BottomNavigation />
                  {/* Floating AI Chatbot Button */}
                  <button className="fixed bottom-20 right-6 w-14 h-14 bg-health-primary hover:bg-health-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-30">
                    <Bot size={24} />
                  </button>
                </>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
