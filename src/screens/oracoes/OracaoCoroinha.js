import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useStatusBarPadding } from '../../utils/safeArea';

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
      <MaterialCommunityIcons name="cross" size={14} color={GOLD} />
      <View style={styles.linhaDourada} />
    </View>
  );
}
function DecoracaoRamo() {
  return (
    <Image
      source={require('../../../assets/decoracao-ramo.png')}
      style={styles.decoracaoRamo}
      contentFit="contain"
      transition={0}
      pointerEvents="none"
    />
  );
}

export default function OracaoCoroinha({ navigation }) {
  const headerPaddingTop = useStatusBarPadding(4);

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <View style={[styles.header, { paddingTop: headerPaddingTop }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerSide}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="arrow-back" size={28} color={AZUL} />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          Oração do Coroinha
        </Text>

        <View style={styles.headerSide} />
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

        <Text style={styles.titulo}>Servindo com Fé</Text>

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
    justifyContent: 'space-between',

    paddingHorizontal: 16,
    paddingBottom: 2,
    marginBottom: 4,
  },

  headerSide: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',

    fontSize: 17,
    fontWeight: '700',

    color: AZUL,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  ilustracaoContainer: {
    width: '82%',
    aspectRatio: 1024 / 602,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 18,
    alignSelf: 'center',
  },

  ilustracao: {
    width: '100%',
    alignSelf: 'center',
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
    justifyContent: 'center',
    alignSelf: 'center',

    width: '78%',
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
    marginTop: 2,
    marginBottom: 14,
    paddingHorizontal: 8,
  },

  cardOracao: {
    width: '100%',

    backgroundColor: '#FFFDF8',
    borderRadius: 12,

    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,

    marginTop: 8,
    marginBottom: 12,

    alignItems: 'center',
    overflow: 'hidden',

    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,

    borderWidth: 1,
    borderColor: '#F3E7C7',
  },

  iconeOracao: {
    marginBottom: 10,
  },

  textoOracao: {
    fontSize: 16,
    color: AZUL,

    lineHeight: 30,
    textAlign: 'center',

    paddingBottom: 6,
    paddingHorizontal: 18,

    maxWidth: '88%',

    zIndex: 1,

    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      default: 'serif',
    }),
  },

  decoracaoRamo: {
    position: 'absolute',

    right: -10,
    bottom: -8,

    width: 135,
    height: 135,

    opacity: 0.9,

    tintColor: '#D4AF37',

    zIndex: 0,

    transform: [{ rotate: '-6deg' }],
  },

  cardCitacao: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F3EA',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 14,
  },

  iconeLivro: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
