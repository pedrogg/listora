import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { ListDetailScreenProps } from '@/types/navigation';
import { useLists } from '@/hooks/useLists';
import { CategorySection } from '@/components/CategorySection';
import { colors } from '@/constants';

export const ListDetailScreen = ({ route }: ListDetailScreenProps) => {
  const { listId, listName } = route.params;
  const { lists, addCategory, deleteCategory, addItem, updateItem, deleteItem } = useLists();

  const list = lists.find((l) => l.id === listId);

  const handleAddCategory = () => {
    Alert.prompt(
      'Nueva sección',
      `Añadir sección a "${listName}"`,
      (name) => {
        if (name?.trim()) addCategory(listId, name.trim());
      },
      'plain-text'
    );
  };

  if (!list) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Lista no encontrada</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <FlatList
          data={list.categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item: category }) => (
            <CategorySection
              category={category}
              listId={listId}
              onAddItem={(text, quantity) => addItem(listId, category.id, text, quantity)}
              onToggleItem={(itemId, completed) =>
                updateItem(listId, category.id, itemId, { completed })
              }
              onDeleteItem={(itemId) => deleteItem(listId, category.id, itemId)}
              onDeleteCategory={() => deleteCategory(listId, category.id)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Sin secciones aún</Text>
              <Text style={styles.emptyHint}>Pulsa ＋ para añadir la primera</Text>
            </View>
          }
          contentContainerStyle={styles.list}
        />
        <TouchableOpacity style={styles.fab} onPress={handleAddCategory}>
          <Text style={styles.fabText}>＋</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.danger,
    fontSize: 16,
  },
  list: {
    paddingBottom: 100,
  },
  empty: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 18,
    marginBottom: 8,
  },
  emptyHint: {
    color: colors.border,
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  fabText: {
    color: colors.background,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '300',
  },
});
