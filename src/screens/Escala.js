import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  Calendar,
  LocaleConfig,
} from 'react-native-calendars';

/* =========================================
   CALENDÁRIO EM PORTUGUÊS
========================================= */

LocaleConfig.locales['pt-br'] = {

  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],

  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],

  dayNames: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ],

  dayNamesShort: [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sáb',
  ],

  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'pt-br';

export default function Escala({ navigation }) {

  const [menuVisible, setMenuVisible] = useState(false);

  const [calendarOpen, setCalendarOpen] = useState(false);

  const [showCalendar, setShowCalendar] = useState(false);

  const [abaAtiva, setAbaAtiva] = useState('proximas');

  const [selectedDate, setSelectedDate] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(null);

  const [attendanceStatus, setAttendanceStatus] = useState({});

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
        setAttendanceStatus((prev) => ({
          ...prev,
          [activity.dateKey]: result,
        }));
      },
    });
  };

  const meses = [
    'jan',
    'fev',
    'mar',
    'abr',
    'mai',
    'jun',
    'jul',
    'ago',
    'set',
    'out',
    'nov',
    'dez',
  ];

  return (

    <SafeAreaView style={styles.safe}>

      <View style={styles.container}>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            setCalendarOpen(false);
            setShowCalendar(false);
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
            onPress={() => {
              setCalendarOpen(!calendarOpen);
              setShowCalendar(false);
              setMenuVisible(false);
            }}
          >

            <Ionicons
              name="calendar-outline"
              size={26}
              color="#001830"
            />

          </TouchableOpacity>

          {calendarOpen && (

            <View style={styles.calendarPopup}>

              {!showCalendar ? (

                <>

                  <Text style={styles.selectMonthText}>
                    Selecione o mês
                  </Text>

                  <View style={styles.monthGrid}>

                    {meses.map((mes, index) => (

                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.monthCircle,

                          currentMonth === index + 1 &&
                            styles.monthCircleActive,
                        ]}

                        onPress={() => {

                          setCurrentMonth(index + 1);

                          setShowCalendar(true);

                        }}
                      >

                        <Text
                          style={[
                            styles.monthCircleText,

                            currentMonth === index + 1 &&
                              styles.monthCircleTextActive,
                          ]}
                        >
                          {mes}
                        </Text>

                      </TouchableOpacity>

                    ))}

                  </View>

                </>

              ) : (

                <>

                  <TouchableOpacity
                    style={styles.backMonthButton}
                    onPress={() => setShowCalendar(false)}
                  >

                    <Ionicons
                      name="arrow-back"
                      size={22}
                      color="#001830"
                    />

                  </TouchableOpacity>

                  <Calendar

                    current={`2026-${String(currentMonth).padStart(2, '0')}-01`}

                    minDate={'2026-01-01'}

                    maxDate={'2026-12-31'}

                    onDayPress={(day) => {

                      setSelectedDate(day.dateString);

                      setCalendarOpen(false);

                      setShowCalendar(false);

                      setAbaAtiva('proximas');

                    }}

                    markedDates={

                      Object.keys(scheduleData).reduce(

                        (acc, date) => {

                          acc[date] = {
                            marked: true,
                            dotColor: '#d6a100',
                          };

                          return acc;

                        },

                        selectedDate
                          ? {
                              [selectedDate]: {
                                selected: true,
                                selectedColor: '#001830',
                              },
                            }
                          : {}
                      )
                    }

                    theme={{

                      todayTextColor: '#001830',

                      arrowColor: '#001830',

                      monthTextColor: '#001830',

                      textMonthFontWeight: 'bold',

                      textMonthFontSize: 20,

                      textDayHeaderFontWeight: 'bold',

                      selectedDayBackgroundColor: '#001830',

                      selectedDayTextColor: '#fff',

                      dayTextColor: '#222',

                      textDisabledColor: '#ccc',
                    }}

                    enableSwipeMonths={true}

                  />

                </>

              )}

            </View>
          )}

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
          showsVerticalScrollIndicator={false}
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

                    {attendanceStatus[activity.dateKey] ? (
                      <View style={styles.statusBox}>
                        <Text
                          style={[
                            styles.statusText,
                            attendanceStatus[activity.dateKey].status === 'confirmed' && styles.statusConfirmed,
                            attendanceStatus[activity.dateKey].status === 'unavailable' && styles.statusUnavailable,
                          ]}
                        >
                          {attendanceStatus[activity.dateKey].status === 'confirmed'
                            ? 'Confirmado'
                            : 'Indisponível'}
                        </Text>
                        <Text style={styles.statusDetail}>
                          {attendanceStatus[activity.dateKey].when}
                        </Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.confirmPresenceButton}
                        onPress={() => openConfirmation(activity)}
                      >
                        <Text style={styles.confirmPresenceText}>
                          Confirmar presença
                        </Text>
                      </TouchableOpacity>
                    )}

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

                  {attendanceStatus[activity.dateKey] ? (
                    <View style={styles.statusBox}>
                      <Text
                        style={[
                          styles.statusText,
                          attendanceStatus[activity.dateKey].status === 'confirmed' && styles.statusConfirmed,
                          attendanceStatus[activity.dateKey].status === 'unavailable' && styles.statusUnavailable,
                        ]}
                      >
                        {attendanceStatus[activity.dateKey].status === 'confirmed'
                          ? 'Confirmado'
                          : 'Indisponível'}
                      </Text>
                      <Text style={styles.statusDetail}>
                        {attendanceStatus[activity.dateKey].when}
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.confirmPresenceButton}
                      onPress={() => openConfirmation(activity)}
                    >
                      <Text style={styles.confirmPresenceText}>
                        Confirmação de presença
                      </Text>
                    </TouchableOpacity>
                  )}

                </View>

              </View>

            ))
          )}

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
  },

  calendarWrapper: {
    position: 'absolute',
    top: 38,
    right: 12,
    zIndex: 10,
    elevation: 6,
  },

  calendarButton: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    elevation: 4,

    borderWidth: 2,
    borderColor: '#001830',
  },

  calendarPopup: {
    position: 'absolute',
    top: 56,
    right: 0,
    width: 350,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 15,
    elevation: 5,

    borderWidth: 2,
    borderColor: '#001830',
  },

  selectMonthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001830',
    marginBottom: 20,
    textAlign: 'center',
  },

  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  monthCircle: {
    width: 75,
    height: 75,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,

    borderWidth: 2,
    borderColor: '#001830',
  },

  monthCircleActive: {
    backgroundColor: '#001830',
  },

  monthCircleText: {
    fontSize: 18,
    color: '#001830',
    fontWeight: '500',
  },

  monthCircleTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },

  backMonthButton: {
    marginBottom: 10,
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

  statusBox: {
    marginTop: 14,
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#f4f4f4',
  },

  statusText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#444',
  },

  statusConfirmed: {
    color: '#196f03',
  },

  statusUnavailable: {
    color: '#b30000',
  },

  statusDetail: {
    fontSize: 13,
    color: '#666',
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