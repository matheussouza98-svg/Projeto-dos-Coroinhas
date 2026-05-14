import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

export default function Inicio({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* HEADER PERSONALIZADO */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setMenuVisible(v => !v)}
          >
            <Text style={styles.menuIcon}>≡</Text>
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.titleHeader}>
              Olá, Matheus <Text style={{ fontSize: 18 }}>👋</Text>
            </Text>

            <Text style={styles.subtitleHeader}>
              Que bom ter você aqui.
            </Text>

            {/* 🔵 QUADRADO AZUL */}
            <View style={styles.blueCard}>
              <Text style={styles.cardTitle}>
                Próxima Missa
              </Text>

              {/* ⚪ QUADRADO BRANCO */}
              <View style={styles.whiteBox} />

            </View>

          </View>
        </View>

        {/* MENU DROPDOWN */}
        {menuVisible && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Inicio');
              }}
            >
              <Text style={[styles.dropdownText, styles.dropdownTextLarge]}>Início</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Escala');
              }}
            >
              <Text style={[styles.dropdownText, styles.dropdownTextLarge]}>Escala</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Oracoes');
              }}
            >
              <Text style={[styles.dropdownText, styles.dropdownTextLarge]}>Orações</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Perfil');
              }}
            >
              <Text style={[styles.dropdownText, styles.dropdownTextLarge]}>Perfil</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* CONTEÚDO */}
        <View style={styles.content}>
          <Text style={styles.welcome}>Seja bem-vindo(a)!</Text>
          <Text style={styles.subtitle}>É um prazer ter você aqui.</Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  whiteBox: {
  marginTop: 12,
  backgroundColor: '#fff',
  borderRadius: 10,

  width: 80,   // 👈 menor
  height: 70,   // 👈 menor

  alignSelf: 'center',
},

  menuButton: {
    padding: 8,
    marginRight: 10,
  },

  menuIcon: {
    color: '#000',
    fontSize: 26,
    fontWeight: 'bold',
  },

  headerText: {
    flex: 1,
  },

  titleHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001830',
  },

  subtitleHeader: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },

  /* 🔵 QUADRADO AZUL */
  blueCard: {
    marginTop: 12,
    backgroundColor: '#001830',
    padding: 16,
    borderRadius: 12,

    width: '90%',
    height: 160,

    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  /* ⚪ QUADRADO BRANCO */
  whiteBox: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 10,

    width: '100%',
    height: 90,
  },

  /* DROPDOWN */
  dropdownMenu: {
    position: 'absolute',
    top: 70,
    left: 12,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 10,
    minWidth: 160,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  dropdownText: {
    color: '#000',
    fontSize: 18,
  },

  dropdownTextLarge: {
    fontSize: 20,
  },

  /* CONTEÚDO */
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    color: '#000',
    marginTop: 8,
    textAlign: 'center',
  },
});