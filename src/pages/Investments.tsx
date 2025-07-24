import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Edit, Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { fetchAppData, AppData } from "@/lib/api";

export default function Investments() {
  const [isEditing, setIsEditing] = useState(false);
  const [investments, setInvestments] = useState<AppData['investments']>([]);
  const [suggestedInvestments, setSuggestedInvestments] = useState<AppData['suggestedInvestments']>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAppData();
        setInvestments(data.investments);
        setSuggestedInvestments(data.suggestedInvestments);
      } catch (error) {
        console.error('Error loading investment data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalInvested = investments.reduce((sum, inv) => sum + parseInt(inv.invested.replace(/[₹,]/g, "")), 0);
  const totalCurrent = investments.reduce((sum, inv) => sum + parseInt(inv.current.replace(/[₹,]/g, "")), 0);
  const totalReturns = totalCurrent - totalInvested;
  const returnPercentage = totalInvested > 0 ? ((totalReturns / totalInvested) * 100).toFixed(1) : "0";

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const data = await fetchAppData();
      setInvestments(data.investments);
      setSuggestedInvestments(data.suggestedInvestments);
      alert("Investment details refreshed!");
    } catch (error) {
      console.error('Error refreshing data:', error);
      alert("Failed to refresh data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setInvestments(investments.filter(inv => inv.id !== id));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto text-center py-8">Loading investment details...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Investments</h1>
          <p className="text-muted-foreground">Track your mutual funds and stocks</p>
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

      {/* Portfolio Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{totalInvested.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Current Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-info">₹{totalCurrent.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${totalReturns >= 0 ? 'text-success' : 'text-danger'}`}>
              {totalReturns >= 0 ? '+' : ''}₹{totalReturns.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              {totalReturns >= 0 ? '+' : ''}{returnPercentage}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Current Investments */}
      <Card>
        <CardHeader>
          <CardTitle>Your Investments</CardTitle>
          <CardDescription>
            All your mutual funds, stocks and other investments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {investments.map((investment) => (
              <Card key={investment.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{investment.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{investment.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {investment.returns.startsWith('+') ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-danger" />
                      )}
                      <Badge 
                        variant={investment.returns.startsWith('+') ? "default" : "destructive"}
                      >
                        {investment.returns}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Invested</span>
                      <p className="font-semibold">{investment.invested}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Current Value</span>
                      <p className="font-semibold">{investment.current}</p>
                    </div>
                    {investment.sip && (
                      <div>
                        <span className="text-muted-foreground">SIP</span>
                        <p className="font-semibold">{investment.sip}</p>
                      </div>
                    )}
                    {investment.quantity && (
                      <div>
                        <span className="text-muted-foreground">Quantity</span>
                        <p className="font-semibold">{investment.quantity}</p>
                      </div>
                    )}
                    {investment.maturity && (
                      <div>
                        <span className="text-muted-foreground">Maturity</span>
                        <p className="font-semibold">{investment.maturity}</p>
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-3"
                      onClick={() => handleDelete(investment.id)}
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

      {/* Suggested Investments */}
      <Card>
        <CardHeader>
          <CardTitle>Suggested Investments</CardTitle>
          <CardDescription>
            Investment opportunities based on your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {suggestedInvestments.map((investment) => (
              <Card key={investment.id} className="border-dashed">
                <CardHeader>
                  <CardTitle className="text-lg">{investment.name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">{investment.type}</Badge>
                    <Badge variant="secondary">{investment.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-semibold text-primary">Expected Return: {investment.expectedReturn}</p>
                    {investment.minSIP && (
                      <p className="text-sm text-muted-foreground">Min SIP: {investment.minSIP}</p>
                    )}
                    {investment.sector && (
                      <p className="text-sm text-muted-foreground">Sector: {investment.sector}</p>
                    )}
                    {investment.benefit && (
                      <p className="text-sm text-muted-foreground">{investment.benefit}</p>
                    )}
                    <Button size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Invest Now
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