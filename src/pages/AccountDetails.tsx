import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Edit, Plus, Trash2 } from "lucide-react";

export default function AccountDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "HDFC Savings Account",
      number: "****1234",
      balance: "₹85,430",
      type: "Savings",
      status: "Active"
    },
    {
      id: 2,
      name: "ICICI Current Account",
      number: "****5678",
      balance: "₹1,60,250",
      type: "Current",
      status: "Active"
    },
    {
      id: 3,
      name: "SBI Fixed Deposit",
      number: "****9012",
      balance: "₹2,50,000",
      type: "FD",
      status: "Matured"
    }
  ]);

  const suggestedAccounts = [
    {
      name: "AXIS Bank Savings",
      type: "High Interest Savings",
      rate: "7.5% p.a.",
      benefit: "Zero balance account"
    },
    {
      name: "HDFC Fixed Deposit",
      type: "Term Deposit",
      rate: "8.2% p.a.",
      benefit: "Senior citizen rates"
    }
  ];

  const handleRefresh = () => {
    // Simulate refresh
    alert("Account details refreshed!");
  };

  const handleDelete = (id: number) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Changes saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Account Details</h1>
          <p className="text-muted-foreground">Manage your bank accounts and deposits</p>
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

      {/* Current Accounts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Accounts</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <Card key={account.id} className="relative">
              {isEditing && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => handleDelete(account.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{account.name}</CardTitle>
                  <Badge variant={account.status === "Active" ? "default" : "secondary"}>
                    {account.status}
                  </Badge>
                </div>
                <CardDescription>{account.number}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Balance</span>
                    <span className="font-semibold text-lg">{account.balance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <Badge variant="outline">{account.type}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested Accounts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Suggested for You</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {suggestedAccounts.map((suggestion, index) => (
            <Card key={index} className="border-dashed border-2 border-muted">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus className="h-5 w-5 text-muted-foreground" />
                  {suggestion.name}
                </CardTitle>
                <CardDescription>{suggestion.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Interest Rate</span>
                    <span className="font-semibold text-success">{suggestion.rate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Benefit</span>
                    <span className="text-sm">{suggestion.benefit}</span>
                  </div>
                  <Button className="w-full mt-3" variant="outline">
                    Learn More
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