import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Animated, Easing, Text } from 'react-native';

export default function SplashScreen({ navigation }) {

  const [ready, setReady] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    // 🔥 garante que tudo só aparece depois de montar a tela
    setReady(true);

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

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);

  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (!ready) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>

      <View style={styles.center}>

        <Image
          source={require('@assets/background.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.text1}>Organizando</Text>

        <Text style={styles.text2}>
          quem serve com <Text style={styles.destaque}>fé.</Text>
        </Text>

        <Animated.Image
          source={require('@assets/loading.png')}
          style={[styles.loading, { transform: [{ rotate }] }]}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#001830',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },

  text1: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },

  text2: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 45,
  },

  destaque: {
    color: '#C89D2A',
    fontWeight: 'bold',
  },

  loading: {
    width: 35,
    height: 35,
  },
});