import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { HomeScreenProps } from '@/types/navigation';
import { useLists } from '@/hooks/useLists';
import { ListCard } from '@/components/ListCard';
import { InputModal } from '@/components/InputModal';
import { colors } from '@/constants';

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { lists, loading, createList, deleteList } = useLists();
  const [modalVisible, setModalVisible] = useState(false);

  const handleCreate = (name: string) => {
    createList(name);
    setModalVisible(false);
  };

  const handleDelete = (listId: string, listName: string) => {
    Alert.alert('Eliminar lista', `¿Eliminar "${listName}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => deleteList(listId) },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.heading}>Mis listas</Text>
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListCard
              list={item}
              onPress={() =>
                navigation.navigate('ListDetail', { listId: item.id, listName: item.name })
              }
              onLongPress={() => handleDelete(item.id, item.name)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No tienes listas aún</Text>
              <Text style={styles.emptyHint}>Pulsa ＋ para crear la primera</Text>
            </View>
          }
          contentContainerStyle={styles.list}
        />
        <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
          <Text style={styles.fabText}>＋</Text>
        </TouchableOpacity>
      </View>

      <InputModal
        visible={modalVisible}
        title="Nueva lista"
        placeholder="Nombre de la lista"
        onConfirm={handleCreate}
        onCancel={() => setModalVisible(false)}
      />
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
  },
  heading: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 100,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 16,
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
