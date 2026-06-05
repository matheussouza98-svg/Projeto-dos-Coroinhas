import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useStatusBarPadding } from '@/shared/hooks/useStatusBarPadding';

const AZUL = '#001830';
const DOURADO = '#C89D2A';
const LINHA = '#C5A070';
const CINZA_TEXTO = '#5A6B81';

const CIRCULO = 32;
const GAP_CARDS = 12;

const PARTES = [
  {
    numero: 1,
    titulo: 'Ritos Iniciais',
    descricao:
      'Sinal da Cruz, saudação, ato penitencial, Glória e oração do dia.',
  },
  {
    numero: 2,
    titulo: 'Liturgia da Palavra',
    descricao: 'Leituras, Salmo, Evangelho, homilia e profissão de fé.',
  },
  {
    numero: 3,
    titulo: 'Liturgia Eucarística',
    descricao:
      'Apresentação das oferendas, oração eucarística e comunhão.',
  },
  {
    numero: 4,
    titulo: 'Ritos Finais',
    descricao: 'Avisos, bênção final e despedida.',
  },
];

function ParteMissa({ parte, onCirculoRef, onLayoutCard }) {
  return (
    <View style={styles.parteCard} onLayout={onLayoutCard}>
      <View style={styles.parteInner}>
        <View style={styles.timelineCol}>
          <View
            ref={onCirculoRef}
            style={styles.numeroCirculo}
            onLayout={onLayoutCard}
          >
            <Text style={styles.numeroTexto}>{parte.numero}</Text>
          </View>
        </View>

        <View style={styles.parteTexto}>
          <Text style={styles.parteTitulo}>{parte.titulo}</Text>
          <Text style={styles.parteDescricao}>{parte.descricao}</Text>
        </View>
      </View>
    </View>
  );
}

function ListaPartesComTrilha() {
  const listaRef = useRef(null);
  const circulosRef = useRef({});
  const [segmentos, setSegmentos] = useState([]);

  const atualizarTrilha = useCallback(() => {
    const lista = listaRef.current;
    if (!lista) return;

    const nodes = PARTES.map((_, index) => circulosRef.current[index]).filter(
      Boolean
    );
    if (nodes.length < PARTES.length) return;

    const posicoes = new Array(nodes.length);
    let pendentes = nodes.length;

    nodes.forEach((node, index) => {
      node.measureLayout(
        lista,
        (x, y, width, height) => {
          posicoes[index] = { x, y, width, height };
          pendentes -= 1;

          if (pendentes > 0) return;

          const novosSegmentos = [];
          for (let i = 0; i < posicoes.length - 1; i += 1) {
            const atual = posicoes[i];
            const proximo = posicoes[i + 1];
            const top = atual.y + atual.height;
            const height = proximo.y - top;

            if (height > 0) {
              novosSegmentos.push({
                key: `seg-${i}`,
                left: atual.x + atual.width / 2 - 1,
                top,
                height,
              });
            }
          }

          setSegmentos(novosSegmentos);
        },
        () => {}
      );
    });
  }, []);

  const registrarCirculo = useCallback(
    (index) => (node) => {
      circulosRef.current[index] = node;
      if (node) {
        requestAnimationFrame(atualizarTrilha);
      }
    },
    [atualizarTrilha]
  );

  return (
    <View
      ref={listaRef}
      style={styles.listaPartes}
      onLayout={atualizarTrilha}
    >
      {PARTES.map((parte, index) => (
        <ParteMissa
          key={parte.numero}
          parte={parte}
          onCirculoRef={registrarCirculo(index)}
          onLayoutCard={atualizarTrilha}
        />
      ))}

      {segmentos.map((seg) => (
        <View
          key={seg.key}
          pointerEvents="none"
          style={[
            styles.trilhaSegmento,
            {
              left: seg.left,
              top: seg.top,
              height: seg.height,
            },
          ]}
        />
      ))}
    </View>
  );
}

function CardResumo() {
  return (
    <View style={styles.resumoCard}>
      <View style={styles.resumoMetade}>
        <MaterialCommunityIcons
          name="clock-outline"
          size={28}
          color={DOURADO}
        />
        <View style={styles.resumoTexto}>
          <Text style={styles.resumoLabel}>Duração média</Text>
          <Text style={styles.resumoValor}>50 a 60 min</Text>
        </View>
      </View>

      <View style={styles.resumoDivisor} />

      <View style={styles.resumoMetade}>
        <MaterialCommunityIcons
          name="book-open-page-variant"
          size={28}
          color={DOURADO}
        />
        <View style={styles.resumoTexto}>
          <Text style={styles.resumoLabel}>4 etapas</Text>
          <Text style={styles.resumoValor}>principais</Text>
        </View>
      </View>
    </View>
  );
}

export default function OrdemMissa({ navigation }) {
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
            Ordem da Missa
          </Text>

          <View style={styles.headerSide} />
        </View>

        <Text style={styles.headerSubtitle}>
          Siga a celebração em ordem e participe com reverência.
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CardResumo />

        <ListaPartesComTrilha />

        <View style={styles.dicaCard}>
          <View style={styles.dicaIcone}>
            <MaterialCommunityIcons
              name="book-open-page-variant"
              size={22}
              color={DOURADO}
            />
          </View>

          <View style={styles.dicaConteudo}>
            <Text style={styles.dicaTitulo}>Dica para o coroinha</Text>
            <Text style={styles.dicaTexto}>
              Participe com atenção e reverência em cada momento da Santa
              Missa.
            </Text>
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
    marginBottom: 4,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 120,
  },

  resumoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8EDF3',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 20,
    shadowColor: '#001830',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  resumoMetade: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 6,
  },

  resumoDivisor: {
    width: 1,
    height: 44,
    backgroundColor: '#E8EDF3',
    marginHorizontal: 6,
  },

  resumoTexto: {
    flexShrink: 1,
  },

  resumoLabel: {
    fontSize: 12,
    color: CINZA_TEXTO,
    marginBottom: 2,
  },

  resumoValor: {
    fontSize: 14,
    fontWeight: '700',
    color: AZUL,
  },

  listaPartes: {
    position: 'relative',
    gap: GAP_CARDS,
  },

  trilhaSegmento: {
    position: 'absolute',
    width: 2,
    backgroundColor: LINHA,
    zIndex: 1,
    elevation: 2,
  },

  parteCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E8EDF3',
    padding: 16,
    shadowColor: '#001830',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 1,
    zIndex: 0,
  },

  parteInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  timelineCol: {
    width: CIRCULO,
    marginRight: 12,
  },

  numeroCirculo: {
    width: CIRCULO,
    height: CIRCULO,
    borderRadius: CIRCULO / 2,
    backgroundColor: DOURADO,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 8,
  },

  numeroTexto: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },

  parteTexto: {
    flex: 1,
    paddingTop: 6,
  },

  parteTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: AZUL,
    marginBottom: 6,
  },

  parteDescricao: {
    fontSize: 13,
    color: CINZA_TEXTO,
    lineHeight: 20,
  },

  dicaCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF5EB',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 20,
    gap: 14,
  },

  dicaIcone: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F3E7C7',
  },

  dicaConteudo: {
    flex: 1,
  },

  dicaTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: AZUL,
    marginBottom: 4,
  },

  dicaTexto: {
    fontSize: 13,
    color: AZUL,
    lineHeight: 20,
  },
});
