import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';

export default function SplashScreen({ navigation }) {

  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    // 🔁 função de loop manual (mais estável que Animated.loop)
    const startRotation = () => {
      rotateAnim.setValue(0);

      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => startRotation());
    };

    startRotation();

    // ⏳ troca de tela
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => {
      clearTimeout(timer);
    };

  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>

      <Image
        source={require('./assets/background.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Animated.Image
        source={require('./assets/loading.png')}
        style={[styles.loading, { transform: [{ rotate }] }]}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C62828',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  loading: {
    width: 35,
    height: 35,
  },
});