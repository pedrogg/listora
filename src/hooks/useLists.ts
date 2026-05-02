import { useState, useEffect, useCallback } from 'react';
import { List } from '@/types';
import * as storage from '@/services/storage';

export const useLists = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLists = useCallback(async () => {
    try {
      setLoading(true);
      const data = await storage.getLists();
      setLists(data);
    } catch {
      setError('No se pudieron cargar las listas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLists();
  }, [loadLists]);

  const createList = async (name: string) => {
    const newList = await storage.createList(name);
    setLists((prev) => [...prev, newList]);
  };

  const updateListName = async (listId: string, name: string) => {
    await storage.updateListName(listId, name);
    setLists((prev) =>
      prev.map((l) => (l.id === listId ? { ...l, name, updatedAt: Date.now() } : l))
    );
  };

  const deleteList = async (listId: string) => {
    await storage.deleteList(listId);
    setLists((prev) => prev.filter((l) => l.id !== listId));
  };

  const addCategory = async (listId: string, name: string) => {
    const newCategory = await storage.addCategory(listId, name);
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? { ...l, categories: [...l.categories, newCategory], updatedAt: Date.now() }
          : l
      )
    );
  };

  const updateCategoryName = async (listId: string, categoryId: string, name: string) => {
    await storage.updateCategoryName(listId, categoryId, name);
    setLists((prev) =>
      prev.map((l) => {
        if (l.id !== listId) return l;
        return {
          ...l,
          updatedAt: Date.now(),
          categories: l.categories.map((c) =>
            c.id === categoryId ? { ...c, name } : c
          ),
        };
      })
    );
  };

  const deleteCategory = async (listId: string, categoryId: string) => {
    await storage.deleteCategory(listId, categoryId);
    setLists((prev) =>
      prev.map((l) => {
        if (l.id !== listId) return l;
        return {
          ...l,
          updatedAt: Date.now(),
          categories: l.categories.filter((c) => c.id !== categoryId),
        };
      })
    );
  };

  const addItem = async (
    listId: string,
    categoryId: string,
    text: string,
    quantity?: number
  ) => {
    const newItem = await storage.addItem(listId, categoryId, text, quantity);
    setLists((prev) =>
      prev.map((l) => {
        if (l.id !== listId) return l;
        return {
          ...l,
          updatedAt: Date.now(),
          categories: l.categories.map((c) =>
            c.id === categoryId ? { ...c, items: [...c.items, newItem] } : c
          ),
        };
      })
    );
  };

  const updateItem = async (
    listId: string,
    categoryId: string,
    itemId: string,
    changes: Partial<Pick<import('@/types').ListItem, 'text' | 'completed' | 'quantity'>>
  ) => {
    await storage.updateItem(listId, categoryId, itemId, changes);
    setLists((prev) =>
      prev.map((l) => {
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
      })
    );
  };

  const deleteItem = async (listId: string, categoryId: string, itemId: string) => {
    await storage.deleteItem(listId, categoryId, itemId);
    setLists((prev) =>
      prev.map((l) => {
        if (l.id !== listId) return l;
        return {
          ...l,
          updatedAt: Date.now(),
          categories: l.categories.map((c) => {
            if (c.id !== categoryId) return c;
            return { ...c, items: c.items.filter((i) => i.id !== itemId) };
          }),
        };
      })
    );
  };

  return {
    lists,
    loading,
    error,
    createList,
    updateListName,
    deleteList,
    addCategory,
    updateCategoryName,
    deleteCategory,
    addItem,
    updateItem,
    deleteItem,
  };
};
