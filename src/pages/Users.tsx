import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ChevronLeft, ChevronRight } from "lucide-react";

const mockUsers = [
  { name: "Adebanjo Promise", email: "adebanjo@gmail.com", plan: "Free", joined: "3 days ago", status: "Active" },
  { name: "Daniel Oloiade", email: "daniel@gmail.com", plan: "Premium", joined: "4 days ago", status: "Trial expire" },
  { name: "Sarah Johnson", email: "sarah@gmail.com", plan: "Premium", joined: "1 week ago", status: "Active" },
  { name: "Michael Chen", email: "michael@gmail.com", plan: "Free", joined: "2 weeks ago", status: "In-active" },
  { name: "Amina Yusuf", email: "amina@gmail.com", plan: "Premium", joined: "3 weeks ago", status: "Active" },
];

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  "Trial expire": "bg-red-100 text-red-700",
  "In-active": "bg-muted text-foreground",
};

const Users = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-foreground mb-6">Users</h1>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
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
              {mockUsers.map((user, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-primary text-xs font-medium">{user.name[0]}</span>
                    </div>
                    <span className="text-foreground font-medium whitespace-nowrap">{user.name}</span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">{user.email}</td>
                  <td className="px-5 py-3 text-foreground">{user.plan}</td>
                  <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">{user.joined}</td>
                  <td className="px-5 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[user.status] || "bg-muted text-foreground"}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 flex items-center justify-end gap-2 text-sm text-muted-foreground border-t border-border">
          <span>page 1 of 3</span>
          <button className="p-1 hover:text-foreground"><ChevronLeft className="w-4 h-4" /></button>
          <button className="p-1 hover:text-foreground"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Users;
