import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ExpenseContext = createContext();
const STORAGE_KEY = '@expenses_data_v2';

export const CATEGORIES = {
  Food: { icon: 'fast-food-outline', color: '#FF6B6B' },
  Transport: { icon: 'car-outline', color: '#4D96FF' },
  Shopping: { icon: 'bag-handle-outline', color: '#FFD93D' },
  Bills: { icon: 'receipt-outline', color: '#6BCB77' },
  Other: { icon: 'ellipsis-horizontal-outline', color: '#845EC2' },
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) setExpenses(JSON.parse(data));
    } catch (e) {
      console.error(e);
    }
  };

  const saveExpenses = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  };

  const addExpense = (title, amount, category = 'Other') => {
    const newExpense = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
    const updated = [newExpense, ...expenses];
    setExpenses(updated);
    saveExpenses(updated);
  };

  const deleteExpense = (id) => {
    const updated = expenses.filter((item) => item.id !== id);
    setExpenses(updated);
    saveExpenses(updated);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};