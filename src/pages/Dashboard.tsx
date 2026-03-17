import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const firstNames = ["Adebanjo", "Daniel", "Chinedu", "Fatima", "Oluwaseun", "Amara", "Ibrahim", "Ngozi", "Tunde", "Blessing", "Emeka", "Aisha", "Kofi", "Zainab", "Yemi"];
const lastNames = ["Promise", "Oloiade", "Nwosu", "Bello", "Adeyemi", "Okoro", "Musa", "Eze", "Okafor", "Abdullahi", "Mensah", "Idris", "Afolabi", "Chukwu"];
const plans = ["Free", "Premium", "Basic", "Enterprise"];
const statuses = ["Active", "Trial expire", "In-active", "Active", "Active"];
const joinedOptions = ["1 day ago", "2 days ago", "3 days ago", "5 days ago", "1 week ago", "2 weeks ago"];

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  "Trial expire": "bg-red-100 text-red-700",
  "In-active": "bg-muted text-foreground",
};

const ITEMS_PER_PAGE = 6;
const TOTAL_SIGNUPS = 30;

const Dashboard = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("User");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("display_name").eq("user_id", user.id).single().then(({ data }) => {
      if (data?.display_name) setFirstName(data.display_name.split(" ")[0]);
    });
  }, [user]);

  // Generate metrics that change on every reload using Date.now() + user id
  const { totalRevenue, previousRevenue, churnedRevenue, previousChurn, activeUsers, previousUsers } = useMemo(() => {
    // Use timestamp-based seed so values change on reload
    const seed = Date.now().toString() + (user?.id || "default");
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash |= 0;
    }
    let state = Math.abs(hash);
    const rand = () => {
      state = (state * 1664525 + 1013904223) & 0x7fffffff;
      return state / 0x7fffffff;
    };

    const totalRevenue = Math.floor(rand() * 280000 + 20000); // 20,000 - 300,000
    const previousRevenue = Math.floor(rand() * 280000 + 20000);
    const churnedRevenue = Math.floor(rand() * (totalRevenue * 0.15));
    const previousChurn = Math.floor(rand() * (previousRevenue * 0.15));
    const activeUsers = Math.floor(rand() * 950 + 50);
    const previousUsers = Math.floor(rand() * 950 + 50);

    return { totalRevenue, previousRevenue, churnedRevenue, previousChurn, activeUsers, previousUsers };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]); // intentionally no Date.now dep — runs once per mount/reload

  // Calculate real percentage changes
  const revenueChange = previousRevenue !== 0 ? Math.round(((totalRevenue - previousRevenue) / previousRevenue) * 100) : 0;
  const churnChange = previousChurn !== 0 ? Math.round(((churnedRevenue - previousChurn) / previousChurn) * 100) : 0;
  const userChange = previousUsers !== 0 ? Math.round(((activeUsers - previousUsers) / previousUsers) * 100) : 0;

  // Generate all signups (deterministic per user, but changes on reload via same seed approach)
  const allSignups = useMemo(() => {
    const seed = Date.now().toString() + (user?.id || "default") + "signups";
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash |= 0;
    }
    let state = Math.abs(hash);
    const rand = () => {
      state = (state * 1664525 + 1013904223) & 0x7fffffff;
      return state / 0x7fffffff;
    };

    return Array.from({ length: TOTAL_SIGNUPS }, () => {
      const fn = firstNames[Math.floor(rand() * firstNames.length)];
      const ln = lastNames[Math.floor(rand() * lastNames.length)];
      return {
        name: `${fn} ${ln}`,
        email: `${fn.toLowerCase()}${Math.floor(rand() * 99)}@gmail.com`,
        plan: plans[Math.floor(rand() * plans.length)],
        joined: joinedOptions[Math.floor(rand() * joinedOptions.length)],
        status: statuses[Math.floor(rand() * statuses.length)],
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const totalPages = Math.ceil(allSignups.length / ITEMS_PER_PAGE);
  const paginatedSignups = allSignups.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const formatMoney = (amount: number) =>
    `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-foreground mb-6">Welcome {firstName}</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Total Revenue</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{formatMoney(totalRevenue)}</span>
            <span className={`text-xs font-medium ${revenueChange >= 0 ? "text-green-600" : "text-destructive"}`}>
              {revenueChange >= 0 ? "+" : ""}{revenueChange}%
            </span>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Churned Revenue</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{formatMoney(churnedRevenue)}</span>
            <span className={`text-xs font-medium ${churnChange <= 0 ? "text-green-600" : "text-destructive"}`}>
              {churnChange >= 0 ? "+" : ""}{churnChange}%
            </span>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Active Users</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{activeUsers.toLocaleString()}</span>
            <span className={`text-xs font-medium ${userChange >= 0 ? "text-green-600" : "text-destructive"}`}>
              {userChange >= 0 ? "+" : ""}{userChange}%
            </span>
          </div>
        </div>
      </div>

      {/* Signups table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Latest Signups</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground font-semibold">Name</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground font-semibold">Email</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground font-semibold">Plan</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground font-semibold">Joined</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSignups.map((signup, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-primary text-xs font-medium">{signup.name[0]}</span>
                    </div>
                    <span className="text-foreground font-medium whitespace-nowrap">{signup.name}</span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">{signup.email}</td>
                  <td className="px-5 py-3 text-foreground">{signup.plan}</td>
                  <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">{signup.joined}</td>
                  <td className="px-5 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[signup.status] || "bg-muted text-foreground"}`}>
                      {signup.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 flex items-center justify-end gap-2 text-sm text-muted-foreground border-t border-border">
          <span>page {currentPage} of {totalPages}</span>
          <button
            className="p-1 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="p-1 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
