import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Edit, Plus, Trash2, CreditCard } from "lucide-react";
import { fetchAppData, AppData } from "@/lib/api";

export default function CreditCards() {
  const [isEditing, setIsEditing] = useState(false);
  const [cards, setCards] = useState<AppData['creditCards']>([]);
  const [suggestedCards, setSuggestedCards] = useState<AppData['suggestedCreditCards']>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAppData();
        setCards(data.creditCards);
        setSuggestedCards(data.suggestedCreditCards);
      } catch (error) {
        console.error('Error loading credit card data:', error);
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
      setCards(data.creditCards);
      setSuggestedCards(data.suggestedCreditCards);
      alert("Credit card details refreshed!");
    } catch (error) {
      console.error('Error refreshing data:', error);
      alert("Failed to refresh data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto text-center py-8">Loading credit card details...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Credit Cards</h1>
          <p className="text-muted-foreground">Manage your credit cards and spending</p>
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

      {/* Current Credit Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Your Credit Cards</CardTitle>
          <CardDescription>
            All your credit cards and their details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {cards.map((card) => (
              <Card key={card.id} className="relative bg-gradient-to-r from-primary/10 to-primary/5">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        {card.name}
                      </CardTitle>
                    </div>
                    <Badge variant={card.status === "Active" ? "default" : "secondary"}>
                      {card.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Credit Limit</span>
                      <span className="font-medium">{card.limit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Used</span>
                      <span className="font-medium text-warning">{card.used}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Due Date</span>
                      <span className="font-medium">{card.dueDate}</span>
                    </div>
                  </div>
                  {isEditing && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-3"
                      onClick={() => handleDelete(card.id)}
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

      {/* Suggested Credit Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Suggested Credit Cards</CardTitle>
          <CardDescription>
            Recommended credit cards based on your spending pattern
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {suggestedCards.map((card) => (
              <Card key={card.id} className="border-dashed">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    {card.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{card.benefit}</p>
                    <p className="font-semibold text-primary">Annual Fee: {card.annualFee}</p>
                    <Button size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Apply Now
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