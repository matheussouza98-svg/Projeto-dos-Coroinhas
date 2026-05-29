import React, { useState } from 'react';
import MenuNavegacao from '../../components/MenuNavegacao';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStatusBarPadding } from '../../utils/safeArea';

export default function Inicio({ navigation }) {
  const topPadding = useStatusBarPadding();

  // ✅ MENSAGEM
  const [mensagem, setMensagem] = useState('');
  const [mensagemCor, setMensagemCor] = useState('#28C76F');

  // ✅ MOSTRAR OU ESCONDER CONFIRMAÇÃO
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(true);

  // ✅ COR TEMPORÁRIA DO CARD
  const [avisoCor, setAvisoCor] = useState('');

  const mostrarMensagem = (texto, cor) => {
    setMensagem(texto);
    setMensagemCor(cor);

    setTimeout(() => {
      setMensagem('');
    }, 3000);
  };

  const confirmarPresenca = () => {
    mostrarMensagem(
      'Presença confirmada! Esperamos você.',
      '#28C76F'
    );

    setAvisoCor('#D8F8E3');
    setMostrarConfirmacao(false);

    setTimeout(() => {
      setAvisoCor('');
    }, 3000);
  };

  const naoParticipar = () => {
    mostrarMensagem(
      'Que pena! Te esperamos na próxima.',
      '#FF6B6B'
    );

    setAvisoCor('#FFDADA');
    setMostrarConfirmacao(false);

    setTimeout(() => {
      setAvisoCor('');
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container, { paddingTop: topPadding }]}>

          <MenuNavegacao navigation={navigation} />

          <View style={styles.headerText}>

            <Text style={styles.titleHeader}>
              Olá, Matheus!
            </Text>

            <Text style={styles.subtitleHeader}>
              Que bom ter você aqui.
            </Text>

          </View>

          {/* 🔵 CARD AZUL */}
          <View style={styles.blueCard}>

            <Text style={styles.cardTitle}>
              Próxima Missa
            </Text>

            {/* ⚪ CARD BRANCO */}
            <View style={styles.whiteBox}>

              {/* 📅 DATA */}
              <View style={styles.dateBox}>

                <Text style={styles.dayText}>
                  DOM
                </Text>

                <Text style={styles.numberText}>
                  24
                </Text>

                <Text style={styles.monthText}>
                  MAI
                </Text>

              </View>

              {/* ℹ️ INFORMAÇÕES */}
              <View style={styles.infoBox}>

                <Text style={styles.infoDay}>
                  Domingo - 08hs
                </Text>

                <Text style={styles.infoLocal}>
                  Igreja Matriz Nossa Senhora de Nazaré.
                </Text>

                {/* 🟡 BOTÃO */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('Escala')}
                >
                  <Text style={styles.buttonText}>
                    Ver escala
                  </Text>
                </TouchableOpacity>

              </View>

            </View>

          </View>

          {/* 🔔 AVISOS IMPORTANTES */}
          <View style={styles.noticeContainer}>

            <View style={styles.noticeHeader}>
              <Text style={styles.noticeTitle}>
                Avisos importantes
              </Text>

              <TouchableOpacity>
                <Text style={styles.seeAll}>
                  Ver todos
                </Text>
              </TouchableOpacity>
            </View>

            {/* CARD 1 */}
            <View
              style={[
                styles.noticeCard,
                avisoCor !== '' && {
                  backgroundColor: avisoCor
                }
              ]}
            >

              <View style={styles.noticeLeft}>

                <View style={styles.iconBoxPurple}>
                  <Text style={styles.iconText}>👥</Text>
                </View>

                <View>
                  <Text style={styles.noticeCardTitle}>
                    Reunião de Coroinhas
                  </Text>

                  <Text style={styles.noticeCardText}>
                    Sábado, 23/05 às 15hs
                  </Text>

                  <Text style={styles.noticeCardText}>
                    Salão Paroquial.
                  </Text>
                </View>

              </View>

              <View style={styles.purpleDot} />

            </View>

            {/* CARD 2 */}
            <TouchableOpacity
              style={styles.noticeCard}
              onPress={() => navigation.navigate('Escala')}
            >

              <View style={styles.noticeLeft}>

                <View style={styles.iconBoxYellow}>
                  <Text style={styles.iconText}>🔔</Text>
                </View>

                <View>
                  <Text style={styles.noticeCardTitle}>
                    Escala da Semana
                  </Text>

                  <Text style={styles.noticeCardText}>
                    Dias 24, 28 e 29 de Maio
                  </Text>

                  <Text style={styles.noticeCardText}>
                    Escala semanal disponível!
                  </Text>
                </View>

              </View>

              <View style={styles.yellowDot} />

            </TouchableOpacity>

          </View>

          {/* ✅ MENSAGEM */}
          {mensagem !== '' && (
            <View
              style={[
                styles.messageBox,
                { backgroundColor: mensagemCor },
              ]}
            >
              <Text style={styles.messageText}>
                {mensagem}
              </Text>
            </View>
          )}

          {/* ✅ CONFIRME SUA PRESENÇA */}
          {mostrarConfirmacao && (
            <View style={styles.confirmContainer}>

              <Text style={styles.confirmTitle}>
                Confirme sua presença
              </Text>

              <Text style={styles.confirmSubtitle}>
                Reunião de Coroinhas - Sábado às 15hs.
              </Text>

              <View style={styles.confirmButtons}>

                <TouchableOpacity
                  style={styles.confirmYes}
                  onPress={confirmarPresenca}
                >
                  <Text style={styles.confirmYesText}>
                    Vou participar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.confirmNo}
                  onPress={naoParticipar}
                >
                  <Text style={styles.confirmNoText}>
                    Não posso ir
                  </Text>
                </TouchableOpacity>

              </View>

            </View>
          )}

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

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 350,
    position: 'relative',
  },

  headerText: {
    marginLeft: 45,
  },

  titleHeader: {
    fontSize: 24,
    fontWeight: '700',
    color: '#001830',
  },

  subtitleHeader: {
    fontSize: 14,
    color: '#7A7A7A',
    marginTop: 2,
  },

  blueCard: {
    marginTop: 20,
    backgroundColor: '#001B44',
    borderRadius: 16,
    padding: 14,
    width: '92%',
    alignSelf: 'center',
  },

  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  whiteBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateBox: {
    width: 58,
    height: 78,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  dayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#001B44',
  },

  numberText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#001B44',
    lineHeight: 32,
  },

  monthText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#001B44',
  },

  infoBox: {
    flex: 1,
  },

  infoDay: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#001B44',
  },

  infoLocal: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },

  button: {
    marginTop: 10,
    backgroundColor: '#D9A441',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },

  noticeContainer: {
    marginTop: 25,
    width: '92%',
    alignSelf: 'center',
  },

  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  noticeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },

  seeAll: {
    fontSize: 14,
    color: '#666',
  },

  noticeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },

  noticeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBoxPurple: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F3EEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  iconBoxYellow: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFF5DD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  iconText: {
    fontSize: 18,
  },

  noticeCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },

  noticeCardText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  purpleDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#7C4DFF',
  },

  yellowDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5A100',
  },

  /* ✅ MENSAGEM */
  messageBox: {
  position: 'absolute',
  bottom: 25, // deixa acima do menu inferior
  width: '92%',
  alignSelf: 'center',
  paddingVertical: 14,
  paddingHorizontal: 16,
  borderRadius: 14,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999,
},

  messageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  /* ✅ CONFIRME SUA PRESENÇA */
  confirmContainer: {
    marginTop: 18,
    width: '92%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },

  confirmTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },

  confirmSubtitle: {
    marginTop: 6,
    fontSize: 15,
    color: '#666',
  },

  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    gap: 12,
  },

  confirmYes: {
    flex: 1,
    backgroundColor: '#28C76F',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmYesText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  confirmNo: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FF6B6B',
  },

  confirmNoText: {
    color: '#FF6B6B',
    fontWeight: 'bold',
    fontSize: 15,
  },

});