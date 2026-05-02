import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { List } from '@/types';
import { colors } from '@/constants';

interface Props {
  list: List;
  onPress: () => void;
  onLongPress: () => void;
}

export const ListCard = ({ list, onPress, onLongPress }: Props) => {
  const totalItems = list.categories.reduce((sum, c) => sum + c.items.length, 0);
  const completedItems = list.categories.reduce(
    (sum, c) => sum + c.items.filter((i) => i.completed).length,
    0
  );

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} onLongPress={onLongPress}>
      <Text style={styles.name}>{list.name}</Text>
      <View style={styles.footer}>
        <Text style={styles.meta}>{list.categories.length} secciones</Text>
        <Text style={styles.meta}>
          {completedItems}/{totalItems} ítems
        </Text>
      </View>
      {totalItems > 0 && (
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(completedItems / totalItems) * 100}%` },
            ]}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  progressBar: {
    height: 3,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});
