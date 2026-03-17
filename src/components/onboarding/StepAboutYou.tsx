import { ChevronLeft } from "lucide-react";

interface Props {
  formData: any;
  updateField: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const teamOptions = [
  { label: "Just me", value: "1" },
  { label: "2-10 teammates", value: "2-10" },
  { label: "11-50 teammates", value: "11-50" },
  { label: "50+ teammates", value: "50+" },
];

const StepAboutYou = ({ formData, updateField, onNext, onBack }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <span className="text-sm text-muted-foreground">2/4</span>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Who's joining us?</h2>
      <p className="text-muted-foreground text-sm mb-8">
        We'd love to know your name and role so we can tailor the experience to how you work best, whether you're solo or with a team.
      </p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">What should we call you?</label>
          <input
            type="text"
            placeholder="eg., Orimadegun Promise"
            value={formData.displayName}
            onChange={(e) => updateField("displayName", e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">What's your role?</label>
          <input
            type="text"
            placeholder="eg., Product designer"
            value={formData.role}
            onChange={(e) => updateField("role", e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Are you working solo or with a team?</label>
          <div className="space-y-3">
            {teamOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer group" onClick={() => updateField("teamSize", option.value)}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  formData.teamSize === option.value ? "border-primary" : "border-border group-hover:border-muted-foreground"
                }`}>
                  {formData.teamSize === option.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
                <span className="text-sm text-foreground">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!formData.displayName}
        className="w-full h-12 mt-8 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
};

export default StepAboutYou;
