import { useColorScheme as useNativeColorScheme } from 'react-native';

export function useColorScheme() {
  return useNativeColorScheme() || 'light'; // Si es null, usar 'light' por defecto
}