import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, PiggyBank, Clock } from "lucide-react";

export default function Calculators() {
  // SIP Calculator State
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);

  // Inflation Calculator State
  const [currentAmount, setCurrentAmount] = useState(100000);
  const [inflationRate, setInflationRate] = useState(6);
  const [inflationYears, setInflationYears] = useState(10);

  // Interest Calculator State
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(8);
  const [interestYears, setInterestYears] = useState(5);

  // Retirement Calculator State
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpense, setMonthlyExpense] = useState(50000);
  const [expectedReturn, setExpectedReturn] = useState(10);

  const calculateSIP = () => {
    const monthlyRate = sipRate / 12 / 100;
    const months = sipYears * 12;
    const futureValue = sipAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalInvested = sipAmount * months;
    const returns = futureValue - totalInvested;
    
    return {
      totalInvested: totalInvested.toLocaleString('en-IN'),
      futureValue: Math.round(futureValue).toLocaleString('en-IN'),
      returns: Math.round(returns).toLocaleString('en-IN')
    };
  };

  const calculateInflation = () => {
    const futureValue = currentAmount * Math.pow(1 + inflationRate / 100, inflationYears);
    return {
      futureValue: Math.round(futureValue).toLocaleString('en-IN'),
      difference: Math.round(futureValue - currentAmount).toLocaleString('en-IN')
    };
  };

  const calculateInterest = () => {
    const simpleInterest = (principal * interestRate * interestYears) / 100;
    const compoundInterest = principal * Math.pow(1 + interestRate / 100, interestYears) - principal;
    return {
      simple: Math.round(simpleInterest).toLocaleString('en-IN'),
      compound: Math.round(compoundInterest).toLocaleString('en-IN'),
      totalCompound: Math.round(principal + compoundInterest).toLocaleString('en-IN')
    };
  };

  const calculateRetirement = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const annualExpense = monthlyExpense * 12;
    const retirementCorpus = (annualExpense * 25); // 25x annual expense rule
    const monthlyRate = expectedReturn / 12 / 100;
    const months = yearsToRetirement * 12;
    const requiredSIP = retirementCorpus / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    
    return {
      corpus: Math.round(retirementCorpus).toLocaleString('en-IN'),
      requiredSIP: Math.round(requiredSIP).toLocaleString('en-IN'),
      yearsToRetirement
    };
  };

  const sipResult = calculateSIP();
  const inflationResult = calculateInflation();
  const interestResult = calculateInterest();
  const retirementResult = calculateRetirement();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Financial Calculators</h1>
        <p className="text-muted-foreground">Plan your finances with our comprehensive calculators</p>
      </div>

      <Tabs defaultValue="sip" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sip" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            SIP
          </TabsTrigger>
          <TabsTrigger value="inflation" className="flex items-center gap-2">
            <PiggyBank className="h-4 w-4" />
            Inflation
          </TabsTrigger>
          <TabsTrigger value="interest" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Interest
          </TabsTrigger>
          <TabsTrigger value="retirement" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Retirement
          </TabsTrigger>
        </TabsList>

        {/* SIP Calculator */}
        <TabsContent value="sip">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>SIP Calculator</CardTitle>
                <CardDescription>Calculate your SIP returns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Monthly Investment (₹)</Label>
                  <Input
                    type="number"
                    value={sipAmount}
                    onChange={(e) => setSipAmount(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Expected Return (% p.a.)</Label>
                  <Input
                    type="number"
                    value={sipRate}
                    onChange={(e) => setSipRate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Investment Period (Years)</Label>
                  <Input
                    type="number"
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Invested</span>
                  <span className="font-semibold">₹{sipResult.totalInvested}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Returns</span>
                  <span className="font-semibold text-success">₹{sipResult.returns}</span>
                </div>
                <div className="flex justify-between">
                  <span>Future Value</span>
                  <span className="font-semibold text-primary">₹{sipResult.futureValue}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Inflation Calculator */}
        <TabsContent value="inflation">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Inflation Calculator</CardTitle>
                <CardDescription>See how inflation affects your money</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Current Amount (₹)</Label>
                  <Input
                    type="number"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Inflation Rate (% p.a.)</Label>
                  <Input
                    type="number"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Time Period (Years)</Label>
                  <Input
                    type="number"
                    value={inflationYears}
                    onChange={(e) => setInflationYears(Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Current Value</span>
                  <span className="font-semibold">₹{currentAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Future Value</span>
                  <span className="font-semibold text-warning">₹{inflationResult.futureValue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Inflation Impact</span>
                  <span className="font-semibold text-danger">₹{inflationResult.difference}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Interest Calculator */}
        <TabsContent value="interest">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Interest Calculator</CardTitle>
                <CardDescription>Compare simple vs compound interest</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Principal Amount (₹)</Label>
                  <Input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Interest Rate (% p.a.)</Label>
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Time Period (Years)</Label>
                  <Input
                    type="number"
                    value={interestYears}
                    onChange={(e) => setInterestYears(Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Simple Interest</span>
                  <span className="font-semibold">₹{interestResult.simple}</span>
                </div>
                <div className="flex justify-between">
                  <span>Compound Interest</span>
                  <span className="font-semibold text-success">₹{interestResult.compound}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount (CI)</span>
                  <span className="font-semibold text-primary">₹{interestResult.totalCompound}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Retirement Calculator */}
        <TabsContent value="retirement">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Retirement Calculator</CardTitle>
                <CardDescription>Plan your retirement corpus</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Current Age</Label>
                  <Input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Retirement Age</Label>
                  <Input
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Monthly Expenses (₹)</Label>
                  <Input
                    type="number"
                    value={monthlyExpense}
                    onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Expected Return (% p.a.)</Label>
                  <Input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Years to Retirement</span>
                  <span className="font-semibold">{retirementResult.yearsToRetirement}</span>
                </div>
                <div className="flex justify-between">
                  <span>Required Corpus</span>
                  <span className="font-semibold text-primary">₹{retirementResult.corpus}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly SIP Required</span>
                  <span className="font-semibold text-success">₹{retirementResult.requiredSIP}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}