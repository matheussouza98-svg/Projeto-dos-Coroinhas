import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ITENS = [
  { label: 'Início', route: 'Inicio' },
  { label: 'Escala', route: 'Escala' },
  { label: 'Orações', route: 'Oracoes' },
  { label: 'Perfil', route: 'Perfil' },
];

export default function MenuNavegacao({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const irPara = (route) => {
    setMenuVisible(false);
    navigation.navigate(route);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuVisible((v) => !v)}
        accessibilityLabel="Abrir menu de navegação"
      >
        <Text style={styles.menuIcon}>≡</Text>
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.dropdownMenu}>
          {ITENS.map((item, index) => (
            <TouchableOpacity
              key={item.route}
              style={[
                styles.dropdownItem,
                index === ITENS.length - 1 && styles.dropdownItemUltimo,
              ]}
              onPress={() => irPara(item.route)}
            >
              <Text style={styles.dropdownText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    padding: 8,
    zIndex: 30,
  },

  menuIcon: {
    color: '#000',
    fontSize: 26,
    fontWeight: 'bold',
  },

  dropdownMenu: {
    position: 'absolute',
    top: 52,
    left: 12,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 25,
    minWidth: 160,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  dropdownItemUltimo: {
    borderBottomWidth: 0,
  },

  dropdownText: {
    color: '#000',
    fontSize: 18,
  },
});
