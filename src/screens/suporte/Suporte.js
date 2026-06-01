import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SuporteHeader from '../../components/SuporteHeader';

const AZUL = '#001830';
const APP_VERSION = '1.0.0';

const OPCOES = [
  {
    id: 'faq',
    titulo: 'Perguntas Frequentes',
    descricao: 'Encontre respostas para as dúvidas mais comuns.',
    icon: 'help-circle-outline',
    screen: 'PerguntasFrequentes',
  },
  {
    id: 'contato',
    titulo: 'Falar com a Coordenação',
    descricao: 'Envie uma mensagem para a coordenação da sua equipe.',
    icon: 'mail-outline',
    screen: 'FalarCoordenacao',
  },
  {
    id: 'sobre',
    titulo: 'Sobre o Aplicativo',
    descricao: 'Veja informações sobre o aplicativo e sua versão.',
    icon: 'information-circle-outline',
    screen: 'SobreApp',
  },
];

export default function Suporte({ navigation }) {
  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <SuporteHeader title="Suporte" navigation={navigation} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Ionicons
            name="headset-outline"
            size={40}
            color={AZUL}
            style={styles.heroIcon}
          />
          <Text style={styles.heroTitulo}>Como podemos ajudar?</Text>
          <Text style={styles.heroSubtitulo}>Escolha uma opção abaixo:</Text>
        </View>

        {OPCOES.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Ionicons
              name={item.icon}
              size={26}
              color={AZUL}
              style={styles.cardIcon}
            />

            <View style={styles.cardTexto}>
              <Text style={styles.cardTitulo}>{item.titulo}</Text>
              <Text style={styles.cardDescricao}>{item.descricao}</Text>
            </View>

            <Ionicons name="chevron-forward" size={22} color="#B0B8C4" />
          </TouchableOpacity>
        ))}

        <Text style={styles.versao}>Versão {APP_VERSION}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 120,
  },

  hero: {
    alignItems: 'center',
    marginBottom: 28,
  },

  heroIcon: {
    marginBottom: 16,
  },

  heroTitulo: {
    fontSize: 20,
    fontWeight: '700',
    color: AZUL,
    marginBottom: 6,
  },

  heroSubtitulo: {
    fontSize: 14,
    color: '#6B7280',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8EDF3',
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 14,
    shadowColor: AZUL,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  cardIcon: {
    marginRight: 14,
  },

  cardTexto: {
    flex: 1,
    paddingRight: 8,
  },

  cardTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: AZUL,
    marginBottom: 4,
  },

  cardDescricao: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },

  versao: {
    textAlign: 'center',
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 20,
  },
});
