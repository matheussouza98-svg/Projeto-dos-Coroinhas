import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SuporteHeader from '../../components/SuporteHeader';

const AZUL = '#001830';
const APP_NOME = 'Servos do Altar';
const APP_VERSION = '1.0.0';

const LINKS = [
  {
    id: 'privacidade',
    titulo: 'Política de Privacidade',
    icon: 'document-text-outline',
  },
  {
    id: 'termos',
    titulo: 'Termos de Uso',
    icon: 'phone-portrait-outline',
  },
];

export default function SobreApp({ navigation }) {
  const abrirLink = (item) => {
    Alert.alert(item.titulo, 'Conteúdo em breve.');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <SuporteHeader title="Sobre o Aplicativo" navigation={navigation} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.identidade}>
          <View style={styles.logoWrap}>
            <Image
              source={require('../../../assets/background1.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.appNome}>{APP_NOME}</Text>
          <Text style={styles.appVersao}>Versão {APP_VERSION}</Text>
        </View>

        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color={AZUL}
            style={styles.infoIcon}
          />
          <View style={styles.infoTexto}>
            <Text style={styles.infoTitulo}>Descrição</Text>
            <Text style={styles.infoDescricao}>
              Aplicativo para gerenciamento de escalas, avisos, orações e
              comunicação entre membros da equipe litúrgica.
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons
            name="person-outline"
            size={22}
            color={AZUL}
            style={styles.infoIcon}
          />
          <View style={styles.infoTexto}>
            <Text style={styles.infoTitulo}>Desenvolvedor</Text>
            <Text style={styles.infoDescricao}>Matheus Morais</Text>
          </View>
        </View>

        <Text style={styles.linksTitulo}>Links</Text>

        {LINKS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.linkItem}
            activeOpacity={0.85}
            onPress={() => abrirLink(item)}
          >
            <Ionicons
              name={item.icon}
              size={22}
              color={AZUL}
              style={styles.linkIcon}
            />
            <Text style={styles.linkTexto}>{item.titulo}</Text>
            <Ionicons name="chevron-forward" size={20} color="#B0B8C4" />
          </TouchableOpacity>
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

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 120,
  },

  identidade: {
    alignItems: 'center',
    marginBottom: 28,
  },

  logoWrap: {
    width: 88,
    height: 88,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E8EDF3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: AZUL,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  logo: {
    width: 56,
    height: 56,
  },

  appNome: {
    fontSize: 20,
    fontWeight: '700',
    color: AZUL,
    marginBottom: 4,
  },

  appVersao: {
    fontSize: 14,
    color: '#6B7280',
  },

  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8EDF3',
    padding: 14,
    marginBottom: 14,
  },

  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },

  infoTexto: {
    flex: 1,
  },

  infoTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: AZUL,
    marginBottom: 4,
  },

  infoDescricao: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  linksTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: AZUL,
    marginTop: 8,
    marginBottom: 12,
  },

  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF3',
  },

  linkIcon: {
    marginRight: 12,
  },

  linkTexto: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: AZUL,
  },
});
