import AsyncStorage from '@react-native-async-storage/async-storage';
import { List, Category, ListItem } from '@/types';
import { STORAGE_KEY, generateId } from '@/constants';

// --- Listas ---

export const getLists = async (): Promise<List[]> => {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
};

const saveLists = async (lists: List[]): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
};

export const createList = async (name: string): Promise<List> => {
  const lists = await getLists();
  const newList: List = {
    id: generateId(),
    name,
    categories: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  await saveLists([...lists, newList]);
  return newList;
};

export const updateListName = async (listId: string, name: string): Promise<void> => {
  const lists = await getLists();
  const updated = lists.map((l) =>
    l.id === listId ? { ...l, name, updatedAt: Date.now() } : l
  );
  await saveLists(updated);
};

export const deleteList = async (listId: string): Promise<void> => {
  const lists = await getLists();
  await saveLists(lists.filter((l) => l.id !== listId));
};

// --- Categorías ---

export const addCategory = async (listId: string, name: string): Promise<Category> => {
  const lists = await getLists();
  const newCategory: Category = { id: generateId(), name, items: [] };
  const updated = lists.map((l) =>
    l.id === listId
      ? { ...l, categories: [...l.categories, newCategory], updatedAt: Date.now() }
      : l
  );
  await saveLists(updated);
  return newCategory;
};

export const updateCategoryName = async (
  listId: string,
  categoryId: string,
  name: string
): Promise<void> => {
  const lists = await getLists();
  const updated = lists.map((l) => {
    if (l.id !== listId) return l;
    return {
      ...l,
      updatedAt: Date.now(),
      categories: l.categories.map((c) =>
        c.id === categoryId ? { ...c, name } : c
      ),
    };
  });
  await saveLists(updated);
};

export const deleteCategory = async (listId: string, categoryId: string): Promise<void> => {
  const lists = await getLists();
  const updated = lists.map((l) => {
    if (l.id !== listId) return l;
    return {
      ...l,
      updatedAt: Date.now(),
      categories: l.categories.filter((c) => c.id !== categoryId),
    };
  });
  await saveLists(updated);
};

// --- Ítems ---

export const addItem = async (
  listId: string,
  categoryId: string,
  text: string,
  quantity?: number
): Promise<ListItem> => {
  const lists = await getLists();
  const newItem: ListItem = {
    id: generateId(),
    text,
    completed: false,
    quantity,
    createdAt: Date.now(),
  };
  const updated = lists.map((l) => {
    if (l.id !== listId) return l;
    return {
      ...l,
      updatedAt: Date.now(),
      categories: l.categories.map((c) =>
        c.id === categoryId ? { ...c, items: [...c.items, newItem] } : c
      ),
    };
  });
  await saveLists(updated);
  return newItem;
};

export const updateItem = async (
  listId: string,
  categoryId: string,
  itemId: string,
  changes: Partial<Pick<ListItem, 'text' | 'completed' | 'quantity'>>
): Promise<void> => {
  const lists = await getLists();
  const updated = lists.map((l) => {
    if (l.id !== listId) return l;
    return {
      ...l,
      updatedAt: Date.now(),
      categories: l.categories.map((c) => {
        if (c.id !== categoryId) return c;
        return {
          ...c,
          items: c.items.map((i) => (i.id === itemId ? { ...i, ...changes } : i)),
        };
      }),
    };
  });
  await saveLists(updated);
};

export const deleteItem = async (
  listId: string,
  categoryId: string,
  itemId: string
): Promise<void> => {
  const lists = await getLists();
  const updated = lists.map((l) => {
    if (l.id !== listId) return l;
    return {
      ...l,
      updatedAt: Date.now(),
      categories: l.categories.map((c) => {
        if (c.id !== categoryId) return c;
        return { ...c, items: c.items.filter((i) => i.id !== itemId) };
      }),
    };
  });
  await saveLists(updated);
};
