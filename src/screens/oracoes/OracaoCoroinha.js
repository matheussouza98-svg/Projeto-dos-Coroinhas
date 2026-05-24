import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ORACOES = [
  {
    titulo: 'Servos do Altar',
    texto:
      'Senhor Jesus Cristo,\n' +
      'quero servir ao teu altar com amor e dedicação.\n' +
      'Ajuda-me a ser obediente, humilde e fiel.\n' +
      'Que eu possa servir com alegria em cada celebração.\n' +
      'Abençoa minha família e todos os coroinhas.\n' +
      'Amém.',
  },
  {
    titulo: 'Oração antes da Missa',
    texto:
      'Senhor, prepara meu coração para esta celebração.\n' +
      'Que eu sirva com atenção, respeito e amor.\n' +
      'Ajuda-me a cumprir bem minha função no altar.\n' +
      'Amém.',
  },
  {
    titulo: 'Oração depois da Missa',
    texto:
      'Obrigado, Senhor, por me permitir servir ao teu altar.\n' +
      'Que eu continue seguindo teus ensinamentos todos os dias.\n' +
      'Amém.',
  },
];

export default function OracaoCoroinha({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={32} color="#001830" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Oração do Coroinha</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}
      >
        {ORACOES.map((oracao, index) => (
          <View style={styles.blocoWrapper} key={oracao.titulo}>
            {index > 0 ? <View style={styles.divisor} /> : null}

            <View style={styles.bloco}>
              <Text style={styles.tituloOracao}>{oracao.titulo}</Text>
              <Text style={styles.textoOracao}>{oracao.texto}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },

  backButton: {
    marginRight: 8,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#001830',
    marginRight: 40,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 120,
    alignItems: 'center',
  },

  blocoWrapper: {
    width: '100%',
    alignItems: 'center',
  },

  divisor: {
    width: '100%',
    height: 1,
    backgroundColor: '#D1D5DB',
    marginBottom: 32,
  },

  bloco: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },

  tituloOracao: {
    fontSize: 20,
    fontWeight: '700',
    color: '#001830',
    textAlign: 'center',
    marginBottom: 16,
  },

  textoOracao: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 26,
    textAlign: 'center',
  },
});
