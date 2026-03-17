import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [onboardingDone, setOnboardingDone] = useState(false);

  useEffect(() => {
    if (!user) { setCheckingOnboarding(false); return; }
    supabase.from("profiles").select("onboarding_completed").eq("user_id", user.id).single().then(({ data }) => {
      setOnboardingDone(data?.onboarding_completed ?? false);
      setCheckingOnboarding(false);
    });
  }, [user]);

  if (loading || checkingOnboarding) return <div className="flex items-center justify-center min-h-screen text-muted-foreground">Loading...</div>;
  if (!user) return <Navigate to="/signin" />;
  if (!onboardingDone) return <Navigate to="/signup" />;
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [onboardingDone, setOnboardingDone] = useState(false);

  useEffect(() => {
    if (!user) { setCheckingOnboarding(false); return; }
    supabase.from("profiles").select("onboarding_completed").eq("user_id", user.id).single().then(({ data }) => {
      setOnboardingDone(data?.onboarding_completed ?? false);
      setCheckingOnboarding(false);
    });
  }, [user]);

  if (loading || checkingOnboarding) return <div className="flex items-center justify-center min-h-screen text-muted-foreground">Loading...</div>;
  if (user && onboardingDone) return <Navigate to="/dashboard" />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
            <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
            <Route path="/integrations" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
