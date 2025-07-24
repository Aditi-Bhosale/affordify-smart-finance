import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Edit, Plus, Trash2, CreditCard } from "lucide-react";

export default function CreditCards() {
  const [isEditing, setIsEditing] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "HDFC Regalia",
      number: "****8765",
      limit: "₹3,00,000",
      used: "₹45,230",
      dueDate: "25th Nov",
      status: "Active"
    },
    {
      id: 2,
      name: "ICICI Amazon Pay",
      number: "****4321",
      limit: "₹1,50,000",
      used: "₹22,100",
      dueDate: "15th Nov",
      status: "Active"
    }
  ]);

  const suggestedCards = [
    {
      name: "AXIS Bank Magnus",
      type: "Premium Travel Card",
      cashback: "Up to 25% cashback",
      annualFee: "₹12,500 + GST"
    },
    {
      name: "SBI Cashback Card",
      type: "Cashback Card",
      cashback: "5% on online spends",
      annualFee: "₹999 + GST"
    }
  ];

  const handleRefresh = () => {
    alert("Credit card details refreshed!");
  };

  const handleDelete = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Changes saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Credit Cards</h1>
          <p className="text-muted-foreground">Manage your credit cards and spending</p>
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

      {/* Current Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Credit Cards</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <Card key={card.id} className="relative bg-gradient-to-br from-primary/10 to-info/10">
              {isEditing && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => handleDelete(card.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-primary" />
                    <CardTitle className="text-lg">{card.name}</CardTitle>
                  </div>
                  <Badge variant="default">{card.status}</Badge>
                </div>
                <CardDescription className="text-lg font-mono">
                  {card.number}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Credit Limit</span>
                    <span className="font-semibold">{card.limit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Used Amount</span>
                    <span className="font-semibold text-warning">{card.used}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Due Date</span>
                    <span className="font-semibold">{card.dueDate}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-warning h-2 rounded-full" 
                      style={{ 
                        width: `${(parseInt(card.used.replace(/[₹,]/g, "")) / parseInt(card.limit.replace(/[₹,]/g, ""))) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {((parseInt(card.used.replace(/[₹,]/g, "")) / parseInt(card.limit.replace(/[₹,]/g, ""))) * 100).toFixed(1)}% utilized
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recommended Cards</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {suggestedCards.map((suggestion, index) => (
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
                    <span className="text-sm text-muted-foreground">Cashback</span>
                    <span className="font-semibold text-success">{suggestion.cashback}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Annual Fee</span>
                    <span className="text-sm">{suggestion.annualFee}</span>
                  </div>
                  <Button className="w-full mt-3" variant="outline">
                    Apply Now
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