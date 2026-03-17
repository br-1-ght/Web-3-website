import { ReactNode, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, BarChart3, LineChart, Users, Settings, Puzzle, Bell, Search, ChevronDown, Menu, X } from "lucide-react";
import { useEffect } from "react";

interface Profile {
  display_name: string | null;
  workspace_name: string | null;
}

const sidebarItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: BarChart3, label: "Report", path: "/report" },
  { icon: LineChart, label: "Analytics", path: "/analytics" },
  { icon: Users, label: "Users", path: "/users" },
  { icon: Puzzle, label: "Integrations", path: "/integrations" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("display_name, workspace_name").eq("user_id", user.id).single().then(({ data }) => {
      if (data) setProfile(data);
    });
  }, [user]);

  const firstName = profile?.display_name?.split(" ")[0] || "User";

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top nav */}
      <header className="bg-card border-b border-border px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-muted-foreground">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">N</span>
            </div>
            <span className="font-semibold text-foreground hidden sm:inline">DIAG</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-2 w-80">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input placeholder="Search anything..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1" />
        </div>

        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/settings")}>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-medium text-xs">{firstName[0]}</span>
            </div>
            <span className="text-sm font-medium text-foreground hidden sm:inline">{profile?.display_name || "User"}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed md:sticky top-[57px] left-0 h-[calc(100vh-57px)] w-56 bg-card border-r border-border p-4 flex flex-col justify-between z-20 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}>
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <button
                  key={item.label}
                  onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-3">
              <span className="text-primary text-xs">⏰</span>
            </div>
            <p className="text-sm font-medium text-foreground">You're on a 7-day free trial</p>
            <p className="text-xs text-muted-foreground mt-1">Enjoy full access to all features, no limits.</p>
            <button className="mt-3 px-4 py-2 bg-primary text-primary-foreground text-xs rounded-lg font-medium hover:opacity-90">
              Choose a Plan
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/30 z-10 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
