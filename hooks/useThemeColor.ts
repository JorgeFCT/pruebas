import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';

  console.log("Current theme:", theme); // Depuración
  console.log("Colors Object:", Colors);

  // Validar que el tema existe en Colors
  if (!Colors[theme]) {
    throw new Error(`Theme "${theme}" is not defined in Colors.`);
  }

  // Validar que el color existe dentro del tema seleccionado
  if (!(colorName in Colors[theme])) {
    throw new Error(`Color "${colorName}" is not found in Colors.${theme}.`);
  }

  const colorFromProps = props[theme];

  return colorFromProps || Colors[theme][colorName];
}