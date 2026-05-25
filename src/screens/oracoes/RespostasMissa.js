import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const ICONES_IMAGEM = {
  calice: require('../../../assets/icon-calice.png'),
  'liturgia-palavra': require('../../../assets/icon-liturgia-palavra.png'),
};

const AZUL = '#001830';
const AZUL_RESPOSTA = '#2B6CB8';
const AZUL_TAB = '#3B82C4';
const DOURADO = '#C89D2A';

const CATEGORIAS = [
  { id: 'todas', label: 'Todas', icon: 'format-list-bulleted' },
  { id: 'ritos-iniciais', label: 'Ritos Iniciais', icon: 'cross' },
  {
    id: 'liturgia-palavra',
    label: 'Liturgia da Palavra',
    icon: 'book-open-page-variant',
    imagem: 'liturgia-palavra',
  },
  {
    id: 'liturgia-eucaristica',
    label: 'Liturgia Eucarística',
    icon: 'glass-wine',
    imagem: 'calice',
  },
  { id: 'rito-comunhao', label: 'Rito da Comunhão', icon: 'barley' },
  { id: 'ritos-finais', label: 'Ritos Finais', icon: 'cross' },
];

const SECOES = [
  {
    id: 'ritos-iniciais',
    titulo: 'RITOS INICIAIS',
    icon: 'cross',
    cor: '#4A7FD4',
    itens: [
      {
        label: 'Sinal da Cruz',
        resposta: 'Em nome do Pai, do Filho e do Espírito Santo. Amém.',
      },
      { label: 'Saudação', resposta: 'O Senhor esteja convosco.' },
      { label: 'Resposta', resposta: 'Ele está no meio de nós.' },
      {
        label: 'Ato Penitencial',
        resposta: 'Confesso a Deus todo-poderoso e a vós, irmãos e irmãs, que pequei muitas vezes.',
      },
      {
        label: 'Sacerdote ou cantor',
        resposta: 'Senhor, tende piedade de nós.',
      },
      { label: 'Assembleia', resposta: 'Senhor, tende piedade de nós.' },
      {
        label: 'Sacerdote ou cantor',
        resposta: 'Cristo, tende piedade de nós.',
      },
      { label: 'Assembleia', resposta: 'Cristo, tende piedade de nós.' },
      {
        label: 'Sacerdote ou cantor',
        resposta: 'Senhor, tende piedade de nós.',
      },
      { label: 'Assembleia', resposta: 'Senhor, tende piedade de nós.' },
      {
        label: 'Glória',
        resposta:
          'Glória a Deus nas alturas, E paz na terra aos homens por Ele amados. Senhor Deus, Rei dos céus, Deus Pai todo-poderoso. Nós vos louvamos, Nós vos bendizemos, Nós vos adoramos, Nós vos glorificamos, Nós vos damos graças Por vossa imensa glória. Senhor Jesus Cristo, Filho Unigênito. Senhor Deus, Cordeiro de Deus, Filho de Deus Pai. Vós que tirais o pecado do mundo, Tende piedade de nós. Vós que tirais o pecado do mundo, Acolhei a nossa súplica. Vós que estais à direita do Pai, Tende piedade de nós. Só vós sois o Santo, Só vós o Senhor, Só vós o Altíssimo, Jesus Cristo, Com o Espírito Santo, Na glória de Deus Pai. Amém.',
      },
    ],
  },
  {
    id: 'liturgia-palavra',
    titulo: 'LITURGIA DA PALAVRA',
    icon: 'book-open-page-variant',
    imagem: 'liturgia-palavra',
    cor: '#3D9A6E',
    itens: [
      { label: 'Leitor', resposta: 'Palavra do Senhor.' },
      { label: 'Assembleia', resposta: 'Graças a Deus.' },
      { tipo: 'titulo', label: 'Evangelho' },
      { label: 'Diácono ou sacerdote', resposta: 'O Senhor esteja convosco.' },
      { label: 'Assembleia', resposta: 'Ele está no meio de nós.' },
      {
        label: 'Diácono ou sacerdote',
        resposta: 'Proclamação do Evangelho de Jesus Cristo segundo...',
      },
      { label: 'Assembleia', resposta: 'Glória a vós, Senhor.' },
      { tipo: 'titulo', label: 'Ao final' },
      { label: 'Diácono ou sacerdote', resposta: 'Palavra da Salvação.' },
      { label: 'Assembleia', resposta: 'Glória a vós, Senhor.' },
      { tipo: 'titulo', label: 'Credo' },
      {
        label: 'Assembleia',
        resposta:
          'Creio em Deus Pai todo-poderoso, Criador do céu e da terra. E em Jesus Cristo, Seu único Filho, nosso Senhor, Que foi concebido pelo poder do Espírito Santo; Nasceu da Virgem Maria; Padeceu sob Pôncio Pilatos, Foi crucificado, morto e sepultado. Desceu à mansão dos mortos; Ressuscitou ao terceiro dia; Subiu aos céus; Está sentado à direita de Deus Pai todo-poderoso, Donde há de vir julgar os vivos e os mortos. Creio no Espírito Santo, Na santa Igreja Católica, Na comunhão dos santos, Na remissão dos pecados, Na ressurreição da carne, Na vida eterna. Amém.',
      },
    ],
  },
  {
    id: 'liturgia-eucaristica',
    titulo: 'LITURGIA EUCARÍSTICA',
    icon: 'glass-wine',
    imagem: 'calice',
    cor: '#C89D2A',
    itens: [
      { tipo: 'titulo', label: 'Ofertório' },
      {
        label: 'Sacerdote',
        resposta:
          'Orai, irmãos e irmãs, para que o nosso sacrifício seja aceito por Deus Pai todo-poderoso.',
      },
      {
        label: 'Assembleia',
        resposta:
          'Receba o Senhor por tuas mãos este sacrifício, para glória do seu nome, para nosso bem e de toda a santa Igreja.',
      },
      { tipo: 'titulo', label: 'Prefácio' },
      { label: 'Sacerdote', resposta: 'O Senhor esteja convosco.' },
      { label: 'Assembleia', resposta: 'Ele está no meio de nós.' },
      { label: 'Sacerdote', resposta: 'Corações ao alto.' },
      { label: 'Assembleia', resposta: 'O nosso coração está em Deus.' },
      { label: 'Sacerdote', resposta: 'Demos graças ao Senhor, nosso Deus.' },
      { label: 'Assembleia', resposta: 'É nosso dever e nossa salvação.' },
      { tipo: 'titulo', label: 'Santo' },
      {
        label: 'Assembleia',
        resposta:
          'Santo, Santo, Santo, Senhor Deus do universo. O céu e a terra proclamam a vossa glória. Hosana nas alturas! Bendito o que vem em nome do Senhor. Hosana nas alturas!',
      },
      { tipo: 'titulo', label: 'Pai-Nosso' },
      {
        label: 'Assembleia',
        resposta:
          'Pai nosso que estais nos céus, Santificado seja o vosso nome; Venha a nós o vosso Reino; Seja feita a vossa vontade, Assim na terra como no céu. O pão nosso de cada dia nos dai hoje; Perdoai-nos as nossas ofensas, Assim como nós perdoamos a quem nos tem ofendido; E não nos deixeis cair em tentação, Mas livrai-nos do mal. Amém.',
      },
    ],
  },
  {
    id: 'rito-comunhao',
    titulo: 'RITO DA COMUNHÃO',
    icon: 'barley',
    cor: '#7C5CBF',
    itens: [
      { tipo: 'titulo', label: 'Rito da Paz' },
      { label: 'Sacerdote', resposta: 'A paz do Senhor esteja sempre convosco.' },
      { label: 'Assembleia', resposta: 'O amor de Cristo nos uniu.' },
      { tipo: 'titulo', label: 'Cordeiro de Deus' },
      {
        label: 'Assembleia',
        resposta:
          'Cordeiro de Deus, Que tirais o pecado do mundo, Tende piedade de nós.\n\nCordeiro de Deus, Que tirais o pecado do mundo, Tende piedade de nós.\n\nCordeiro de Deus, Que tirais o pecado do mundo, Dai-nos a paz.',
      },
      { tipo: 'titulo', label: 'Comunhão' },
      {
        label: 'Sacerdote',
        resposta:
          'Felizes os convidados para a ceia do Senhor. Eis o Cordeiro de Deus, que tira o pecado do mundo.',
      },
      {
        label: 'Assembleia',
        resposta:
          'Senhor, eu não sou digno(a) de que entreis em minha morada, mas dizei uma palavra e serei salvo(a).',
      },
      { tipo: 'titulo', label: 'Ao receber a comunhão' },
      { label: 'Ministro', resposta: 'O Corpo de Cristo.' },
      { label: 'Fiel', resposta: 'Amém.' },
    ],
  },
  {
    id: 'ritos-finais',
    titulo: 'RITOS FINAIS',
    icon: 'cross',
    cor: '#4A7FD4',
    itens: [
      { label: 'Sacerdote', resposta: 'O Senhor esteja convosco.' },
      { label: 'Assembleia', resposta: 'Ele está no meio de nós.' },
      { tipo: 'titulo', label: 'Ao final da bênção' },
      { label: 'Assembleia', resposta: 'Amém.' },
      { tipo: 'titulo', label: 'Despedida' },
      {
        label: 'Sacerdote ou diácono',
        resposta: 'Ide em paz e que o Senhor vos acompanhe.',
      },
      { label: 'Assembleia', resposta: 'Graças a Deus.' },
    ],
  },
];

function IconeImagem({ nome, size = 22, opacity = 1 }) {
  const source = ICONES_IMAGEM[nome];
  if (!source) return null;

  return (
    <Image
      source={source}
      style={{ width: size, height: size, opacity }}
      contentFit="contain"
    />
  );
}

function IconeSecao({ nome, tamanho = 18 }) {
  return <MaterialCommunityIcons name={nome} size={tamanho} color="#fff" />;
}

function LinhaResposta({ item, ultima }) {
  if (item.tipo === 'titulo') {
    return (
      <View style={[styles.linhaTitulo, ultima && styles.linhaUltima]}>
        <Text style={styles.linhaTituloTexto}>{item.label}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.linha, ultima && styles.linhaUltima]}>
      <Text style={styles.linhaLabel}>{item.label}</Text>
      <Text style={styles.linhaResposta}>{item.resposta}</Text>
    </View>
  );
}

function SecaoAccordion({ secao, expandida, onToggle }) {
  return (
    <View style={styles.secaoCard}>
      <TouchableOpacity
        style={styles.secaoHeader}
        onPress={onToggle}
        activeOpacity={0.85}
      >
        {secao.imagem ? (
          <View style={[styles.secaoIcone, styles.secaoIconeImagem]}>
            <IconeImagem nome={secao.imagem} size={26} />
          </View>
        ) : (
          <View style={[styles.secaoIcone, { backgroundColor: secao.cor }]}>
            <IconeSecao nome={secao.icon} />
          </View>
        )}
        <Text style={styles.secaoTitulo}>{secao.titulo}</Text>
        <Ionicons
          name={expandida ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#9CA3AF"
        />
      </TouchableOpacity>

      {expandida && (
        <View style={styles.secaoCorpo}>
          {secao.itens.map((item, index) => (
            <LinhaResposta
              key={`${item.label}-${index}`}
              item={item}
              ultima={index === secao.itens.length - 1}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default function RespostasMissa({ navigation }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState('todas');
  const [expandidas, setExpandidas] = useState(() =>
    Object.fromEntries(SECOES.map((s) => [s.id, s.id === 'ritos-iniciais']))
  );

  const secoesVisiveis = useMemo(() => {
    if (categoriaAtiva === 'todas') return SECOES;
    return SECOES.filter((s) => s.id === categoriaAtiva);
  }, [categoriaAtiva]);

  const alternarSecao = (id) => {
    setExpandidas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selecionarCategoria = (id) => {
    setCategoriaAtiva(id);
    if (id === 'todas') {
      setExpandidas(
        Object.fromEntries(SECOES.map((s) => [s.id, s.id === 'ritos-iniciais']))
      );
      return;
    }
    setExpandidas(
      Object.fromEntries(SECOES.map((s) => [s.id, s.id === id]))
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerSide}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="arrow-back" size={28} color={AZUL} />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          Respostas da Missa
        </Text>

        <View style={styles.headerSide} />
      </View>
      <Text style={styles.subtituloPagina}>
        Acompanhe as principais respostas e aclamações da Santa Missa.
      </Text>

      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
          style={styles.tabsScroll}
        >
          {CATEGORIAS.map((cat) => {
            const ativa = categoriaAtiva === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.tab, ativa && styles.tabAtiva]}
                onPress={() => selecionarCategoria(cat.id)}
                activeOpacity={0.8}
              >
                {cat.imagem ? (
                  <IconeImagem
                    nome={cat.imagem}
                    size={22}
                    opacity={ativa ? 1 : 0.45}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name={cat.icon}
                    size={22}
                    color={ativa ? AZUL_TAB : '#9CA3AF'}
                  />
                )}
                <Text style={[styles.tabLabel, ativa && styles.tabLabelAtiva]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={styles.tabBarraDourada} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
        persistentScrollbar
        indicatorStyle="black"
      >
        {secoesVisiveis.map((secao) => (
          <SecaoAccordion
            key={secao.id}
            secao={secao}
            expandida={!!expandidas[secao.id]}
            onToggle={() => alternarSecao(secao.id)}
          />
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 4,
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

  subtituloPagina: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 28,
    marginTop: 14,
    marginBottom: 16,
  },

  tabsWrapper: {
    marginBottom: 12,
  },

  tabsScroll: {
    flexGrow: 0,
  },

  tabsContent: {
    paddingHorizontal: 12,
    gap: 8,
    paddingBottom: 8,
  },

  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 72,
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },

  tabAtiva: {
    backgroundColor: '#E8F2FC',
  },

  tabBarraDourada: {
    width: '100%',
    height: 3,
    backgroundColor: DOURADO,
  },

  tabLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500',
  },

  tabLabelAtiva: {
    color: AZUL_TAB,
    fontWeight: '600',
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
    gap: 12,
  },

  secaoCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8EDF3',
    overflow: 'hidden',
    shadowColor: '#001830',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  secaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 12,
  },

  secaoIcone: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secaoIconeImagem: {
    backgroundColor: '#FFFDF8',
    borderWidth: 1,
    borderColor: '#F3E7C7',
  },

  secaoTitulo: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: AZUL,
    letterSpacing: 0.4,
  },

  secaoCorpo: {
    borderTopWidth: 1,
    borderTopColor: '#EEF2F6',
    paddingHorizontal: 14,
    paddingBottom: 4,
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
    gap: 12,
  },

  linhaUltima: {
    borderBottomWidth: 0,
  },

  linhaTitulo: {
    paddingVertical: 10,
    paddingTop: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
  },

  linhaTituloTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: AZUL,
    letterSpacing: 0.3,
  },

  linhaLabel: {
    width: '38%',
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },

  linhaResposta: {
    flex: 1,
    fontSize: 12,
    color: AZUL_RESPOSTA,
    lineHeight: 18,
    fontWeight: '500',
  },
});
