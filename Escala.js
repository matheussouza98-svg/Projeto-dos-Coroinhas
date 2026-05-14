import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Escala({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuVisible(v => !v)}
        >
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>

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

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Escala de Serviço - Próximas Missas</Text>

          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>19/03 - Quinta-feira - 19h</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Ofertório: </Text>Matheus e Camila</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Sino: </Text>Matheus</Text>
          </View>

          <View style={styles.eventCard}>
            <Text style={[styles.eventTitle, styles.eventTitleBold]}>21/03 - Sábado - 19h</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Cruz:</Text> Pedro</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Velas:</Text> Ana e Maria</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Servir:</Text> Pedro, Ana e Maria</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Sino:</Text> Pedro</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Missal:</Text> Marina</Text>
          </View>

          <View style={styles.eventCard}>
            <Text style={[styles.eventTitle, styles.eventTitleBold]}>22/03 - Domingo - 08h</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Turíbulo:</Text> Matheus</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Naveta:</Text> Camila</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Cruz:</Text> Pedro</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Velas:</Text> Ana e Maria</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Servir:</Text> Pedro, Ana e Maria</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Sino:</Text> Pedro</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Missal:</Text> Marina</Text>
            <Text style={[styles.eventTitle, styles.eventTitleBold]}>19h</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Cruz:</Text> Pedro</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Velas:</Text> Ana e Maria</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Servir:</Text> Pedro, Ana e Maria</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Sino:</Text> Pedro</Text>
            <Text style={styles.eventText}><Text style={styles.eventLabel}>Missal:</Text> Marina</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 20, position: 'relative' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 12, textAlign: 'center' },
  eventCard: { backgroundColor: '#f2f2f2', borderRadius: 10, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },
  eventLabel: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  menuButton: { position: 'absolute', top: 12, left: 12, padding: 8, zIndex: 20 },
  menuIcon: { color: '#000', fontSize: 26, fontWeight: 'bold' },
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
    zIndex: 10,
    minWidth: 160,
  },
  dropdownItem: { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  dropdownText: { color: '#000', fontSize: 18, fontWeight: 'normal' },
  dropdownTextLarge: { fontSize: 20, fontWeight: 'normal' },
  logoutText: { color: '#fff', fontWeight: 'bold' },
  eventTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 6, color: '#333' },
  eventText: { fontSize: 14, color: '#333', marginBottom: 2 },
  eventTitleBold: { fontWeight: 'bold' },
  content: { flex: 1, marginTop: 20 },
});