import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PerfilSessionProvider } from '@/features/perfil/context';

export function AppProviders({ children }) {
  return (
    <SafeAreaProvider>
      <PerfilSessionProvider>{children}</PerfilSessionProvider>
    </SafeAreaProvider>
  );
}
