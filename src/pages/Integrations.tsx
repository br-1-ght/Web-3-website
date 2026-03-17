import DashboardLayout from "@/components/dashboard/DashboardLayout";

const integrations = [
  { name: "Slack", desc: "Send notifications and updates to your Slack channels.", connected: true },
  { name: "GitHub", desc: "Sync repositories and track development progress.", connected: false },
  { name: "Google Analytics", desc: "Import analytics data directly into your dashboard.", connected: false },
  { name: "Zapier", desc: "Automate workflows with 5000+ apps.", connected: true },
  { name: "Stripe", desc: "Manage payments and subscriptions.", connected: false },
  { name: "Notion", desc: "Sync docs and databases with your workspace.", connected: false },
];

const Integrations = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-foreground mb-6">Integrations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((item) => (
          <div key={item.name} className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                {item.connected && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Connected</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <button className={`mt-4 h-9 px-4 rounded-lg text-xs font-medium transition-opacity ${
              item.connected
                ? "bg-muted text-foreground hover:opacity-80"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}>
              {item.connected ? "Manage" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Integrations;
