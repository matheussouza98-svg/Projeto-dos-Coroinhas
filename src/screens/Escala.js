import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ANO_MIN = 2000;
const ANO_MAX = 2021;
const DATA_MIN_PICKER = new Date(ANO_MIN, 0, 1);
const DATA_MAX_PICKER = new Date(ANO_MAX, 11, 31);

const MESES_NOMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

function isoFromDate(date) {
  return (
    date.getFullYear() +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0')
  );
}

function dateFromISO(iso) {
  if (!iso) return DATA_MAX_PICKER;
  const [ano, mes, dia] = iso.split('-').map(Number);
  const date = new Date(ano, mes - 1, dia);
  if (date < DATA_MIN_PICKER) return DATA_MIN_PICKER;
  if (date > DATA_MAX_PICKER) return DATA_MAX_PICKER;
  return date;
}

function dataInicialPicker(iso) {
  if (iso) return dateFromISO(iso);
  const hoje = new Date();
  if (hoje < DATA_MIN_PICKER) return DATA_MIN_PICKER;
  if (hoje > DATA_MAX_PICKER) return DATA_MAX_PICKER;
  return hoje;
}

function formatarDataSelecionada(iso) {
  if (!iso) return 'Nenhuma data selecionada';
  const [ano, mes, dia] = iso.split('-');
  const mesNome = MESES_NOMES[Number(mes) - 1] || mes;
  return `${dia} de ${mesNome} de ${ano}`;
}

const chaveAtividade = (activity) => `${activity.dateKey}-${activity.time}`;

const STORAGE_PRESENCAS = '@coroinhas_presencas';

export default function Escala({ navigation, route }) {
  const insets = useSafeAreaInsets();

  const [menuVisible, setMenuVisible] = useState(false);

  const [calendarOpen, setCalendarOpen] = useState(false);

  const [abaAtiva, setAbaAtiva] = useState('proximas');

  const [selectedDate, setSelectedDate] = useState(null);

  const [pickerDate, setPickerDate] = useState(DATA_MAX_PICKER);

  const [attendanceStatus, setAttendanceStatus] = useState({});

  const atualizarPresenca = useCallback((updater) => {
    setAttendanceStatus((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      AsyncStorage.setItem(STORAGE_PRESENCAS, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_PRESENCAS)
      .then((raw) => {
        if (!raw) return;
        const salvo = JSON.parse(raw);
        if (salvo && typeof salvo === 'object') {
          setAttendanceStatus(salvo);
        }
      })
      .catch(() => {});
  }, []);

  useFocusEffect(
    useCallback(() => {
      const aba = route.params?.abaAtiva;
      const presenca = route.params?.presencaAtualizada;

      if (aba === 'proximas' || aba === 'todas') {
        setAbaAtiva(aba);
        setSelectedDate(null);
      }

      if (presenca?.activityKey) {
        atualizarPresenca((prev) => ({
          ...prev,
          [presenca.activityKey]: presenca,
        }));
      }

      if (aba || presenca?.activityKey) {
        navigation.setParams({
          abaAtiva: undefined,
          presencaAtualizada: undefined,
        });
      }
    }, [navigation, route.params?.abaAtiva, route.params?.presencaAtualizada, atualizarPresenca])
  );

  /* =========================================
     CRIAR ESCALAS
  ========================================= */

  const criarEscalaSemana = (
    data,
    dia,
    numero,
    mes,
    pessoa1,
    pessoa2
  ) => ({
    [data]: [
      {
        day: dia,
        number: numero,
        month: mes,
        time: '19hs - Igreja Matriz Nossa Senhora de Nazaré.',
        items: [
          `Servir: ${pessoa1} e ${pessoa2}`,
          `Sino: ${pessoa1}`,
        ],
      },
    ],
  });

  const criarEscalaDomingo = (
    data,
    numero,
    mes,
    pessoa1,
    pessoa2,
    pessoa3,
    pessoa4,
    pessoa5
  ) => ({
    [data]: [
      {
        day: 'DOM',
        number: numero,
        month: mes,
        time: '08hs - Igreja Matriz Nossa Senhora de Nazaré.',
        items: [
          `Turíbulo: ${pessoa1}`,
          `Naveta: ${pessoa2}`,
          `Cruz: ${pessoa3}`,
          `Velas: ${pessoa4} e ${pessoa5}`,
          `Servir: ${pessoa1} e ${pessoa3}`,
          `Sino: ${pessoa1}`,
          `Missal: ${pessoa2}`,
        ],
      },
    ],
  });

  /* =========================================
     ESCALAS EM VÁRIOS MESES
  ========================================= */

  const scheduleData = {

    /* JANEIRO */

    ...criarEscalaSemana(
      '2026-01-05',
      'SEG',
      '05',
      'JAN',
      'Lucas',
      'Pedro'
    ),

    ...criarEscalaDomingo(
      '2026-01-11',
      '11',
      'JAN',
      'Enzo',
      'Gabriel',
      'Miguel',
      'João',
      'Davi'
    ),

    /* FEVEREIRO */

    ...criarEscalaSemana(
      '2026-02-07',
      'SÁB',
      '07',
      'FEV',
      'João',
      'Gabriel'
    ),

    ...criarEscalaDomingo(
      '2026-02-15',
      '15',
      'FEV',
      'Pedro',
      'Lucas',
      'Enzo',
      'Miguel',
      'Davi'
    ),

    /* MARÇO */

    ...criarEscalaSemana(
      '2026-03-03',
      'TER',
      '03',
      'MAR',
      'Miguel',
      'João'
    ),

    ...criarEscalaSemana(
      '2026-03-18',
      'QUA',
      '18',
      'MAR',
      'Gabriel',
      'Pedro'
    ),

    /* ABRIL */

    ...criarEscalaDomingo(
      '2026-04-12',
      '12',
      'ABR',
      'Lucas',
      'Enzo',
      'Pedro',
      'Gabriel',
      'Miguel'
    ),

    ...criarEscalaSemana(
      '2026-04-25',
      'SÁB',
      '25',
      'ABR',
      'Davi',
      'João'
    ),

    /* MAIO */

    ...criarEscalaDomingo(
      '2026-05-24',
      '24',
      'MAI',
      'Lucas',
      'Enzo',
      'Pedro',
      'Gabriel',
      'Miguel'
    ),

    ...criarEscalaSemana(
      '2026-05-28',
      'QUI',
      '28',
      'MAI',
      'Pedro',
      'Lucas'
    ),

    ...criarEscalaSemana(
      '2026-05-29',
      'SEX',
      '29',
      'MAI',
      'João',
      'Gabriel'
    ),

    /* JUNHO */

    ...criarEscalaSemana(
      '2026-06-06',
      'SÁB',
      '06',
      'JUN',
      'Lucas',
      'Miguel'
    ),

    ...criarEscalaDomingo(
      '2026-06-14',
      '14',
      'JUN',
      'Gabriel',
      'Pedro',
      'João',
      'Lucas',
      'Davi'
    ),

    /* JULHO */

    ...criarEscalaSemana(
      '2026-07-09',
      'QUI',
      '09',
      'JUL',
      'Enzo',
      'Matheus'
    ),

    ...criarEscalaDomingo(
      '2026-07-19',
      '19',
      'JUL',
      'Lucas',
      'Pedro',
      'Miguel',
      'Gabriel',
      'João'
    ),

    /* AGOSTO */

    ...criarEscalaSemana(
      '2026-08-08',
      'SÁB',
      '08',
      'AGO',
      'Pedro',
      'Gabriel'
    ),

    ...criarEscalaSemana(
      '2026-08-26',
      'QUA',
      '26',
      'AGO',
      'Lucas',
      'João'
    ),

    /* SETEMBRO */

    ...criarEscalaDomingo(
      '2026-09-13',
      '13',
      'SET',
      'Miguel',
      'Enzo',
      'Pedro',
      'Gabriel',
      'Lucas'
    ),

    /* OUTUBRO */

    ...criarEscalaSemana(
      '2026-10-03',
      'SÁB',
      '03',
      'OUT',
      'João',
      'Davi'
    ),

    ...criarEscalaSemana(
      '2026-10-21',
      'QUA',
      '21',
      'OUT',
      'Pedro',
      'Lucas'
    ),

    /* NOVEMBRO */

    ...criarEscalaDomingo(
      '2026-11-08',
      '08',
      'NOV',
      'Gabriel',
      'Miguel',
      'Lucas',
      'João',
      'Pedro'
    ),

    /* DEZEMBRO */

    ...criarEscalaSemana(
      '2026-12-12',
      'SÁB',
      '12',
      'DEZ',
      'Enzo',
      'Gabriel'
    ),

    ...criarEscalaDomingo(
      '2026-12-20',
      '20',
      'DEZ',
      'Pedro',
      'Lucas',
      'Miguel',
      'João',
      'Gabriel'
    ),
  };

  /* =========================================
     ESCALA SEMANA
  ========================================= */

  const weekSchedule = [

    ...(scheduleData['2026-05-24'] || []).map(item => ({
      ...item,
      dateKey: '2026-05-24',
    })),

    ...(scheduleData['2026-05-28'] || []).map(item => ({
      ...item,
      dateKey: '2026-05-28',
    })),

    ...(scheduleData['2026-05-29'] || []).map(item => ({
      ...item,
      dateKey: '2026-05-29',
    })),
  ];

  /* =========================================
   TODAS ESCALAS
========================================= */

  const allSchedule = Object.keys(scheduleData)

    // DEZEMBRO → JANEIRO
    .sort((a, b) => new Date(b) - new Date(a))

    .flatMap(key =>
      (scheduleData[key] || []).map(activity => ({
        ...activity,
        dateKey: key,
      }))
    );

  const selectedSchedule = selectedDate
    ? scheduleData[selectedDate] || []
    : [];

  const openConfirmation = (activity) => {
    navigation.getParent()?.navigate('ConfirmacaoPresenca', {
      activity,
      onSubmit: (result) => {
        const key = result.activityKey || chaveAtividade(activity);
        atualizarPresenca((prev) => ({
          ...prev,
          [key]: result,
        }));
      },
    });
  };

  const renderPresencaAction = (activity) => {
    const key = chaveAtividade(activity);
    const status = attendanceStatus[key];

    if (status) {
      const confirmado = status.status === 'confirmed';

      return (
        <View
          style={[
            styles.presencaStatusBox,
            confirmado
              ? styles.presencaSuccessBox
              : styles.presencaUnavailableBox,
          ]}
        >
          <Text
            style={[
              styles.presencaStatusIcon,
              confirmado
                ? styles.presencaSuccessIcon
                : styles.presencaUnavailableIcon,
            ]}
          >
            {confirmado ? '✓' : '✕'}
          </Text>

          <View style={styles.presencaStatusContent}>
            <Text
              style={[
                styles.presencaStatusText,
                confirmado
                  ? styles.presencaSuccessText
                  : styles.presencaUnavailableText,
              ]}
            >
              {confirmado ? 'Vou participar' : 'Não poderei ir'}
            </Text>

            {status.when ? (
              <Text
                style={[
                  styles.presencaStatusWhen,
                  confirmado
                    ? styles.presencaSuccessText
                    : styles.presencaUnavailableText,
                ]}
              >
                {status.when}
              </Text>
            ) : null}
          </View>
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={styles.confirmPresenceButton}
        onPress={() => openConfirmation(activity)}
      >
        <Text style={styles.confirmPresenceText}>
          Confirmação de presença
        </Text>
      </TouchableOpacity>
    );
  };

  function abrirCalendario() {
    setPickerDate(dataInicialPicker(selectedDate));
    setCalendarOpen(true);
    setMenuVisible(false);
  }

  function aoMudarDataPicker(event, date) {
    if (Platform.OS === 'android' && event.type === 'dismissed') {
      setCalendarOpen(false);
      return;
    }
    if (date) setPickerDate(date);
  }

  function confirmarDataPicker() {
    setSelectedDate(isoFromDate(pickerDate));
    setCalendarOpen(false);
    setAbaAtiva('proximas');
  }

  function limparDataFiltro() {
    setSelectedDate(null);
    setCalendarOpen(false);
  }

  const pickerDisplay =
    Platform.OS === 'ios' ? 'spinner' : 'spinner';

  return (

    <SafeAreaView style={styles.safe}>

      <View style={styles.container}>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            setCalendarOpen(false);
            setMenuVisible((v) => !v);
          }}
        >
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>

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

        <View style={styles.calendarWrapper}>

          <TouchableOpacity
            style={styles.calendarButton}
            onPress={abrirCalendario}
          >

            <Ionicons
              name="calendar-outline"
              size={26}
              color="#001830"
            />

          </TouchableOpacity>

        </View>

        <Text style={styles.titulo}>
          Escalas
        </Text>

        <View style={styles.tabs}>

          <TouchableOpacity
            style={
              abaAtiva === 'proximas'
                ? styles.tabActive
                : styles.tab
            }
            onPress={() => {
              setAbaAtiva('proximas');
              setSelectedDate(null);
            }}
          >

            <Text
              style={
                abaAtiva === 'proximas'
                  ? styles.tabTextActive
                  : styles.tabText
              }
            >
              Semana
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={
              abaAtiva === 'todas'
                ? styles.tabActive
                : styles.tab
            }
            onPress={() => {
              setAbaAtiva('todas');
              setSelectedDate(null);
            }}
          >

            <Text
              style={
                abaAtiva === 'todas'
                  ? styles.tabTextActive
                  : styles.tabText
              }
            >
              Todas
            </Text>

          </TouchableOpacity>

        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 120 }}
        >

          {selectedDate ? (

            selectedSchedule.length > 0 ? (

              selectedSchedule.map((activity, index) => (

                <View
                  style={styles.card}
                  key={`${selectedDate}-${index}`}
                >

                  <View style={styles.dataBox}>

                    <Text style={styles.dataDiaSemana}>
                      {activity.day}
                    </Text>

                    <Text style={styles.dataNumero}>
                      {activity.number}
                    </Text>

                    <Text style={styles.dataMes}>
                      {activity.month}
                    </Text>

                  </View>

                  <View style={styles.cardInfo}>

                    <Text style={styles.horario}>
                      {activity.time}
                    </Text>

                    {activity.items.map((item, itemIndex) => (

                      <Text
                        style={styles.info}
                        key={itemIndex}
                      >
                        {item}
                      </Text>

                    ))}

                    {renderPresencaAction(activity)}

                  </View>

                </View>

              ))

            ) : (

              <View style={styles.emptyBox}>

                <Ionicons
                  name="calendar-clear-outline"
                  size={55}
                  color="#999"
                />

                <Text style={styles.emptyTitle}>
                  Nenhuma escala disponível
                </Text>

              </View>

            )

          ) : (

            (abaAtiva === 'proximas'
              ? weekSchedule
              : allSchedule
            ).map((activity, index) => (

              <View
                style={styles.card}
                key={`${activity.dateKey}-${index}`}
              >

                <View style={styles.dataBox}>

                  <Text style={styles.dataDiaSemana}>
                    {activity.day}
                  </Text>

                  <Text style={styles.dataNumero}>
                    {activity.number}
                  </Text>

                  <Text style={styles.dataMes}>
                    {activity.month}
                  </Text>

                </View>

                <View style={styles.cardInfo}>

                  <Text style={styles.horario}>
                    {activity.time}
                  </Text>

                  {activity.items.map((item, itemIndex) => (

                    <Text
                      style={styles.info}
                      key={itemIndex}
                    >
                      {item}
                    </Text>

                  ))}

                  {renderPresencaAction(activity)}

                </View>

              </View>

            ))
          )}

        </ScrollView>

      </View>

      <Modal
        transparent
        animationType="slide"
        visible={calendarOpen}
        onRequestClose={() => setCalendarOpen(false)}
      >
        <View style={styles.dateModalOverlay}>
          <Pressable
            style={styles.dateModalBackdrop}
            onPress={() => setCalendarOpen(false)}
          />
          <View style={[styles.dateSheet, { paddingBottom: insets.bottom + 16 }]}>
            <View style={styles.sheetHandle} />

            <View style={styles.dateSheetHeader}>
              <Ionicons name="calendar" size={22} color="#001830" />
              <Text style={styles.dateSheetTitle}>Selecionar data</Text>
            </View>

            <View style={styles.datePreviewBox}>
              <Text style={styles.datePreviewLabel}>Data escolhida</Text>
              <Text style={styles.datePreviewValue}>
                {formatarDataSelecionada(isoFromDate(pickerDate))}
              </Text>
              <Text style={styles.datePreviewRange}>
                Período: {ANO_MIN} a {ANO_MAX}
              </Text>
            </View>

            <View style={styles.pickerWrap}>
              <DateTimePicker
                value={pickerDate}
                mode="date"
                display={pickerDisplay}
                onChange={aoMudarDataPicker}
                minimumDate={DATA_MIN_PICKER}
                maximumDate={DATA_MAX_PICKER}
                locale="pt-BR"
                themeVariant="light"
                style={styles.datePicker}
              />
            </View>

            <View style={styles.dateSheetActions}>
              <TouchableOpacity
                style={styles.dateBtnOutline}
                onPress={limparDataFiltro}
                activeOpacity={0.8}
              >
                <Text style={styles.dateBtnOutlineText}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dateBtnOutline}
                onPress={() => setCalendarOpen(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.dateBtnOutlineText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dateBtnPrimary}
                onPress={confirmarDataPicker}
                activeOpacity={0.85}
              >
                <Text style={styles.dateBtnPrimaryText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    position: 'relative',
  },

  menuButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    padding: 8,
    zIndex: 30,
  },

  menuIcon: {
    color: '#000',
    fontSize: 26,
    fontWeight: 'bold',
  },

  dropdownMenu: {
    position: 'absolute',
    top: 52,
    left: 12,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 25,
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
    fontWeight: 'normal',
  },

  dropdownTextLarge: {
    fontSize: 20,
    fontWeight: 'normal',
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#001830',
    marginBottom: 25,
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#d6a100',
    paddingBottom: 8,
    width: 120,
    alignItems: 'center',
  },

  tab: {
    paddingBottom: 8,
    width: 120,
    alignItems: 'center',
  },

  tabTextActive: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111',
  },

  tabText: {
    fontSize: 17,
    color: '#777',
  },

  content: {
    flex: 1,
    marginTop: 10,
    maxHeight: '75%',
  },

  calendarWrapper: {
    position: 'absolute',
    top: 44,
    right: 12,
    zIndex: 10,
    elevation: 6,
  },

  calendarButton: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },

  dateModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  dateModalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 24, 48, 0.45)',
  },

  dateSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 16,
  },

  sheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    marginBottom: 14,
  },

  dateSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },

  dateSheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#001830',
  },

  datePreviewBox: {
    backgroundColor: '#F4F7FA',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
  },

  datePreviewLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 4,
  },

  datePreviewValue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#001830',
  },

  datePreviewRange: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 6,
  },

  pickerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
    minHeight: Platform.OS === 'ios' ? 216 : 180,
  },

  datePicker: {
    width: '100%',
    height: Platform.OS === 'ios' ? 216 : 180,
  },

  dateSheetActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },

  dateBtnOutline: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: '#001830',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dateBtnOutlineText: {
    color: '#001830',
    fontSize: 14,
    fontWeight: '700',
  },

  dateBtnPrimary: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#001830',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dateBtnPrimaryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },

  emptyBox: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  emptyTitle: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 14,
    marginBottom: 18,
    flexDirection: 'row',
    elevation: 3,
  },

  dataBox: {
    width: 75,
    height: 110,
    backgroundColor: '#001830',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  dataDiaSemana: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  dataNumero: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 2,
  },

  dataMes: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  cardInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  horario: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },

  info: {
    fontSize: 15,
    color: '#555',
    marginBottom: 4,
  },

  confirmPresenceButton: {
    marginTop: 10,
    backgroundColor: '#d6a100',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },

  confirmPresenceText: {
    fontSize: 14,
    color: '#001830',
    fontWeight: 'bold',
  },

  presencaStatusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    padding: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },

  presencaSuccessBox: {
    backgroundColor: '#E8F6EA',
    borderColor: '#4CAF50',
    borderWidth: 1,
  },

  presencaUnavailableBox: {
    backgroundColor: '#FDECEA',
    borderColor: '#d32f2f',
    borderWidth: 1,
  },

  presencaStatusIcon: {
    marginRight: 8,
    fontSize: 16,
  },

  presencaSuccessIcon: {
    color: '#4CAF50',
  },

  presencaUnavailableIcon: {
    color: '#d32f2f',
  },

  presencaStatusContent: {
    flex: 1,
    flexShrink: 1,
  },

  presencaStatusText: {
    fontSize: 13,
    fontWeight: 'bold',
  },

  presencaStatusWhen: {
    fontSize: 13,
    marginTop: 2,
  },

  presencaSuccessText: {
    color: '#2E7D32',
  },

  presencaUnavailableText: {
    color: '#d32f2f',
  },

  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },

  confirmationPanel: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 22,
    elevation: 10,
  },

  confirmationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  confirmationTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#001830',
  },

  confirmationInfo: {
    marginBottom: 18,
  },

  confirmationCardDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001830',
    marginBottom: 6,
  },

  confirmationCardTime: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
  },

  confirmationItem: {
    fontSize: 15,
    color: '#555',
    marginBottom: 6,
  },

  actionButton: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },

  confirmButton: {
    backgroundColor: '#196f03',
  },

  cancelButton: {
    backgroundColor: '#b30000',
  },

  sendButton: {
    backgroundColor: '#001830',
  },

  disabledButton: {
    backgroundColor: '#ccc',
  },

  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  justificationLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },

  justificationInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 14,
    padding: 12,
    textAlignVertical: 'top',
    marginBottom: 14,
    color: '#111',
  },
});