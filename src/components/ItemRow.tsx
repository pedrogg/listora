import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem } from '@/types';
import { colors } from '@/constants';

interface Props {
  item: ListItem;
  onToggle: () => void;
  onLongPress: () => void;
}

export const ItemRow = ({ item, onToggle, onLongPress }: Props) => (
  <TouchableOpacity style={styles.row} onPress={onToggle} onLongPress={onLongPress}>
    <View style={[styles.checkbox, item.completed && styles.checkboxDone]}>
      {item.completed && <Text style={styles.checkmark}>✓</Text>}
    </View>
    <Text style={[styles.text, item.completed && styles.textDone]}>{item.text}</Text>
    {item.quantity !== undefined && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>x{item.quantity}</Text>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.background,
    fontSize: 13,
    fontWeight: 'bold',
  },
  text: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },
  textDone: {
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  badge: {
    backgroundColor: colors.surface2,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
