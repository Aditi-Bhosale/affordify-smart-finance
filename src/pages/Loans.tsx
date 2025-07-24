import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Edit, Plus, Trash2, Home, Car, GraduationCap } from "lucide-react";
import { fetchAppData, AppData } from "@/lib/api";

export default function Loans() {
  const [isEditing, setIsEditing] = useState(false);
  const [loans, setLoans] = useState<AppData['loans']>([]);
  const [suggestedLoans, setSuggestedLoans] = useState<AppData['suggestedLoans']>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAppData();
        setLoans(data.loans);
        setSuggestedLoans(data.suggestedLoans);
      } catch (error) {
        console.error('Error loading loan data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const data = await fetchAppData();
      setLoans(data.loans);
      setSuggestedLoans(data.suggestedLoans);
      alert("Loan details refreshed!");
    } catch (error) {
      console.error('Error refreshing data:', error);
      alert("Failed to refresh data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setLoans(loans.filter(loan => loan.id !== id));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const getIconForLoanType = (type: string) => {
    switch (type.toLowerCase()) {
      case "home loan":
        return <Home className="h-5 w-5" />;
      case "car loan":
        return <Car className="h-5 w-5" />;
      case "education loan":
        return <GraduationCap className="h-5 w-5" />;
      default:
        return <Home className="h-5 w-5" />;
    }
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto text-center py-8">Loading loan details...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Loan Details</h1>
          <p className="text-muted-foreground">Track your loans and EMIs</p>
        </div>
        <div className="space-x-2">
          <Button onClick={handleRefresh} disabled={loading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          {isEditing ? (
            <Button onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </div>

      {/* Current Loans */}
      <Card>
        <CardHeader>
          <CardTitle>Your Loans</CardTitle>
          <CardDescription>
            All your active loans and their details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {loans.map((loan) => (
              <Card key={loan.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {getIconForLoanType(loan.type)}
                      <div>
                        <CardTitle className="text-lg">{loan.type}</CardTitle>
                        <p className="text-sm text-muted-foreground">{loan.bank}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Rate: {loan.rate}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Amount</span>
                      <p className="font-semibold">{loan.amount}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Remaining</span>
                      <p className="font-semibold text-warning">{loan.remaining}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">EMI</span>
                      <p className="font-semibold text-danger">{loan.emi}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Next Due</span>
                      <p className="font-semibold">{loan.nextDue}</p>
                    </div>
                  </div>
                  {isEditing && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-3"
                      onClick={() => handleDelete(loan.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggested Loans */}
      <Card>
        <CardHeader>
          <CardTitle>Suggested Loans</CardTitle>
          <CardDescription>
            Loan options that might interest you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suggestedLoans.map((loan) => (
              <Card key={loan.id} className="border-dashed">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getIconForLoanType(loan.type)}
                    {loan.type}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{loan.bank}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{loan.benefit}</p>
                    <p className="font-semibold text-primary">Rate: {loan.rate}</p>
                    <p className="text-xs text-muted-foreground">{loan.description}</p>
                    <Button size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}