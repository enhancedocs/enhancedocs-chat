import { useEffect } from 'react';
import { setGlobalStyle, getHSLFromHex } from '../helpers/styles';
import type { Theme } from '../Chat';

export default function useCustomTheme (theme?: Theme) {
  useEffect(() => {
    if (theme?.primaryColor) {
      const { primaryColor } = theme;
      const hsl = getHSLFromHex(primaryColor);

      setGlobalStyle('--base-color', `${hsl.hue}, ${hsl.saturation}%`);
      setGlobalStyle('--enhancedocs-primary-base', primaryColor);
    }
  }, []);
}
