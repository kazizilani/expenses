import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExpenseContext, CATEGORIES } from '../context/ExpenseContext';

export default function ExpenseList() {
  const { expenses, deleteExpense } = useContext(ExpenseContext);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.sectionHeader}>Recent Activity</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          const categoryMeta = CATEGORIES[item.category] || CATEGORIES.Other;
          return (
            <View style={styles.card}>
              <View style={[styles.iconAvatar, { backgroundColor: categoryMeta.color + '1A' }]}>
                <Ionicons name={categoryMeta.icon} size={22} color={categoryMeta.color} />
              </View>
              <View style={styles.details}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtext}>{item.category} • {item.date}</Text>
              </View>
              <View style={styles.rightSection}>
                <Text style={styles.amount}>-${item.amount.toFixed(2)}</Text>
                <TouchableOpacity onPress={() => deleteExpense(item.id)} style={styles.deleteBtn}>
                  <Ionicons name="trash-outline" size={16} color="#94A3B8" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="wallet-outline" size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>No activity recorded yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  iconAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  subtext: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  deleteBtn: {
    marginTop: 6,
    padding: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  emptyText: {
    color: '#94A3B8',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});