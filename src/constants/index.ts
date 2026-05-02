export const STORAGE_KEY = 'listora:lists';

export const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
