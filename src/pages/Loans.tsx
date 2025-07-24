import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Edit, Plus, Trash2, Home, Car, GraduationCap } from "lucide-react";

export default function Loans() {
  const [isEditing, setIsEditing] = useState(false);
  const [loans, setLoans] = useState([
    {
      id: 1,
      name: "Home Loan",
      bank: "HDFC Bank",
      amount: "₹45,00,000",
      outstanding: "₹32,50,000",
      emi: "₹42,500",
      tenure: "15 years",
      rate: "8.5%",
      nextDue: "25th Nov",
      icon: Home
    },
    {
      id: 2,
      name: "Car Loan",
      bank: "ICICI Bank",
      amount: "₹8,00,000",
      outstanding: "₹3,20,000",
      emi: "₹18,750",
      tenure: "3 years",
      rate: "9.2%",
      nextDue: "20th Nov",
      icon: Car
    }
  ]);

  const suggestedLoans = [
    {
      name: "Personal Loan",
      bank: "AXIS Bank",
      rate: "Starting from 10.5%",
      amount: "Up to ₹40 lakhs",
      processing: "Minimal documentation",
      icon: GraduationCap
    },
    {
      name: "Business Loan",
      bank: "SBI",
      rate: "Starting from 9.8%",
      amount: "Up to ₹1 crore",
      processing: "Quick approval",
      icon: Home
    }
  ];

  const handleRefresh = () => {
    alert("Loan details refreshed!");
  };

  const handleDelete = (id: number) => {
    setLoans(loans.filter(loan => loan.id !== id));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Changes saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Loan Details</h1>
          <p className="text-muted-foreground">Track your loans and EMIs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            variant={isEditing ? "default" : "outline"} 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      </div>

      {/* Current Loans */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Loans</h2>
        <div className="grid gap-4">
          {loans.map((loan) => (
            <Card key={loan.id} className="relative">
              {isEditing && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => handleDelete(loan.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <CardHeader>
                <div className="flex items-center gap-3">
                  <loan.icon className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <CardTitle className="text-xl">{loan.name}</CardTitle>
                    <CardDescription>{loan.bank}</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-warning">
                    Next due: {loan.nextDue}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Loan Amount</p>
                      <p className="text-lg font-semibold">{loan.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Outstanding</p>
                      <p className="text-lg font-semibold text-warning">{loan.outstanding}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly EMI</p>
                      <p className="text-lg font-semibold text-danger">{loan.emi}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Interest Rate</p>
                      <p className="text-lg font-semibold">{loan.rate}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Remaining Tenure</p>
                      <p className="text-lg font-semibold">{loan.tenure}</p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-success h-3 rounded-full" 
                        style={{ 
                          width: `${((parseInt(loan.amount.replace(/[₹,]/g, "")) - parseInt(loan.outstanding.replace(/[₹,]/g, ""))) / parseInt(loan.amount.replace(/[₹,]/g, ""))) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {(((parseInt(loan.amount.replace(/[₹,]/g, "")) - parseInt(loan.outstanding.replace(/[₹,]/g, ""))) / parseInt(loan.amount.replace(/[₹,]/g, ""))) * 100).toFixed(1)}% paid
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested Loans */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Loan Options for You</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {suggestedLoans.map((suggestion, index) => (
            <Card key={index} className="border-dashed border-2 border-muted">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <suggestion.icon className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Plus className="h-5 w-5 text-muted-foreground" />
                      {suggestion.name}
                    </CardTitle>
                    <CardDescription>{suggestion.bank}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Interest Rate</span>
                    <span className="font-semibold text-success">{suggestion.rate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Loan Amount</span>
                    <span className="text-sm">{suggestion.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Processing</span>
                    <span className="text-sm">{suggestion.processing}</span>
                  </div>
                  <Button className="w-full mt-3" variant="outline">
                    Check Eligibility
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}