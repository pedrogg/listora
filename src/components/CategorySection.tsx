import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Category } from '@/types';
import { colors } from '@/constants';
import { ItemRow } from './ItemRow';

interface Props {
  category: Category;
  listId: string;
  onAddItem: (text: string, quantity?: number) => void;
  onToggleItem: (itemId: string, completed: boolean) => void;
  onDeleteItem: (itemId: string) => void;
  onDeleteCategory: () => void;
}

export const CategorySection = ({
  category,
  onAddItem,
  onToggleItem,
  onDeleteItem,
  onDeleteCategory,
}: Props) => {
  const [expanded, setExpanded] = useState(true);

  const handleAddItem = () => {
    Alert.prompt(
      'Nuevo ítem',
      `Añadir a "${category.name}"`,
      (text) => {
        if (text?.trim()) onAddItem(text.trim());
      },
      'plain-text'
    );
  };

  const handleDeleteCategory = () => {
    Alert.alert(
      'Eliminar sección',
      `¿Eliminar "${category.name}" y todos sus ítems?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: onDeleteCategory },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded((v) => !v)}
        onLongPress={handleDeleteCategory}
      >
        <Text style={styles.arrow}>{expanded ? '▾' : '▸'}</Text>
        <Text style={styles.title}>{category.name}</Text>
        <Text style={styles.count}>{category.items.length}</Text>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddItem}>
          <Text style={styles.addBtnText}>＋</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.items}>
          {category.items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              onToggle={() => onToggleItem(item.id, !item.completed)}
              onLongPress={() =>
                Alert.alert('Eliminar ítem', `¿Eliminar "${item.text}"?`, [
                  { text: 'Cancelar', style: 'cancel' },
                  { text: 'Eliminar', style: 'destructive', onPress: () => onDeleteItem(item.id) },
                ])
              }
            />
          ))}
          {category.items.length === 0 && (
            <Text style={styles.empty}>Sin ítems — pulsa ＋ para añadir</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: colors.surface2,
  },
  arrow: {
    color: colors.primary,
    fontSize: 16,
    marginRight: 8,
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  count: {
    color: colors.textSecondary,
    fontSize: 13,
    marginRight: 12,
  },
  addBtn: {
    padding: 4,
  },
  addBtnText: {
    color: colors.primary,
    fontSize: 20,
    lineHeight: 22,
  },
  items: {
    paddingHorizontal: 14,
    paddingBottom: 4,
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 13,
    paddingVertical: 12,
    textAlign: 'center',
  },
});
