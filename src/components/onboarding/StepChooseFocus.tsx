import { ChevronLeft } from "lucide-react";
import { useState } from "react";

interface Props {
  formData: any;
  updateField: (field: string, value: any) => void;
  onFinish: () => void;
  onBack: () => void;
}

const focusOptions = [
  { id: "projects", icon: "📝", title: "Manage projects or tasks", desc: "Plan, track, and complete work efficiently" },
  { id: "collaborate", icon: "💬", title: "Collaborate with my team", desc: "Share updates, files, and feedback all in one place" },
  { id: "kpis", icon: "📊", title: "Track performance or KPIs", desc: "Build dashboards to monitor growth and goals" },
  { id: "workflows", icon: "🔧", title: "Design workflows or systems", desc: "Create reusable templates and internal tools" },
  { id: "exploring", icon: "💭", title: "Just exploring for now", desc: "Show me around, I'll decide later" },
];

const StepChooseFocus = ({ formData, updateField, onFinish, onBack }: Props) => {
  const [loading, setLoading] = useState(false);

  const toggleFocus = (id: string) => {
    const current = formData.focus as string[];
    if (current.includes(id)) {
      updateField("focus", current.filter((f: string) => f !== id));
    } else {
      updateField("focus", [...current, id]);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    await onFinish();
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Set up your workspace
        </button>
        <span className="text-sm text-muted-foreground">4/4</span>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">What do you want to achieve?</h2>
      <p className="text-muted-foreground text-sm mb-8">
        Choose a use case so we can recommend the right tools and templates to get you started faster. You can always change this later.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {focusOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => toggleFocus(option.id)}
            className={`p-4 rounded-lg border text-left transition-all ${
              formData.focus.includes(option.id)
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "border-border hover:border-muted-foreground"
            }`}
          >
            <span className="text-xl mb-2 block">{option.icon}</span>
            <span className="text-sm font-medium text-foreground block">{option.title}</span>
            <span className="text-xs text-muted-foreground mt-1 block">{option.desc}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-8">
        <button onClick={handleFinish} className="text-sm text-primary hover:underline font-medium">
          Skip for later
        </button>
        <button
          onClick={handleFinish}
          disabled={loading}
          className="h-12 px-8 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Finishing..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default StepChooseFocus;
