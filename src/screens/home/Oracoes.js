import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const CONTEUDOS = [
  {
    id: 'oracao-coroinha',
    titulo: 'Oração do Coroinha',
    descricao: 'A oração que todo coroinha deve rezar sempre.',
    iconFamily: 'MaterialCommunityIcons',
    iconName: 'hands-pray',
  },
  {
    id: 'respostas-missa',
    titulo: 'Respostas da Missa',
    descricao: 'Acompanhe as principais respostas e aclamações da Santa Missa.',
    iconFamily: 'MaterialCommunityIcons',
    iconName: 'book-cross',
  },
  {
    id: 'ordem-missa',
    titulo: 'Ordem da Missa',
    descricao: 'Conheça todos as partes da Santa Missa.',
    iconFamily: 'MaterialCommunityIcons',
    iconName: 'book-open-page-variant',
  },
  {
    id: 'funcoes-coroinha',
    titulo: 'Funções do Coroinha',
    descricao: 'Entenda cada função e sua importância.',
    iconFamily: 'MaterialCommunityIcons',
    iconName: 'cup',
  },
  {
    id: 'santos-devocoes',
    titulo: 'Santos e Devoções',
    descricao: 'Aprenda mais sobre nossos santos.',
    iconFamily: 'MaterialCommunityIcons',
    iconName: 'account-star',
  },
];

function IconeConteudo({ item, size = 26 }) {
  if (item.iconFamily === 'Ionicons') {
    return <Ionicons name={item.iconName} size={size} color="#fff" />;
  }

  return (
    <MaterialCommunityIcons name={item.iconName} size={size} color="#fff" />
  );
}

export default function Oracoes({ navigation }) {
  const abrirConteudo = (item) => {
    if (item.id === 'oracao-coroinha') {
      navigation.navigate('OracaoCoroinha');
      return;
    }

    if (item.id === 'respostas-missa') {
      navigation.navigate('RespostasMissa');
      return;
    }

    Alert.alert(item.titulo, 'Conteúdo em breve.');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Orações e Liturgia</Text>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {CONTEUDOS.map((item) => (
          <View style={styles.card} key={item.id}>
            <TouchableOpacity
              style={styles.iconBox}
              onPress={() => abrirConteudo(item)}
              activeOpacity={0.85}
            >
              <IconeConteudo item={item} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cardTexto}
              onPress={() => abrirConteudo(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.cardTitulo}>{item.titulo}</Text>
              <Text style={styles.cardDescricao}>{item.descricao}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.setaBtn}
              onPress={() => abrirConteudo(item)}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-forward" size={22} color="#B0B8C4" />
            </TouchableOpacity>
          </View>
        ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 120,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#001830',
    marginBottom: 25,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8EDF3',
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
    shadowColor: '#001830',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#001830',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  cardTexto: {
    flex: 1,
    paddingRight: 8,
  },

  cardTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#001830',
    marginBottom: 4,
  },

  cardDescricao: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },

  setaBtn: {
    padding: 6,
  },
});
