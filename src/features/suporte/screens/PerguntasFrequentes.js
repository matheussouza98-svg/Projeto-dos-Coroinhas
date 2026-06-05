import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SuporteHeader from '@/shared/components/layout/SuporteHeader';

const AZUL = '#001830';
const AZUL_CLARO = '#E8F4FC';

const FAQ_ITENS = [
  {
    id: 'escala',
    pergunta: 'Como visualizar minha escala?',
    resposta:
      "Vá na aba 'Escala' para ver suas próximas atividades e compromissos.",
  },
  {
    id: 'presenca',
    pergunta: 'Como confirmar presença?',
    resposta:
      'Na aba Escala, toque na missa desejada e use a opção de confirmar presença quando estiver disponível.',
  },
  {
    id: 'ausencia',
    pergunta: 'Como justificar ausência?',
    resposta:
      'Abra a escala da missa em que não poderá comparecer e selecione a opção de justificar ausência, informando o motivo.',
  },
  {
    id: 'troca',
    pergunta: 'Como trocar de escala?',
    resposta:
      'Entre em contato com a coordenação pelo formulário de suporte ou combine diretamente com outro membro da equipe.',
  },
  {
    id: 'avisos',
    pergunta: 'Como recebo avisos e lembretes?',
    resposta:
      'Ative as notificações em Perfil > Notificações para receber lembretes de missas e avisos da coordenação.',
  },
  {
    id: 'perfil',
    pergunta: 'Como editar meu perfil?',
    resposta:
      'Na aba Perfil, acesse Conta para atualizar seus dados pessoais, e-mail e senha.',
  },
  {
    id: 'problemas',
    pergunta: 'Problemas com o aplicativo?',
    resposta:
      'Use a opção Falar com a Coordenação ou descreva o problema no formulário de contato para receber ajuda.',
  },
];

export default function PerguntasFrequentes({ navigation }) {
  const [busca, setBusca] = useState('');
  const [expandido, setExpandido] = useState('escala');

  const itensFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return FAQ_ITENS;
    return FAQ_ITENS.filter(
      (item) =>
        item.pergunta.toLowerCase().includes(termo) ||
        item.resposta.toLowerCase().includes(termo),
    );
  }, [busca]);

  const alternar = (id) => {
    setExpandido((atual) => (atual === id ? null : id));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <SuporteHeader title="Perguntas Frequentes" navigation={navigation} />

      <View style={styles.buscaWrap}>
        <Ionicons name="search-outline" size={20} color="#9CA3AF" />
        <TextInput
          style={styles.buscaInput}
          placeholder="Buscar dúvida..."
          placeholderTextColor="#9CA3AF"
          value={busca}
          onChangeText={setBusca}
          underlineColorAndroid="transparent"
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {itensFiltrados.map((item) => {
          const aberto = expandido === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.faqItem}
              activeOpacity={0.9}
              onPress={() => alternar(item.id)}
            >
              <View style={styles.faqCabecalho}>
                <Text style={styles.faqPergunta}>{item.pergunta}</Text>
                <Ionicons
                  name={aberto ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#6B7280"
                />
              </View>

              {aberto && (
                <Text style={styles.faqResposta}>{item.resposta}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.ctaBanner}>
        <Ionicons name="bulb-outline" size={22} color={AZUL} />
        <Text style={styles.ctaTexto}>
          Não encontrou sua dúvida? Fale com a coordenação.
        </Text>
        <TouchableOpacity
          style={styles.ctaBotao}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('FalarCoordenacao')}
        >
          <Text style={styles.ctaBotaoTexto}>Falar agora</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  buscaWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },

  buscaInput: {
    flex: 1,
    fontSize: 15,
    color: AZUL,
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        outlineWidth: 0,
      },
      default: {},
    }),
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },

  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF3',
    paddingVertical: 16,
  },

  faqCabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  faqPergunta: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: AZUL,
  },

  faqResposta: {
    marginTop: 10,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  ctaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AZUL_CLARO,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 8,
  },

  ctaTexto: {
    flex: 1,
    fontSize: 12,
    color: AZUL,
    lineHeight: 16,
  },

  ctaBotao: {
    backgroundColor: AZUL,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  ctaBotaoTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});
