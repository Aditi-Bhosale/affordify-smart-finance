import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Edit, Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react";

export default function Investments() {
  const [isEditing, setIsEditing] = useState(false);
  const [investments, setInvestments] = useState([
    {
      id: 1,
      name: "HDFC Equity Fund",
      type: "Mutual Fund",
      invested: "₹1,50,000",
      current: "₹1,68,750",
      returns: "+12.5%",
      returnAmount: "+₹18,750",
      isPositive: true
    },
    {
      id: 2,
      name: "Reliance Industries",
      type: "Stock",
      invested: "₹75,000",
      current: "₹82,500",
      returns: "+10.0%",
      returnAmount: "+₹7,500",
      isPositive: true
    },
    {
      id: 3,
      name: "SBI Blue Chip Fund",
      type: "Mutual Fund",
      invested: "₹1,00,000",
      current: "₹96,500",
      returns: "-3.5%",
      returnAmount: "-₹3,500",
      isPositive: false
    }
  ]);

  const suggestedInvestments = [
    {
      name: "ICICI Prudential Technology Fund",
      type: "Sector Fund",
      minInvestment: "₹5,000",
      returns: "15.8% (3Y)",
      rating: "5★",
      riskLevel: "High"
    },
    {
      name: "Axis Long Term Equity Fund",
      type: "ELSS",
      minInvestment: "₹500",
      returns: "12.3% (5Y)",
      rating: "4★",
      riskLevel: "Moderate"
    }
  ];

  const totalInvested = investments.reduce((sum, inv) => sum + parseInt(inv.invested.replace(/[₹,]/g, "")), 0);
  const totalCurrent = investments.reduce((sum, inv) => sum + parseInt(inv.current.replace(/[₹,]/g, "")), 0);
  const totalReturns = totalCurrent - totalInvested;
  const totalReturnPercent = ((totalReturns / totalInvested) * 100).toFixed(2);

  const handleRefresh = () => {
    alert("Investment details refreshed!");
  };

  const handleDelete = (id: number) => {
    setInvestments(investments.filter(inv => inv.id !== id));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Changes saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Investments</h1>
          <p className="text-muted-foreground">Track your mutual funds and stocks</p>
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

      {/* Portfolio Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{totalInvested.toLocaleString('en-IN')}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Current Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{totalCurrent.toLocaleString('en-IN')}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${totalReturns >= 0 ? 'text-success' : 'text-danger'}`}>
              {totalReturns >= 0 ? '+' : ''}₹{Math.abs(totalReturns).toLocaleString('en-IN')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Return %</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${totalReturns >= 0 ? 'text-success' : 'text-danger'}`}>
              {totalReturns >= 0 ? '+' : ''}{totalReturnPercent}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Current Investments */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Portfolio</h2>
        <div className="grid gap-4">
          {investments.map((investment) => (
            <Card key={investment.id} className="relative">
              {isEditing && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => handleDelete(investment.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{investment.name}</CardTitle>
                    <CardDescription>{investment.type}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {investment.isPositive ? (
                      <TrendingUp className="h-5 w-5 text-success" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-danger" />
                    )}
                    <Badge 
                      variant={investment.isPositive ? "default" : "destructive"}
                      className={investment.isPositive ? "bg-success text-success-foreground" : ""}
                    >
                      {investment.returns}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Invested</p>
                    <p className="text-lg font-semibold">{investment.invested}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Value</p>
                    <p className="text-lg font-semibold">{investment.current}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Returns</p>
                    <p className={`text-lg font-semibold ${investment.isPositive ? 'text-success' : 'text-danger'}`}>
                      {investment.returnAmount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Return %</p>
                    <p className={`text-lg font-semibold ${investment.isPositive ? 'text-success' : 'text-danger'}`}>
                      {investment.returns}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested Investments */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {suggestedInvestments.map((suggestion, index) => (
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
                    <span className="text-sm text-muted-foreground">Min Investment</span>
                    <span className="font-semibold">{suggestion.minInvestment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Returns</span>
                    <span className="font-semibold text-success">{suggestion.returns}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <span className="font-semibold">{suggestion.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Risk Level</span>
                    <Badge variant="outline">{suggestion.riskLevel}</Badge>
                  </div>
                  <Button className="w-full mt-3" variant="outline">
                    Invest Now
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