import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Loader2 } from "lucide-react";
import affordifyIcon from "@/assets/affordify-icon.png";

type OnboardingStep = "aadhar" | "otp" | "success" | "apps" | "preferences" | "complete";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("aadhar");
  const [aadharNumber, setAadharNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [connectedApps, setConnectedApps] = useState<string[]>([]);
  const [expenseRatio, setExpenseRatio] = useState(50);

  const apps = [
    { name: "Splitwise", icon: "💰", connected: false },
    { name: "Money Manager", icon: "📊", connected: false },
    { name: "Paytm", icon: "📱", connected: false }
  ];

  const getProgress = () => {
    switch (currentStep) {
      case "aadhar": return 10;
      case "otp": return 20;
      case "success": return 30;
      case "apps": return 60;
      case "preferences": return 90;
      case "complete": return 100;
      default: return 0;
    }
  };

  const handleAadharSubmit = () => {
    if (aadharNumber.length === 12) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCurrentStep("otp");
      }, 1500);
    }
  };

  const handleOtpSubmit = () => {
    if (otp.length === 4) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCurrentStep("success");
        setTimeout(() => setCurrentStep("apps"), 2000);
      }, 1500);
    }
  };

  const handleAppConnect = (appName: string) => {
    setLoading(true);
    setTimeout(() => {
      setConnectedApps([...connectedApps, appName]);
      setLoading(false);
    }, 1000);
  };

  const handleFinish = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={affordifyIcon} 
              alt="Affordify" 
              className="w-12 h-12 rounded-xl"
            />
          </div>
          <CardTitle className="text-xl font-bold text-primary">Welcome to Affordify</CardTitle>
          <CardDescription>Let's set up your account</CardDescription>
          <Progress value={getProgress()} className="mt-4" />
        </CardHeader>
        <CardContent>
          {/* Step 1: Aadhar */}
          {currentStep === "aadhar" && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Identity Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Enter your 12-digit Aadhar number for secure verification
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="aadhar">Aadhar Number</Label>
                <Input
                  id="aadhar"
                  type="text"
                  placeholder="1234 5678 9012"
                  value={aadharNumber}
                  onChange={(e) => setAadharNumber(e.target.value.replace(/\D/g, "").slice(0, 12))}
                  maxLength={12}
                />
              </div>
              <Button 
                onClick={handleAadharSubmit} 
                className="w-full"
                disabled={aadharNumber.length !== 12 || loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Submit
              </Button>
            </div>
          )}

          {/* Step 2: OTP */}
          {currentStep === "otp" && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Enter OTP</h3>
                <p className="text-sm text-muted-foreground">
                  We've sent a 4-digit OTP to your registered mobile number
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="1234"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  maxLength={4}
                  className="text-center text-2xl tracking-widest"
                />
              </div>
              <Button 
                onClick={handleOtpSubmit} 
                className="w-full"
                disabled={otp.length !== 4 || loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Verify
              </Button>
            </div>
          )}

          {/* Step 3: Success */}
          {currentStep === "success" && (
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-success mx-auto" />
              <h3 className="text-lg font-semibold text-success">Verification Successful!</h3>
              <p className="text-sm text-muted-foreground">
                Fetching your financial data...
              </p>
              <div className="flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            </div>
          )}

          {/* Step 4: App Connections */}
          {currentStep === "apps" && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Connect Your Apps</h3>
                <p className="text-sm text-muted-foreground">
                  Connect your financial apps to get personalized insights
                </p>
              </div>
              <div className="space-y-3">
                {apps.map((app) => (
                  <div key={app.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{app.icon}</span>
                      <span className="font-medium">{app.name}</span>
                    </div>
                    <Button
                      variant={connectedApps.includes(app.name) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAppConnect(app.name)}
                      disabled={connectedApps.includes(app.name) || loading}
                      className={connectedApps.includes(app.name) ? "bg-success text-success-foreground" : ""}
                    >
                      {connectedApps.includes(app.name) ? "Connected" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => setCurrentStep("preferences")} 
                className="w-full"
                disabled={connectedApps.length === 0}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 5: Preferences */}
          {currentStep === "preferences" && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Set Your Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  Set your ideal expense ratio for better financial planning
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Monthly Expense Ratio: {expenseRatio}%</Label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={expenseRatio}
                    onChange={(e) => setExpenseRatio(parseInt(e.target.value))}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Conservative (10%)</span>
                    <span>Aggressive (90%)</span>
                  </div>
                </div>
              </div>
              <Button onClick={handleFinish} className="w-full">
                Complete Setup
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}