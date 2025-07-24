export interface AppData {
  dashboard: {
    chatHistory: Array<{ type: string; content: string }>;
    suggestedQuestions: string[];
    stats: {
      totalBalance: string;
      totalBalanceChange: string;
      monthlyExpenses: string;
      monthlyExpensesPercentage: string;
      investments: string;
      investmentReturns: string;
    };
  };
  accounts: Array<{
    id: number;
    name: string;
    type: string;
    balance: string;
    status: string;
  }>;
  suggestedAccounts: Array<{
    id: number;
    name: string;
    type: string;
    benefit: string;
    rate: string;
  }>;
  creditCards: Array<{
    id: number;
    name: string;
    limit: string;
    used: string;
    dueDate: string;
    status: string;
  }>;
  suggestedCreditCards: Array<{
    id: number;
    name: string;
    benefit: string;
    annualFee: string;
  }>;
  loans: Array<{
    id: number;
    type: string;
    bank: string;
    amount: string;
    remaining: string;
    emi: string;
    nextDue: string;
    rate: string;
  }>;
  suggestedLoans: Array<{
    id: number;
    type: string;
    bank: string;
    benefit: string;
    rate: string;
    description: string;
  }>;
  investments: Array<{
    id: number;
    name: string;
    type: string;
    invested: string;
    current: string;
    returns: string;
    sip?: string;
    quantity?: string;
    maturity?: string;
  }>;
  suggestedInvestments: Array<{
    id: number;
    name: string;
    type: string;
    category: string;
    expectedReturn: string;
    minSIP?: string;
    sector?: string;
    benefit?: string;
  }>;
  onboarding: {
    apps: Array<{ name: string; icon: string; connected: boolean }>;
  };
  notifications: Array<{
    id: number;
    title: string;
    message: string;
    type: string;
    time: string;
  }>;
}

export const fetchAppData = async (): Promise<AppData> => {
  try {
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching app data:', error);
    throw error;
  }
};