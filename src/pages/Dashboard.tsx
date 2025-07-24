import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Sparkles } from "lucide-react";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "assistant",
      content: "Hello! I'm your financial assistant. How can I help you manage your finances today?"
    }
  ]);

  const suggestedQuestions = [
    "How much can I save this month?",
    "What's my spending pattern?",
    "Show me my investment portfolio",
    "Calculate my loan EMI",
    "Plan my retirement savings"
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([
        ...chatHistory,
        { type: "user", content: message },
        { 
          type: "assistant", 
          content: "I'm processing your request. This feature will be connected to our AI backend soon!" 
        }
      ]);
      setMessage("");
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome to Affordify
        </h1>
        <p className="text-muted-foreground">
          Your AI-powered financial assistant is here to help
        </p>
      </div>

      <div className="grid gap-6">
        {/* Chat Interface */}
        <Card className="h-96">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Financial Chat Assistant
            </CardTitle>
            <CardDescription>
              Ask me anything about your finances
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Chat Messages */}
            <div className="flex-1 space-y-4 max-h-48 overflow-y-auto">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask about your finances..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!message.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Questions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Questions</CardTitle>
            <CardDescription>
              Try asking these common financial questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-left justify-start h-auto p-3 whitespace-normal"
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-success">₹2,45,680</p>
              <p className="text-sm text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Monthly Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-warning">₹45,230</p>
              <p className="text-sm text-muted-foreground">18% of income</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-info">₹1,25,000</p>
              <p className="text-sm text-muted-foreground">+8.5% returns</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}