import { ReactNode } from "react";

interface Step {
  label: string;
  completed: boolean;
  active: boolean;
}

interface OnboardingLayoutProps {
  steps: Step[];
  children: ReactNode;
}

const OnboardingLayout = ({ steps, children }: OnboardingLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">N</span>
          </div>
          <span className="font-semibold text-foreground text-lg">DIAG</span>
        </div>
      </header>

      {/* Gradient bar */}
      <div className="h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/40" />

      {/* Content */}
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16 gap-12 md:gap-16">
        {/* Left sidebar - steps */}
        <div className="md:w-[340px] shrink-0">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
            Let's get you set up in just 4 steps
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            We'll keep it short and simple, just what we need to personalize your experience.
          </p>

          <div className="flex flex-row md:flex-col gap-0">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                      step.completed || step.active
                        ? "bg-primary text-primary-foreground"
                        : "border-2 border-border text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`hidden md:block w-0.5 h-8 ${
                      step.completed ? "bg-primary/40" : "bg-border"
                    }`} />
                  )}
                </div>
                <span className={`hidden md:block mt-2.5 text-sm font-medium ${
                  step.completed || step.active ? "text-primary" : "text-muted-foreground"
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 bg-card rounded-xl border border-border p-6 md:p-10 min-h-[500px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
