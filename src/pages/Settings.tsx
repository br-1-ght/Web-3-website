import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("display_name, workspace_name").eq("user_id", user.id).single().then(({ data }) => {
      if (data) {
        setDisplayName(data.display_name || "");
        setWorkspaceName(data.workspace_name || "");
      }
    });
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    await supabase.from("profiles").update({
      display_name: displayName,
      workspace_name: workspaceName,
    }).eq("user_id", user.id);
    setSaving(false);
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-foreground mb-6">Settings</h1>
      <div className="bg-card border border-border rounded-xl p-6 max-w-lg space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Workspace Name</label>
          <input
            type="text"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full h-12 px-4 rounded-lg border border-border bg-muted text-muted-foreground"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="h-12 px-8 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        <div className="pt-4 border-t border-border">
          <button onClick={() => { signOut(); navigate("/signin"); }} className="text-sm text-destructive hover:underline">
            Sign out
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
