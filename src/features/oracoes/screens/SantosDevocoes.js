import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useStatusBarPadding } from '@/shared/hooks/useStatusBarPadding';

const AZUL = '#001830';
const DOURADO = '#C89D2A';
const CINZA_TEXTO = '#5A6B81';

const DESTAQUE = {
  id: 'sao-tarcisio',
  nome: 'São Tarcísio',
  subtitulo: 'Padroeiro dos Coroinhas',
  descricao:
    'Exemplo de amor à Eucaristia e coragem na fé. Deu a vida para proteger o Corpo de Cristo.',
  imagem: require('@assets/santo-tarcisio.png'),
};

const SANTOS = [
  {
    id: 'nossa-senhora',
    nome: 'Nossa Senhora',
    descricao: 'Mãe de Jesus e nossa Mãe.',
    imagem: require('@assets/nossa-senhora-nova.png'),
  },
  {
    id: 'santo-afonso',
    nome: 'Santo Afonso Maria de Ligório',
    descricao: 'Doutor da Igreja e grande missionário.',
    imagem: require('@assets/santo-afonso-novo.png'),
  },
  {
    id: 'sao-domingos-savio',
    nome: 'São Domingos Sávio',
    descricao: 'Exemplo de pureza e alegria.',
    imagem: require('@assets/sao-domingos-savio-novo.png'),
  },
];

function FotoSanto({ source, size = 46, grande = false }) {
  const dim = grande ? 88 : size;

  return (
    <View
      style={[
        styles.avatar,
        { width: dim, height: dim, borderRadius: dim / 2 },
        grande && styles.avatarGrande,
      ]}
    >
      <Image
        source={source}
        style={styles.avatarFoto}
        resizeMode="contain"
      />
    </View>
  );
}

function ItemSanto({ item, isUltimo }) {
  return (
    <>
      <View style={styles.item}>
        <FotoSanto source={item.imagem} />
        <View style={styles.itemTexto}>
          <Text style={styles.itemNome}>{item.nome}</Text>
          <Text style={styles.itemDescricao}>{item.descricao}</Text>
        </View>
      </View>
      {!isUltimo && <View style={styles.divisor} />}
    </>
  );
}

export default function SantosDevocoes({ navigation }) {
  const headerPaddingTop = useStatusBarPadding();

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <View style={[styles.headerBlock, { paddingTop: headerPaddingTop }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerSide}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="arrow-back" size={28} color={AZUL} />
          </TouchableOpacity>

          <Text style={styles.headerTitle} numberOfLines={1}>
            Santos e Devoções
          </Text>

          <View style={styles.headerSide} />
        </View>

        <Text style={styles.headerSubtitle}>
          Os santos nos ensinam que servir ao altar é servir a Cristo.
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.destaqueCard}>
          <FotoSanto source={DESTAQUE.imagem} grande />
          <View style={styles.destaqueTexto}>
            <Text style={styles.destaqueNome}>{DESTAQUE.nome}</Text>
            <Text style={styles.destaqueSubtitulo}>{DESTAQUE.subtitulo}</Text>
            <Text style={styles.destaqueDescricao}>{DESTAQUE.descricao}</Text>
          </View>
        </View>

        <View style={styles.listaCard}>
          {SANTOS.map((item, index) => (
            <ItemSanto
              key={item.id}
              item={item}
              isUltimo={index === SANTOS.length - 1}
            />
          ))}
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

  headerSubtitle: {
    marginTop: 10,
    fontSize: 13,
    color: CINZA_TEXTO,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 18,
  },

  headerBlock: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    paddingHorizontal: 16,
    paddingBottom: 120,
  },

  destaqueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AZUL,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    gap: 14,
  },

  destaqueTexto: {
    flex: 1,
  },

  destaqueNome: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },

  destaqueSubtitulo: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },

  destaqueDescricao: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 17,
  },

  listaCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8EDF3',
    overflow: 'hidden',
    shadowColor: '#001830',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 14,
    gap: 14,
  },

  avatar: {
    backgroundColor: '#FFFDF8',
    borderWidth: 1,
    borderColor: '#E8D4A8',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarFoto: {
    width: '115%',
    height: '115%',
  },

  avatarGrande: {
    backgroundColor: '#F8F3E8',
    borderColor: DOURADO,
    borderWidth: 2,
  },

  itemTexto: {
    flex: 1,
  },

  itemNome: {
    fontSize: 16,
    fontWeight: '700',
    color: AZUL,
    marginBottom: 4,
  },

  itemDescricao: {
    fontSize: 13,
    color: CINZA_TEXTO,
    lineHeight: 18,
  },

  divisor: {
    height: 1,
    backgroundColor: '#E8EDF3',
    marginHorizontal: 14,
  },
});
