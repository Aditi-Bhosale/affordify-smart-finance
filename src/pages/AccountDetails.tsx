import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Edit, Plus, Trash2 } from "lucide-react";
import { fetchAppData, AppData } from "@/lib/api";

export default function AccountDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [accounts, setAccounts] = useState<AppData['accounts']>([]);
  const [suggestedAccounts, setSuggestedAccounts] = useState<AppData['suggestedAccounts']>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAppData();
        setAccounts(data.accounts);
        setSuggestedAccounts(data.suggestedAccounts);
      } catch (error) {
        console.error('Error loading account data:', error);
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
      setAccounts(data.accounts);
      setSuggestedAccounts(data.suggestedAccounts);
      alert("Account details refreshed!");
    } catch (error) {
      console.error('Error refreshing data:', error);
      alert("Failed to refresh data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto text-center py-8">Loading account details...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Account Details</h1>
          <p className="text-muted-foreground">Manage your bank accounts and finances</p>
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

      {/* Current Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Your Accounts</CardTitle>
          <CardDescription>
            All your connected bank accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account) => (
              <Card key={account.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{account.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{account.type}</p>
                    </div>
                    <Badge variant={account.status === "Active" ? "default" : "secondary"}>
                      {account.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-success">{account.balance}</p>
                  </div>
                  {isEditing && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-3"
                      onClick={() => handleDelete(account.id)}
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

      {/* Suggested Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Suggested Accounts</CardTitle>
          <CardDescription>
            Recommended accounts to open for better savings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {suggestedAccounts.map((account) => (
              <Card key={account.id} className="border-dashed">
                <CardHeader>
                  <CardTitle className="text-lg">{account.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{account.type}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{account.benefit}</p>
                    <p className="font-semibold text-primary">{account.rate}</p>
                    <Button size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Account
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