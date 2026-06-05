import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStatusBarPadding } from '@/shared/hooks/useStatusBarPadding';

const AZUL = '#001830';

export default function SuporteHeader({ title, navigation, showBack = true }) {
  const paddingTop = useStatusBarPadding(4);

  return (
    <View style={[styles.header, { paddingTop }]}>
      {showBack ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.side}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="arrow-back" size={28} color={AZUL} />
        </TouchableOpacity>
      ) : (
        <View style={styles.side} />
      )}

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.side} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  side: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: AZUL,
    textAlign: 'center',
  },
});
