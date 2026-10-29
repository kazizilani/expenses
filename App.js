import React, { useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExpenseProvider, ExpenseContext } from './src/context/ExpenseContext';
import ExpenseForm from './src/components/ExpenseForm';
import ExpenseList from './src/components/ExpenseList';

function MainScreen() {
  const { expenses } = useContext(ExpenseContext);
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Top Bar */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back</Text>
          <Text style={styles.appTitle}>Expenses</Text>
        </View>
        <View style={styles.avatar}>
          <Ionicons name="person" size={18} color="#0F172A" />
        </View>
      </View>

      <View style={styles.content}>
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Total Spending</Text>
          <Text style={styles.heroAmount}>${total.toFixed(2)}</Text>
          <View style={styles.heroFooter}>
            <View style={styles.statBadge}>
              <Ionicons name="swap-vertical" size={14} color="#38BDF8" />
              <Text style={styles.statText}>{expenses.length} Transactions</Text>
            </View>
          </View>
        </View>

        <ExpenseForm />
        <ExpenseList />
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ExpenseProvider>
      <MainScreen />
    </ExpenseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  greeting: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroCard: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 4,
  },
  heroLabel: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  heroAmount: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
    marginVertical: 8,
    letterSpacing: -1,
  },
  heroFooter: {
    flexDirection: 'row',
    marginTop: 4,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 6,
  },
});