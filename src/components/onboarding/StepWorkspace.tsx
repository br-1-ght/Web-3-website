import { ChevronLeft, Info } from "lucide-react";

interface Props {
  formData: any;
  updateField: (field: string, value: any) => void;
  subStep: number;
  setSubStep: (s: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepWorkspace = ({ formData, updateField, subStep, setSubStep, onNext, onBack }: Props) => {
  if (subStep === 1) {
    // Invite teammates
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setSubStep(0)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-sm text-muted-foreground">3/4</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Invite teammates by email</h2>
        <p className="text-muted-foreground text-sm mb-8">
          Add their email addresses so they can join your workspace right away. You can skip this and invite them later.
        </p>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Enter Email Address?</label>
          <input
            type="email"
            placeholder="eg., Adebanjo@gmail.com"
            value={formData.inviteEmails}
            onChange={(e) => updateField("inviteEmails", e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Quick Tips</span>
          </div>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Separate multiple emails with commas</li>
            <li>Press Enter or comma to add each teammate</li>
            <li>They won't receive an invite until you've completed your setup</li>
            <li>You can skip this step and invite teammates later</li>
          </ol>
        </div>

        <div className="flex items-center justify-between mt-8">
          <button onClick={onNext} className="text-sm text-primary hover:underline font-medium">
            Skip for later
          </button>
          <button
            onClick={onNext}
            className="h-12 px-8 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Tell us about you
        </button>
        <span className="text-sm text-muted-foreground">3/4</span>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Create your workspace</h2>
      <p className="text-muted-foreground text-sm mb-8">
        Name your workspace and invite teammates (if you'd like). You can always add more later, we'll keep things flexible.
      </p>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">What's the name of your workspace?</label>
        <input
          type="text"
          placeholder="eg., Nexa team"
          value={formData.workspaceName}
          onChange={(e) => updateField("workspaceName", e.target.value)}
          className="w-full h-12 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
        />
      </div>

      <button
        onClick={() => setSubStep(1)}
        disabled={!formData.workspaceName}
        className="w-full h-12 mt-8 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
};

export default StepWorkspace;
