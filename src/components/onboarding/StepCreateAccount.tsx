import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { lovable } from "@/integrations/lovable/index";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface Props {
  formData: any;
  updateField: (field: string, value: any) => void;
  subStep: number;
  setSubStep: (s: number) => void;
  onNext: () => void;
}

const StepCreateAccount = ({ formData, updateField, subStep, setSubStep, onNext }: Props) => {
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const handleCreateAccount = async () => {
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const { error: signUpError } = await signUp(formData.email, formData.password);
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    // Email is auto-confirmed, proceed directly to next step
    onNext();
  };

  const startResendTimer = () => {
    setResendTimer(10);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerify = () => {
    // In production, you'd verify the OTP. For now, proceed.
    onNext();
  };

  if (subStep === 1) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setSubStep(0)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-sm text-muted-foreground">1/4</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Verify Email address</h2>
        <p className="text-muted-foreground text-sm mb-8">
          A six digit verification code has been sent to your email address, enter it here to verify your account
        </p>

        <div className="flex justify-center mb-4">
          <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
            <InputOTPGroup className="gap-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} className="w-14 h-14 text-lg border-border rounded-lg" />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <p className="text-sm text-center text-muted-foreground mb-8">
          Didn't get Code?{" "}
          {resendTimer > 0 ? (
            <span className="text-primary">Resend code in {resendTimer} sec</span>
          ) : (
            <button onClick={startResendTimer} className="text-primary hover:underline">Resend code</button>
          )}
        </p>

        <button
          onClick={handleVerify}
          className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          Verify
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <span className="text-sm text-muted-foreground">1/4</span>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Let's start with the basics</h2>
      <p className="text-muted-foreground text-sm mb-8">
        Enter your email and set a secure password. This helps us keep your account safe and ready for future logins.
      </p>

      {error && <p className="text-destructive text-sm mb-4">{error}</p>}

      <button
        type="button"
        onClick={async () => {
          setError("");
          const { error } = await lovable.auth.signInWithOAuth("google", {
            redirect_uri: window.location.origin,
          });
          if (error) setError(error.message);
        }}
        className="w-full h-12 rounded-lg border border-border bg-background text-foreground font-medium hover:bg-muted transition-colors flex items-center justify-center gap-3"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Sign up with Google
      </button>

      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email address</label>
          <input
            type="email"
            placeholder="Your email address"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Create password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create your password"
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              className="w-full h-12 px-4 pr-12 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Confirm password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              className="w-full h-12 px-4 pr-12 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleCreateAccount}
        disabled={loading || !formData.email || !formData.password}
        className="w-full h-12 mt-8 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <Link to="/signin" className="text-primary hover:underline font-medium">Login</Link>
      </p>

      <p className="text-center text-xs text-muted-foreground mt-3">
        By creating an account, I agree to NooluHQ's{" "}
        <a href="#" className="text-primary hover:underline">Terms of Use</a> and{" "}
        <a href="#" className="text-primary hover:underline">Privacy Policy</a>
      </p>
    </div>
  );
};

export default StepCreateAccount;
