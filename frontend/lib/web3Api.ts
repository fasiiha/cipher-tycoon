import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/web3`;

interface WalletInfo {
  address: string;
  balance: number;
  transactions: string[];
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
}

const web3Routes = {
  // Connect wallet
  connectWallet: async (walletAddress: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/connect-wallet`, {
        walletAddress,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get wallet information
  getWalletInfo: async () => {
    try {
      const response = await axios.get<WalletInfo>(`${BASE_URL}/wallet-info`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Withdraw cryptocurrency
  withdrawCrypto: async (amount: number, walletAddress: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/withdraw`, {
        amount,
        walletAddress,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Deposit cryptocurrency
  depositCrypto: async (amount: number, walletAddress: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/deposit`, {
        amount,
        walletAddress,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get Web3 transactions
  getWeb3Transactions: async () => {
    try {
      const response = await axios.get<Transaction[]>(
        `${BASE_URL}/transactions`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default web3Routes;
