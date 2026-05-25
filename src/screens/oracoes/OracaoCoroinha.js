import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const GOLD = '#C89D2A';
const AZUL = '#001830';

const ORACAO =
  'Senhor Jesus,\n' +
  'que me chamaste para te servir no altar,\n' +
  'ajuda-me a ser fiel,\n' +
  'com alegria, reverência e amor.\n' +
  '\n' +
  'Faz de mim um instrumento\n' +
  'da tua paz e da tua presença\n' +
  'na vida da comunidade.\n' +
  '\n' +
  'Amém.';

function DivisorDourado() {
  return (
    <View style={styles.divisor}>
      <View style={styles.linhaDourada} />
      <MaterialCommunityIcons name="cross" size={12} color={GOLD} />
      <View style={styles.linhaDourada} />
    </View>
  );
}

function DecoracaoRamo() {
  return (
    <Image
      source={require('../../../assets/decoracao-ramo.png')}
      style={[styles.decoracaoRamo, styles.decoracaoRamoBlend]}
      contentFit="contain"
      transition={0}
      pointerEvents="none"
    />
  );
}

export default function OracaoCoroinha({ navigation }) {
  const [favorito, setFavorito] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerSide}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="arrow-back" size={24} color={AZUL} />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          Oração do Coroinha
        </Text>

        <TouchableOpacity
          onPress={() => setFavorito((v) => !v)}
          style={styles.headerSide}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={favorito ? 'star' : 'star-outline'}
            size={22}
            color={GOLD}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.ilustracaoContainer}>
          <Image
            source={require('../../../assets/oracao-coroinha.png')}
            style={styles.ilustracao}
            contentFit="cover"
            allowDownscaling={false}
            transition={0}
          />
        </View>

        <Text style={styles.titulo}>Oração do Coroinha</Text>

        <DivisorDourado />

        <Text style={styles.subtitulo}>
          A oração que todo coroinha deve rezar sempre.
        </Text>

        <View style={styles.cardOracao}>
          <MaterialCommunityIcons
            name="hands-pray"
            size={24}
            color={GOLD}
            style={styles.iconeOracao}
          />

          <Text style={styles.textoOracao}>{ORACAO}</Text>

          <DecoracaoRamo />
        </View>

        <View style={styles.cardCitacao}>
          <View style={styles.iconeLivro}>
            <MaterialCommunityIcons
              name="book-open-page-variant"
              size={18}
              color={AZUL}
            />
          </View>

          <View style={styles.citacaoConteudo}>
            <Text style={styles.citacaoTexto}>
              “Servi ao Senhor com alegria.”
            </Text>
            <Text style={styles.citacaoRef}>— Salmo 100</Text>
          </View>
        </View>
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
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 6,
  },

  headerSide: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: AZUL,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    alignItems: 'center',
  },

  ilustracaoContainer: {
    width: '88%',
    aspectRatio: 1024 / 602,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 14,
    alignSelf: 'center',
  },

  ilustracao: {
    width: '100%',
    height: '100%',
  },

  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: AZUL,
    textAlign: 'center',
    marginBottom: 10,
  },

  divisor: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '68%',
    marginBottom: 10,
    gap: 8,
  },

  linhaDourada: {
    flex: 1,
    height: 1,
    backgroundColor: GOLD,
    opacity: 0.7,
  },

  subtitulo: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
    paddingHorizontal: 8,
  },

  cardOracao: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingTop: 20,
    paddingBottom: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: AZUL,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },

  iconeOracao: {
    marginBottom: 10,
  },

  textoOracao: {
    fontSize: 14,
    color: AZUL,
    lineHeight: 24,
    textAlign: 'center',
    paddingBottom: 8,
    paddingHorizontal: 8,
    zIndex: 1,
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      default: 'serif',
    }),
  },

  decoracaoRamo: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 88,
    aspectRatio: 280 / 321,
    opacity: 0.48,
    zIndex: 0,
  },

  decoracaoRamoBlend: {
    // Fundo escuro some no card branco
    blendMode: 'screen',
  },

  cardCitacao: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F3EA',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 10,
  },

  iconeLivro: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8DFD0',
  },

  citacaoConteudo: {
    flex: 1,
  },

  citacaoTexto: {
    fontSize: 13,
    color: AZUL,
    fontStyle: 'italic',
    marginBottom: 2,
    lineHeight: 18,
  },

  citacaoRef: {
    fontSize: 11,
    color: GOLD,
    fontWeight: '600',
  },
});
