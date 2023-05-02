import { useEffect } from 'react';
import { setGlobalColor } from '../helpers/styles';
import type { Theme } from '../Chat';

export default function useCustomTheme (theme?: Theme) {
  useEffect(() => {
    if (theme?.primaryColor) {
      setGlobalColor('--enhancedocs-primary-base', theme.primaryColor);
    }
  }, []);
}
