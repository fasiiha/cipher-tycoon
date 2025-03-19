import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/transactions`;

interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
}

interface TransactionSummary {
  totalAmount: number;
  totalTransactions: number;
}

const transactionRoutes = {
  // Get all transactions
  getTransactions: async () => {
    try {
      const response = await axios.get<Transaction[]>(`${BASE_URL}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific transaction by ID
  getTransaction: async (id: string) => {
    try {
      const response = await axios.get<Transaction>(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get the transaction summary (total amount, total transactions)
  getTransactionSummary: async () => {
    try {
      const response = await axios.get<TransactionSummary>(
        `${BASE_URL}/summary`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default transactionRoutes;
