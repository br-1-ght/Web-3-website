import DashboardLayout from "@/components/dashboard/DashboardLayout";

const Analytics = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-foreground mb-6">Analytics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Page Views</p>
          <span className="text-2xl font-bold text-foreground">12,450</span>
          <span className="text-xs text-green-600 font-medium ml-2">+15%</span>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Bounce Rate</p>
          <span className="text-2xl font-bold text-foreground">32%</span>
          <span className="text-xs text-green-600 font-medium ml-2">-3%</span>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Conversion</p>
          <span className="text-2xl font-bold text-foreground">8.7%</span>
          <span className="text-xs text-green-600 font-medium ml-2">+1.2%</span>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Traffic Sources</h2>
        <div className="space-y-3">
          {[
            { source: "Direct", pct: 45 },
            { source: "Social Media", pct: 28 },
            { source: "Referral", pct: 18 },
            { source: "Organic Search", pct: 9 },
          ].map((item) => (
            <div key={item.source} className="flex items-center gap-3">
              <span className="text-sm text-foreground w-32">{item.source}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${item.pct}%` }} />
              </div>
              <span className="text-sm text-muted-foreground w-10 text-right">{item.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
