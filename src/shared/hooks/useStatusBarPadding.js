import { Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const MIN_STATUS_BAR_PADDING = 40;
export const STATUS_BAR_EXTRA = 8;

export function getStatusBarPadding(insets, extra = STATUS_BAR_EXTRA) {
  const statusBar =
    Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

  return Math.max(insets.top, statusBar, MIN_STATUS_BAR_PADDING) + extra;
}

export function useStatusBarPadding(extra = STATUS_BAR_EXTRA) {
  const insets = useSafeAreaInsets();
  return getStatusBarPadding(insets, extra);
}
