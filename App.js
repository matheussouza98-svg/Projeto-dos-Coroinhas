import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProviders } from '@/app/providers/AppProviders';
import { RootNavigator } from '@/navigation';

export default function App() {
  return (
    <AppProviders>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AppProviders>
  );
}
