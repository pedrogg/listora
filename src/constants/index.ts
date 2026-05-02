export const STORAGE_KEY = 'listora:lists';

export const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const colors = {
  background: '#121212',
  surface: '#1E1E1E',
  surface2: '#2A2A2A',
  primary: '#BB86FC',
  primaryDark: '#9A67EA',
  text: '#FFFFFF',
  textSecondary: '#9E9E9E',
  border: '#333333',
  success: '#4CAF50',
  danger: '#CF6679',
};
