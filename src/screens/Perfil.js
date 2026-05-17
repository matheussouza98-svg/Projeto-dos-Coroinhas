import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function Perfil({ navigation }) {
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
        
        <Text style={styles.title}>Perfil</Text>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Notificações</Text>
            <Text style={styles.cardText}>
              Ajuste como e quando deseja receber alertas sobre mensagens, eventos e novidades.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Privacidade</Text>
            <Text style={styles.cardText}>
              Gerencie quem vê suas informações e controle o acesso aos seus dados.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Conta</Text>
            <Text style={styles.cardText}>
              Atualize seu e-mail, senha ou outras informações pessoais da sua conta.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Aparência</Text>
            <Text style={styles.cardText}>
              Escolha o tema e as preferências visuais do aplicativo.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Suporte</Text>
            <Text style={styles.cardText}>
              Encontre ajuda, perguntas frequentes e instruções para usar o app.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 20, position: 'relative' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#000', marginBottom: 20, textAlign: 'center' },
  content: { flex: 1, marginTop: 10 },
  card: { backgroundColor: '#f7f7f7', borderRadius: 12, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#ddd' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 8 },
  cardText: { fontSize: 15, color: '#444', lineHeight: 22 },
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
});