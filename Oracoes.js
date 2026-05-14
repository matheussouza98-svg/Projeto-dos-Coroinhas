import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Oracoes({ navigation }) {
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
          <Text style={styles.title}>Orações</Text>

          <Text style={styles.message}>
            A formação do coroinha é um processo fundamental para o serviço litúrgico.
            {'\n\n'}
            Ela envolve o aprendizado dos ritos sagrados, o desenvolvimento espiritual
            e a preparação para auxiliar na celebração da Santa Missa.
          </Text>

          <Text style={styles.sectionTitle}>Conteúdos Essenciais:</Text>

          <View style={styles.contentCard}>
            <Text style={styles.contentTitle}>• Liturgia e Sacramentos</Text>
            <Text style={styles.contentText}>
              Conhecimento dos ritos litúrgicos, significado dos sacramentos, participação ativa na celebração
            </Text>
          </View>

          <View style={styles.contentCard}>
            <Text style={styles.contentTitle}>• Música Sacra</Text>
            <Text style={styles.contentText}>
              Canto gregoriano básico, salmos responsoriais, hinos litúrgicos
            </Text>
          </View>

          <View style={styles.contentCard}>
            <Text style={styles.contentTitle}>• Serviço no Altar</Text>
            <Text style={styles.contentText}>
              Posições e gestos corretos, manipulação dos objetos sagrados, coordenação durante a missa
            </Text>
          </View>

          <View style={styles.contentCard}>
            <Text style={styles.contentTitle}>• Espiritualidade</Text>
            <Text style={styles.contentText}>
              Vida de oração pessoal, devoção eucarística, compromisso com a comunidade
            </Text>
          </View>

          <View style={styles.contentCard}>
            <Text style={styles.contentTitle}>• Disciplina e Pontualidade</Text>
            <Text style={styles.contentText}>
              Preparação espiritual, compromisso com os horários, responsabilidade no serviço
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
  title: { fontSize: 24, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 20 },
  content: { flex: 1, marginTop: 20 },
  message: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 15, textAlign: 'center' },
  contentCard: { backgroundColor: '#f2f2f2', borderRadius: 10, padding: 15, marginBottom: 12, borderWidth: 1, borderColor: '#ccc' },
  contentTitle: { fontSize: 16, fontWeight: 'bold', color: '#C62828', marginBottom: 8 },
  contentText: { fontSize: 14, color: '#333', lineHeight: 20 },
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