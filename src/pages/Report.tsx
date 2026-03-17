import DashboardLayout from "@/components/dashboard/DashboardLayout";

const Report = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-foreground mb-6">Reports</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Monthly Revenue</p>
          <span className="text-2xl font-bold text-foreground">₦124,000.00</span>
          <p className="text-sm text-muted-foreground mt-2">Generated from all active subscriptions this month.</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Churn Rate</p>
          <span className="text-2xl font-bold text-foreground">3.2%</span>
          <p className="text-sm text-muted-foreground mt-2">Down from 4.1% last month.</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">New Signups</p>
          <span className="text-2xl font-bold text-foreground">87</span>
          <p className="text-sm text-muted-foreground mt-2">Users who signed up in the last 30 days.</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Avg. Session</p>
          <span className="text-2xl font-bold text-foreground">12m 34s</span>
          <p className="text-sm text-muted-foreground mt-2">Average time users spend per session.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Report;
