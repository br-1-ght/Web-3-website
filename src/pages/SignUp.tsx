import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import OnboardingLayout from "@/components/OnboardingLayout";
import StepCreateAccount from "@/components/onboarding/StepCreateAccount";
import StepAboutYou from "@/components/onboarding/StepAboutYou";
import StepWorkspace from "@/components/onboarding/StepWorkspace";
import StepChooseFocus from "@/components/onboarding/StepChooseFocus";

const stepLabels = ["Create Your Account", "Tell Us About You", "Set Up Your Workspace", "Choose Your Focus"];

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [subStep, setSubStep] = useState(0); // for sub-steps within a step
  const navigate = useNavigate();
  const { user } = useAuth();

  // Form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    role: "",
    teamSize: "1",
    workspaceName: "",
    inviteEmails: "",
    focus: [] as string[],
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const steps = stepLabels.map((label, i) => ({
    label,
    completed: i < currentStep,
    active: i === currentStep,
  }));

  const handleFinish = async () => {
    if (!user) return;
    await supabase.from("profiles").update({
      display_name: formData.displayName,
      role: formData.role,
      team_size: formData.teamSize,
      workspace_name: formData.workspaceName,
      focus: formData.focus,
      onboarding_completed: true,
    }).eq("user_id", user.id);

    navigate("/dashboard");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepCreateAccount
            formData={formData}
            updateField={updateField}
            subStep={subStep}
            setSubStep={setSubStep}
            onNext={() => { setCurrentStep(1); setSubStep(0); }}
          />
        );
      case 1:
        return (
          <StepAboutYou
            formData={formData}
            updateField={updateField}
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        );
      case 2:
        return (
          <StepWorkspace
            formData={formData}
            updateField={updateField}
            subStep={subStep}
            setSubStep={setSubStep}
            onNext={() => { setCurrentStep(3); setSubStep(0); }}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <StepChooseFocus
            formData={formData}
            updateField={updateField}
            onFinish={handleFinish}
            onBack={() => setCurrentStep(2)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout steps={steps}>
      {renderStep()}
    </OnboardingLayout>
  );
};

export default SignUp;
