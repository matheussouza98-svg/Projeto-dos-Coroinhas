import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useStatusBarPadding } from '@/shared/hooks/useStatusBarPadding';
import MenuNavegacao from '@/shared/components/layout/MenuNavegacao';

const OPCOES = [
  {
    id: 'notificacoes',
    titulo: 'Notificações',
    descricao: 'Ajuste como e quando deseja receber alertas sobre mensagens, eventos e novidades.',
    iconFamily: 'Ionicons',
    iconName: 'notifications-outline',
  },
  {
    id: 'privacidade',
    titulo: 'Privacidade',
    descricao: 'Gerencie quem vê suas informações e controle o acesso aos seus dados.',
    iconFamily: 'Ionicons',
    iconName: 'shield-checkmark-outline',
  },
  {
    id: 'conta',
    titulo: 'Conta',
    descricao: 'Atualize seu e-mail, senha ou outras informações pessoais da sua conta.',
    iconFamily: 'Ionicons',
    iconName: 'person-circle-outline',
  },
  {
    id: 'aparencia',
    titulo: 'Aparência',
    descricao: 'Escolha o tema e as preferências visuais do aplicativo.',
    iconFamily: 'Ionicons',
    iconName: 'color-palette-outline',
  },
  {
    id: 'suporte',
    titulo: 'Suporte',
    descricao: 'Encontre ajuda, perguntas frequentes e instruções para usar o app.',
    iconFamily: 'MaterialCommunityIcons',
    iconName: 'lifebuoy',
  },
];

function IconeOpcao({ item, size = 26 }) {
  if (item.iconFamily === 'Ionicons') {
    return <Ionicons name={item.iconName} size={size} color="#fff" />;
  }

  return (
    <MaterialCommunityIcons name={item.iconName} size={size} color="#fff" />
  );
}

export default function Perfil({ navigation }) {
  const topPadding = useStatusBarPadding();

  const abrirOpcao = (item) => {
    if (item.id === 'suporte') {
      navigation.navigate('Suporte');
      return;
    }

    if (item.id === 'notificacoes') {
      navigation.navigate('Notificacoes');
      return;
    }

    if (item.id === 'privacidade') {
      navigation.navigate('Privacidade');
      return;
    }

    if (item.id === 'conta') {
      navigation.navigate('Conta');
      return;
    }

    if (item.id === 'aparencia') {
      navigation.navigate('Aparencia');
      return;
    }

    Alert.alert(item.titulo, 'Conteúdo em breve.');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <View style={[styles.container, { paddingTop: topPadding }]}>
        <MenuNavegacao navigation={navigation} />

        <Text style={styles.titulo}>Perfil</Text>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {OPCOES.map((item) => (
            <View style={styles.card} key={item.id}>
              <TouchableOpacity
                style={styles.iconBox}
                onPress={() => abrirOpcao(item)}
                activeOpacity={0.85}
              >
                <IconeOpcao item={item} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cardTexto}
                onPress={() => abrirOpcao(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.cardTitulo}>{item.titulo}</Text>
                <Text style={styles.cardDescricao}>{item.descricao}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.setaBtn}
                onPress={() => abrirOpcao(item)}
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
    paddingHorizontal: 20,
    position: 'relative',
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
    marginTop: 8,
    marginBottom: 25,
    paddingHorizontal: 40,
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
