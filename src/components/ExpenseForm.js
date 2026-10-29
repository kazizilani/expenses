import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExpenseContext, CATEGORIES } from '../context/ExpenseContext';

export default function ExpenseForm() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Food');
  const { addExpense } = useContext(ExpenseContext);

  const handleSubmit = () => {
    if (!title || !amount || isNaN(amount)) return;
    addExpense(title, amount, selectedCategory);
    setTitle('');
    setAmount('');
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Add Transaction</Text>
      
      <View style={styles.inputContainer}>
        <Ionicons name="create-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="What did you pay for?"
          placeholderTextColor="#94A3B8"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.currencyPrefix}>$</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          placeholderTextColor="#94A3B8"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />
      </View>

      {/* Category Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
        {Object.keys(CATEGORIES).map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[
                styles.pill,
                isSelected && { backgroundColor: CATEGORIES[cat].color, borderColor: CATEGORIES[cat].color },
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Ionicons
                name={CATEGORIES[cat].icon}
                size={16}
                color={isSelected ? '#FFF' : '#64748B'}
              />
              <Text style={[styles.pillText, isSelected && styles.pillTextActive]}>{cat}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
        <Ionicons name="add-circle" size={20} color="#FFF" />
        <Text style={styles.submitText}>Save Expense</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  inputIcon: {
    marginRight: 10,
  },
  currencyPrefix: {
    fontSize: 18,
    fontWeight: '700',
    color: '#64748B',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '500',
  },
  categoryRow: {
    marginVertical: 8,
    paddingBottom: 4,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginLeft: 6,
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});