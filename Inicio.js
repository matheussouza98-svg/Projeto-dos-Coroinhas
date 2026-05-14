import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
 TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Inicio({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

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

    // some após 3 segundos
    setTimeout(() => {
      setMensagem('');
    }, 3000);
  };

  const confirmarPresenca = () => {
    mostrarMensagem(
      'Presença confirmada! Esperamos você.',
      '#28C76F'
    );

    // CARD VERDE
    setAvisoCor('#D8F8E3');

    setMostrarConfirmacao(false);

    // VOLTA AO NORMAL
    setTimeout(() => {
      setAvisoCor('');
    }, 3000);
  };

  const naoParticipar = () => {
    mostrarMensagem(
      'Que pena! Te esperamos na próxima.',
      '#FF6B6B'
    );

    // CARD VERMELHO
    setAvisoCor('#FFDADA');

    setMostrarConfirmacao(false);

    // VOLTA AO NORMAL
    setTimeout(() => {
      setAvisoCor('');
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.safe}>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>

          {/* HEADER */}
          <View style={styles.header}>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setMenuVisible(v => !v)}
            >
              <Text style={styles.menuIcon}>≡</Text>
            </TouchableOpacity>

            <View style={styles.headerText}>

              <Text style={styles.titleHeader}>
                Olá, Matheus!
              </Text>

              <Text style={styles.subtitleHeader}>
                Que bom ter você aqui.
              </Text>

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
                      26
                    </Text>

                    <Text style={styles.monthText}>
                      MAI
                    </Text>

                  </View>

                  {/* ℹ️ INFORMAÇÕES */}
                  <View style={styles.infoBox}>

                    <Text style={styles.infoDay}>
                      Domingo - 18hs
                    </Text>

                    <Text style={styles.infoLocal}>
                      Igreja Matriz de Nossa Senhora de Nazaré.
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
                        Sábado, 25/05 às 15H00
                      </Text>

                      <Text style={styles.noticeCardText}>
                        Salão Paroquial
                      </Text>
                    </View>

                  </View>

                  <View style={styles.purpleDot} />

                </View>

                {/* CARD 2 */}
                <View style={styles.noticeCard}>

                  <View style={styles.noticeLeft}>

                    <View style={styles.iconBoxYellow}>
                      <Text style={styles.iconText}>🔔</Text>
                    </View>

                    <View>
                      <Text style={styles.noticeCardTitle}>
                        Escala de Coroinhas
                      </Text>

                      <Text style={styles.noticeCardText}>
                        Dias 08 e 09 de Junho
                      </Text>

                      <Text style={styles.noticeCardText}>
                        Inscrições abertas!
                      </Text>
                    </View>

                  </View>

                  <View style={styles.yellowDot} />

                </View>

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
                    Missa • Domingo às 18h00
                  </Text>

                  <View style={styles.confirmButtons}>

                    {/* BOTÃO VERDE */}
                    <TouchableOpacity
                      style={styles.confirmYes}
                      onPress={confirmarPresenca}
                    >
                      <Text style={styles.confirmYesText}>
                        Vou participar
                      </Text>
                    </TouchableOpacity>

                    {/* BOTÃO VERMELHO */}
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

          </View>

          {/* MENU DROPDOWN */}
          {menuVisible && (
            <View style={styles.dropdownMenu}>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate('Inicio');
                }}
              >
                <Text style={[styles.dropdownText, styles.dropdownTextLarge]}>
                  Início
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate('Escala');
                }}
              >
                <Text style={[styles.dropdownText, styles.dropdownTextLarge]}>
                  Escala
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate('Oracoes');
                }}
              >
                <Text style={[styles.dropdownText, styles.dropdownTextLarge]}>
                  Orações
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate('Perfil');
                }}
              >
                <Text style={[styles.dropdownText, styles.dropdownTextLarge]}>
                  Perfil
                </Text>
              </TouchableOpacity>

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
    paddingBottom: 40,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },

  menuButton: {
    padding: 8,
    marginRight: 10,
  },

  menuIcon: {
    color: '#000',
    fontSize: 26,
    fontWeight: 'bold',
  },

  headerText: {
    flex: 1,
  },

  titleHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001830',
  },

  subtitleHeader: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },

  /* 🔵 CARD AZUL */
  blueCard: {
    marginTop: 12,
    backgroundColor: '#001B44',
    borderRadius: 16,
    padding: 14,
    width: '92%',
  },

  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  /* ⚪ CARD BRANCO */
  whiteBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,

    flexDirection: 'row',
    alignItems: 'center',
  },

  /* 📅 DATA */
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

  /* ℹ️ INFORMAÇÕES */
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

  /* 🟡 BOTÃO */
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

  /* 🔔 AVISOS */
  noticeContainer: {
    marginTop: 25,
    width: '92%',
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
    marginTop: 290,
    width: '92%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  messageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  /* ✅ CONFIRME PRESENÇA */
  confirmContainer: {
    marginTop: 10,
    width: '92%',

    backgroundColor: '#fff',
    borderRadius: 18,
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
  },

  confirmYes: {
    flex: 1,
    backgroundColor: '#28C76F',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 10,
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

  /* MENU DROPDOWN */
  dropdownMenu: {
    position: 'absolute',
    top: 70,
    left: 12,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 10,
    minWidth: 160,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  dropdownText: {
    color: '#000',
    fontSize: 18,
  },

  dropdownTextLarge: {
    fontSize: 20,
  },

});