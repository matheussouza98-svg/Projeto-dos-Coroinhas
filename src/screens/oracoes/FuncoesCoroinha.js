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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useStatusBarPadding } from '../../utils/safeArea';

const AZUL = '#001830';
const DOURADO = '#C89D2A';
const CINZA_TEXTO = '#5A6B81';

const ICONES_IMAGEM = {
  turibulo: require('../../../assets/icon-turibulo.png'),
};

const FUNCOES = [
  {
    id: 'turiferario',
    titulo: 'Turiferário',
    descricao:
      'Responsável pelo turíbulo (incenso) durante a Santa Missa e procissões.',
    iconImage: 'turibulo',
  },
  {
    id: 'naveteiro',
    titulo: 'Naveteiro',
    descricao: 'Leva a naveta com o incenso e auxilia o turiferário.',
    iconName: 'bowl-mix-outline',
  },
  {
    id: 'cerimoniario',
    titulo: 'Cerimoniário',
    descricao:
      'Organiza os coroinhas e auxilia no andamento correto da celebração.',
    iconName: 'account-tie',
  },
  {
    id: 'cruciferario',
    titulo: 'Cruciferário',
    descricao: 'Carrega a cruz processional nas entradas e saídas.',
    iconName: 'cross',
  },
  {
    id: 'acolitos-velas',
    titulo: 'Acólitos das Velas',
    descricao: 'Acompanham com velas os momentos solenes da missa.',
    iconName: 'candle',
  },
  {
    id: 'coroinhas',
    titulo: 'Coroinhas',
    descricao: 'Auxiliam o sacerdote no altar durante toda a celebração.',
    iconName: 'account-group-outline',
  },
  {
    id: 'sinetas',
    titulo: 'Sinetas',
    descricao:
      'Responsável por tocar as sinetas nos momentos litúrgicos corretos.',
    iconName: 'bell-ring-outline',
  },
  {
    id: 'missal',
    titulo: 'Missal',
    descricao: 'Segura o missal para o sacerdote durante as orações.',
    iconName: 'book-open-page-variant',
  },
];

function IconeFuncao({ item, size = 28 }) {
  if (item.iconImage) {
    const source = ICONES_IMAGEM[item.iconImage];
    if (source) {
      return (
        <Image
          source={source}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      );
    }
  }

  return (
    <MaterialCommunityIcons
      name={item.iconName}
      size={size}
      color={DOURADO}
    />
  );
}

function ItemFuncao({ item, isUltimo }) {
  return (
    <>
      <View style={styles.item}>
        <View style={styles.iconBox}>
          <IconeFuncao item={item} />
        </View>

        <View style={styles.itemTexto}>
          <Text style={styles.itemTitulo}>{item.titulo}</Text>
          <Text style={styles.itemDescricao}>{item.descricao}</Text>
        </View>
      </View>

      {!isUltimo && <View style={styles.divisor} />}
    </>
  );
}

export default function FuncoesCoroinha({ navigation }) {
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
            Funções do Coroinha
          </Text>

          <View style={styles.headerSide} />
        </View>

        <Text style={styles.headerSubtitle}>
          Conheça cada função e sua importância durante a Santa Missa.
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listaCard}>
          {FUNCOES.map((item, index) => (
            <ItemFuncao
              key={item.id}
              item={item}
              isUltimo={index === FUNCOES.length - 1}
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

  headerBlock: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
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

  headerSubtitle: {
    textAlign: 'center',
    fontSize: 13,
    color: CINZA_TEXTO,
    lineHeight: 19,
    paddingHorizontal: 12,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 120,
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

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: AZUL,
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemTexto: {
    flex: 1,
    paddingRight: 4,
  },

  itemTitulo: {
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
