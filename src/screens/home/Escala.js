import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStatusBarPadding } from '../../utils/safeArea';
import { Ionicons } from '@expo/vector-icons';

const ANO_MIN = 2000;
const ANO_MAX = 2126;
const DATA_MIN = `${ANO_MIN}-01-01`;
const DATA_MAX = `${ANO_MAX}-12-31`;

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

LocaleConfig.locales['pt-br'] = {
  monthNames: [...MESES],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt-br';

const COR_PONTO_ESCALA = '#d6a100';

const temaCalendario = {
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  textSectionTitleColor: '#6B7280',
  selectedDayBackgroundColor: '#001830',
  selectedDayTextColor: '#ffffff',
  dotColor: COR_PONTO_ESCALA,
  selectedDotColor: COR_PONTO_ESCALA,
  dotStyle: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 1,
    backgroundColor: COR_PONTO_ESCALA,
  },
  todayTextColor: '#1976D2',
  todayBackgroundColor: '#E8EEF4',
  dayTextColor: '#001830',
  textDisabledColor: '#D1D5DB',
  arrowColor: '#001830',
  monthTextColor: '#001830',
  textDayFontWeight: '500',
  textMonthFontWeight: '700',
  textDayHeaderFontWeight: '600',
  textDayFontSize: 15,
  textMonthFontSize: 17,
  textDayHeaderFontSize: 12,
  'stylesheet.calendar.header': {
    header: {
      height: 0,
      overflow: 'hidden',
    },
  },
  'stylesheet.marking': {
    dot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      marginTop: 2,
      backgroundColor: COR_PONTO_ESCALA,
    },
  },
};

function dataHojeISO() {
  const agora = new Date();
  return (
    agora.getFullYear() +
    '-' +
    String(agora.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(agora.getDate()).padStart(2, '0')
  );
}

function partesDaISO(iso) {
  const hoje = new Date();
  const partes = (iso || '').split('-');
  const ano = Number(partes[0]) || hoje.getFullYear();
  const mes = Number(partes[1]) || hoje.getMonth() + 1;
  const dia = Number(partes[2]) || hoje.getDate();
  const mesIndex = Math.max(0, Math.min(11, mes - 1));
  return { ano, mesIndex, dia };
}

function formatarPreviewData(iso) {
  const { ano, mesIndex, dia } = partesDaISO(iso);
  return `${String(dia).padStart(2, '0')} de ${MESES[mesIndex]} de ${ano}`;
}

function montarISO(ano, mesIndex, dia, minDate, maxDate) {
  const anoNum = Number(ano);
  const mesIdx = Number(mesIndex);
  const diaNum = Number(dia);
  const maxDia = new Date(anoNum, mesIdx + 1, 0).getDate();
  const diaFinal = Math.min(diaNum, maxDia);
  const mes = String(mesIdx + 1).padStart(2, '0');
  const diaStr = String(diaFinal).padStart(2, '0');
  const iso = `${anoNum}-${mes}-${diaStr}`;
  if (iso > maxDate) return maxDate;
  if (iso < minDate) return minDate;
  return iso;
}

function mudarMesCalendario(ano, mesIndex, dia, delta, minDate, maxDate) {
  let novoMes = mesIndex + delta;
  let novoAno = ano;
  if (novoMes < 0) {
    novoMes = 11;
    novoAno -= 1;
  } else if (novoMes > 11) {
    novoMes = 0;
    novoAno += 1;
  }
  return montarISO(novoAno, novoMes, dia, minDate, maxDate);
}

function podeIrMesAnterior(ano, mesIndex, minDate) {
  const minAno = Number(minDate.slice(0, 4));
  const minMes = Number(minDate.slice(5, 7));
  return ano > minAno || (ano === minAno && mesIndex + 1 > minMes);
}

function podeIrMesProximo(ano, mesIndex, maxDate) {
  const maxAno = Number(maxDate.slice(0, 4));
  const maxMes = Number(maxDate.slice(5, 7));
  return ano < maxAno || (ano === maxAno && mesIndex + 1 < maxMes);
}

function montarMarkedDates(isoSelecionada, datasComEscala = []) {
  const marcadas = {};

  datasComEscala.forEach((dataISO) => {
    marcadas[dataISO] = {
      marked: true,
      dotColor: COR_PONTO_ESCALA,
    };
  });

  const iso = isoSelecionada || dataHojeISO();
  const temEscalaNoDia = datasComEscala.includes(iso);
  marcadas[iso] = {
    ...(marcadas[iso] || {}),
    selected: true,
    selectedColor: '#001830',
    selectedTextColor: '#ffffff',
    ...(temEscalaNoDia
      ? { marked: true, dotColor: COR_PONTO_ESCALA }
      : {}),
  };

  return marcadas;
}

function DiaCalendario({ date, state, marking, onPress }) {
  const temEscala = Boolean(marking?.marked);
  const selecionado = Boolean(marking?.selected || state === 'selected');
  const inativo = state === 'disabled' || state === 'inactive';

  return (
    <TouchableOpacity
      style={styles.diaCalendarioCelula}
      onPress={() => onPress?.(date)}
      disabled={state === 'disabled'}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.diaCalendarioFundo,
          selecionado && styles.diaCalendarioFundoSelecionado,
        ]}
      >
        <Text
          style={[
            styles.diaCalendarioNumero,
            selecionado && styles.diaCalendarioNumeroSelecionado,
            inativo && styles.diaCalendarioNumeroInativo,
          ]}
        >
          {date.day}
        </Text>
      </View>
      {temEscala ? <View style={styles.diaCalendarioPonto} /> : null}
    </TouchableOpacity>
  );
}

function anosNoIntervalo(minDate, maxDate) {
  const anoMin = Number(minDate.slice(0, 4));
  const anoMax = Number(maxDate.slice(0, 4));
  return Array.from({ length: anoMax - anoMin + 1 }, (_, i) => anoMax - i);
}

function DropdownCampo({ label, valor, aberto, onToggle, opcoes, onSelecionar, valorAtivo, estilos }) {
  return (
    <View style={estilos.dropdownWrap}>
      <Text style={estilos.dropdownLabel}>{label}</Text>
      <TouchableOpacity
        style={[estilos.dropdownField, aberto && estilos.dropdownFieldAberto]}
        onPress={onToggle}
        activeOpacity={0.8}
      >
        <Text style={estilos.dropdownValor} numberOfLines={1}>
          {valor}
        </Text>
        <Ionicons
          name={aberto ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#6B7280"
        />
      </TouchableOpacity>
      {aberto ? (
        <View style={estilos.dropdownLista}>
          <ScrollView
            style={estilos.dropdownScroll}
            contentContainerStyle={estilos.dropdownScrollContent}
            nestedScrollEnabled
            showsVerticalScrollIndicator
            persistentScrollbar
            indicatorStyle="black"
            keyboardShouldPersistTaps="handled"
          >
            {opcoes.map((opcao) => {
              const ativo = opcao.valor === valorAtivo;
              return (
                <TouchableOpacity
                  key={String(opcao.valor)}
                  style={[estilos.dropdownItem, ativo && estilos.dropdownItemAtivo]}
                  onPress={() => onSelecionar(opcao.valor)}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[estilos.dropdownItemText, ativo && estilos.dropdownItemTextAtivo]}
                  >
                    {opcao.rotulo}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}

function formatarQuandoConfirmacao(when) {
  if (!when) return '';

  const match = when.match(/(\d{2})\/(\d{2})\/\d{4},?\s*(\d{2}:\d{2})/);
  if (match) {
    return `${match[1]}/${match[2]} às ${match[3]}`;
  }

  return when;
}

const chaveAtividade = (activity) => `${activity.dateKey}-${activity.time}`;

export default function Escala({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const topPadding = useStatusBarPadding();
  const [menuVisible, setMenuVisible] = useState(false);

  const [calendarOpen, setCalendarOpen] = useState(false);

  const [abaAtiva, setAbaAtiva] = useState('semana');

  const [selectedDate, setSelectedDate] = useState(null);
  const [dataSelecionadaISO, setDataSelecionadaISO] = useState('');
  const [dropdownAberto, setDropdownAberto] = useState(null);

  useEffect(() => {
    if (!calendarOpen) {
      setDropdownAberto(null);
      return;
    }
    let iso = selectedDate || dataHojeISO();
    if (iso > DATA_MAX) iso = DATA_MAX;
    if (iso < DATA_MIN) iso = DATA_MIN;
    setDataSelecionadaISO(iso);
  }, [calendarOpen, selectedDate]);

  const { ano, mesIndex, dia } = partesDaISO(dataSelecionadaISO);
  const mesCalendarioISO = dataSelecionadaISO || dataHojeISO();
  const anos = useMemo(() => anosNoIntervalo(DATA_MIN, DATA_MAX), []);
  const opcoesMes = MESES.map((nome, index) => ({ valor: index, rotulo: nome }));
  const opcoesAno = anos.map((a) => ({ valor: a, rotulo: String(a) }));

  function fecharDropdowns() {
    setDropdownAberto(null);
  }

  function confirmarData() {
    setSelectedDate(dataSelecionadaISO);
    setCalendarOpen(false);
    setAbaAtiva('semana');
  }

  const [attendanceStatus, setAttendanceStatus] = useState({});

  function registrarPresenca(presenca) {
    if (!presenca?.activityKey) return;

    setAttendanceStatus((prev) => ({
      ...prev,
      [presenca.activityKey]: presenca,
    }));
  }

  useFocusEffect(
    useCallback(() => {
      const aba = route.params?.abaAtiva;

      if (aba === 'semana' || aba === 'todas') {
        setAbaAtiva(aba);
        setSelectedDate(null);
        navigation.setParams({ abaAtiva: undefined });
      }
    }, [navigation, route.params?.abaAtiva])
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

    '2026-05-24': [
      {
        day: 'DOM',
        number: '24',
        month: 'MAI',
        time: '08hs - Igreja Matriz Nossa Senhora de Nazaré.',
        items: [
          'Turíbulo: Gabriel',
          'Naveta: Pedro',
          'Cruz: Matheus',
          'Velas: João e Gabriel',
          'Servir: Matheus, João e Gabriel',
          'Sino: Matheus',
          'Missal: Pedro',
        ],
      },
    ],

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

  const datasMarcadas = useMemo(
    () => montarMarkedDates(dataSelecionadaISO, Object.keys(scheduleData)),
    [dataSelecionadaISO]
  );

  const DIAS_SEMANA = ['2026-05-24', '2026-05-28', '2026-05-29'];

  const weekSchedule = DIAS_SEMANA.flatMap((key) =>
    (scheduleData[key] || []).map((activity) => ({
      ...activity,
      dateKey: key,
    }))
  );

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

  const renderSemEscala = (estiloBox) => (
    <View style={estiloBox}>
      <Ionicons name="calendar-clear-outline" size={55} color="#999" />
      <Text style={styles.emptyTitle}>Nenhuma escala cadastrada</Text>
    </View>
  );

  const openConfirmation = (activity) => {
    const key = chaveAtividade(activity);
    navigation.getParent()?.navigate('ConfirmacaoPresenca', {
      activity,
      presencaSalva: attendanceStatus[key] ?? null,
      onSubmit: (result) => {
        registrarPresenca({
          ...result,
          activityKey: result.activityKey || key,
        });
      },
    });
  };

  const renderEscalaCard = (activity, index, keyPrefix) => {
    const key = chaveAtividade(activity);
    const status = attendanceStatus[key] ?? null;
    const confirmado = status?.status === 'confirmed';
    const indisponivel = status?.status === 'unavailable';
    const temResposta = confirmado || indisponivel;

    return (
      <View style={styles.card} key={`${keyPrefix}-${index}`}>
        <View style={styles.cardMainRow}>
          <View style={styles.dataBox}>
            <Text style={styles.dataDiaSemana}>{activity.day}</Text>
            <Text style={styles.dataNumero}>{activity.number}</Text>
            <Text style={styles.dataMes}>{activity.month}</Text>
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.horario}>{activity.time}</Text>

            {activity.items.map((item, itemIndex) => (
              <Text style={styles.info} key={itemIndex}>
                {item}
              </Text>
            ))}

            {temResposta ? (
              <View
                style={[
                  styles.statusBadge,
                  confirmado
                    ? styles.statusBadgeConfirmado
                    : styles.statusBadgeIndisponivel,
                ]}
              >
                <Text
                  style={[
                    styles.statusBadgeText,
                    confirmado
                      ? styles.statusBadgeTextConfirmado
                      : styles.statusBadgeTextIndisponivel,
                  ]}
                >
                  {confirmado ? 'Confirmado' : 'Indisponível'}
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

        {temResposta ? (
          <View
            style={[
              styles.presencaFooter,
              confirmado
                ? styles.presencaFooterConfirmado
                : styles.presencaFooterIndisponivel,
            ]}
          >
            <View
              style={[
                styles.presencaFooterIconCircle,
                confirmado
                  ? styles.presencaFooterIconConfirmado
                  : styles.presencaFooterIconIndisponivel,
              ]}
            >
              <Text style={styles.presencaFooterIconText}>
                {confirmado ? '✓' : '✕'}
              </Text>
            </View>

            <Text style={styles.presencaFooterText}>
              {confirmado
                ? `Você confirmou sua presença em ${formatarQuandoConfirmacao(status.when)}`
                : `Você informou que não poderá ir em ${formatarQuandoConfirmacao(status.when)}`}
            </Text>
          </View>
        ) : null}
      </View>
    );
  };

  function abrirCalendario() {
    setCalendarOpen(true);
    setMenuVisible(false);
  }

  return (

    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>

      <View style={[styles.container, { paddingTop: topPadding }]}>

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
              abaAtiva === 'semana'
                ? styles.tabActive
                : styles.tab
            }
            onPress={() => {
              setAbaAtiva('semana');
              setSelectedDate(null);
            }}
          >

            <Text
              style={
                abaAtiva === 'semana'
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

              selectedSchedule.map((activity, index) =>
                renderEscalaCard(
                  { ...activity, dateKey: selectedDate },
                  index,
                  selectedDate
                )
              )

            ) : (
              renderSemEscala(styles.emptyBox)
            )

          ) : (

            (abaAtiva === 'semana'
              ? weekSchedule
              : allSchedule
            ).map((activity, index) =>
              renderEscalaCard(
                activity,
                index,
                activity.dateKey || `lista-${abaAtiva}`
              )
            )
          )}

        </ScrollView>

      </View>

      <Modal
        transparent
        animationType="slide"
        visible={calendarOpen}
        onRequestClose={() => setCalendarOpen(false)}
      >
        <View style={styles.dateOverlay}>
          <Pressable
            style={styles.dateBackdrop}
            onPress={() => setCalendarOpen(false)}
          />
          <ScrollView
            style={[styles.dateSheet, { paddingBottom: insets.bottom + 20 }]}
            contentContainerStyle={styles.dateSheetContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.dateHandle} />
            <View style={styles.dateHeader}>
              <Ionicons name="calendar" size={22} color="#001830" />
              <Text style={styles.dateTitulo}>Selecionar data</Text>
            </View>
            <View style={styles.datePreviewBox}>
              <Text style={styles.datePreviewLabel}>Data Selecionada</Text>
              <Text style={styles.datePreviewValor}>
                {formatarPreviewData(dataSelecionadaISO)}
              </Text>
              <Text style={styles.datePreviewPeriodo}>
                Período: {ANO_MIN} a {ANO_MAX}
              </Text>
            </View>
            <View style={styles.dateDropdownRow}>
              <DropdownCampo
                label="Mês"
                valor={MESES[mesIndex]}
                aberto={dropdownAberto === 'mes'}
                onToggle={() =>
                  setDropdownAberto((atual) => (atual === 'mes' ? null : 'mes'))
                }
                opcoes={opcoesMes}
                onSelecionar={(novoMes) => {
                  setDataSelecionadaISO(montarISO(ano, novoMes, dia, DATA_MIN, DATA_MAX));
                  fecharDropdowns();
                }}
                valorAtivo={mesIndex}
                estilos={styles}
              />
              <DropdownCampo
                label="Ano"
                valor={String(ano)}
                aberto={dropdownAberto === 'ano'}
                onToggle={() =>
                  setDropdownAberto((atual) => (atual === 'ano' ? null : 'ano'))
                }
                opcoes={opcoesAno}
                onSelecionar={(novoAno) => {
                  setDataSelecionadaISO(montarISO(novoAno, mesIndex, dia, DATA_MIN, DATA_MAX));
                  fecharDropdowns();
                }}
                valorAtivo={ano}
                estilos={styles}
              />
            </View>
            <View style={styles.dateCalendarCard}>
              <View style={styles.dateCalendarMesHeader}>
                <TouchableOpacity
                  style={styles.dateCalendarSetaBtn}
                  onPress={() => {
                    setDataSelecionadaISO(
                      mudarMesCalendario(ano, mesIndex, dia, -1, DATA_MIN, DATA_MAX)
                    );
                    fecharDropdowns();
                  }}
                  disabled={!podeIrMesAnterior(ano, mesIndex, DATA_MIN)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="chevron-back"
                    size={26}
                    color={
                      podeIrMesAnterior(ano, mesIndex, DATA_MIN) ? '#001830' : '#C5C5C5'
                    }
                  />
                </TouchableOpacity>
                <Text style={styles.dateCalendarTitulo}>{MESES[mesIndex]}</Text>
                <TouchableOpacity
                  style={styles.dateCalendarSetaBtn}
                  onPress={() => {
                    setDataSelecionadaISO(
                      mudarMesCalendario(ano, mesIndex, dia, 1, DATA_MIN, DATA_MAX)
                    );
                    fecharDropdowns();
                  }}
                  disabled={!podeIrMesProximo(ano, mesIndex, DATA_MAX)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={26}
                    color={
                      podeIrMesProximo(ano, mesIndex, DATA_MAX) ? '#001830' : '#C5C5C5'
                    }
                  />
                </TouchableOpacity>
              </View>
              <Calendar
                key={mesCalendarioISO}
                current={mesCalendarioISO}
                minDate={DATA_MIN}
                maxDate={DATA_MAX}
                onDayPress={(day) => {
                  setDataSelecionadaISO(day.dateString);
                  fecharDropdowns();
                }}
                onMonthChange={(month) => {
                  setDataSelecionadaISO(
                    montarISO(month.year, month.month - 1, dia, DATA_MIN, DATA_MAX)
                  );
                }}
                markedDates={datasMarcadas}
                dayComponent={DiaCalendario}
                theme={temaCalendario}
                enableSwipeMonths
                hideArrows
                hideHeader
                renderHeader={() => null}
                hideExtraDays={false}
                firstDay={0}
                style={styles.dateCalendar}
              />
            </View>
            <Text style={styles.dateLegendaTexto}>
              O ponto na cor dourada nos dias indica escalas.
            </Text>
            <View style={styles.dateAcoes}>
              <TouchableOpacity
                style={styles.dateBtnOutline}
                onPress={() => setCalendarOpen(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.dateBtnOutlineText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dateBtnPrimary}
                onPress={confirmarData}
                activeOpacity={0.85}
              >
                <Text style={styles.dateBtnPrimaryText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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

  dateOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  dateBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 24, 48, 0.45)',
  },
  dateSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '92%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 16,
  },
  dateSheetContent: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  dateHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    marginBottom: 16,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  dateTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#001830',
  },
  datePreviewBox: {
    backgroundColor: '#F4F7FA',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  datePreviewLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  datePreviewValor: {
    fontSize: 20,
    fontWeight: '700',
    color: '#001830',
  },
  datePreviewPeriodo: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 6,
  },
  dateDropdownRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    zIndex: 10,
  },
  dropdownWrap: {
    flex: 1,
    position: 'relative',
  },
  dropdownLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
  },
  dropdownField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 48,
  },
  dropdownFieldAberto: {
    borderColor: '#001830',
  },
  dropdownValor: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#001830',
    marginRight: 8,
  },
  dropdownLista: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 4,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E9EF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 20,
  },
  dropdownScroll: {
    maxHeight: 160,
  },
  dropdownScrollContent: {
    paddingRight: 6,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  dropdownItemAtivo: {
    backgroundColor: '#F4F7FA',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#001830',
    fontWeight: '500',
  },
  dropdownItemTextAtivo: {
    fontWeight: '700',
    color: '#001830',
  },
  dateCalendarCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E9EF',
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  dateCalendarMesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  dateCalendarSetaBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  dateCalendarTitulo: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: '#001830',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  dateCalendar: {
    marginBottom: 0,
  },
  diaCalendarioCelula: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  diaCalendarioFundo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diaCalendarioFundoSelecionado: {
    backgroundColor: '#001830',
  },
  diaCalendarioNumero: {
    fontSize: 15,
    fontWeight: '500',
    color: '#001830',
  },
  diaCalendarioNumeroSelecionado: {
    color: '#ffffff',
    fontWeight: '600',
  },
  diaCalendarioNumeroInativo: {
    color: '#D1D5DB',
  },
  diaCalendarioPonto: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COR_PONTO_ESCALA,
    marginTop: 2,
  },
  dateLegendaTexto: {
    fontSize: 13,
    color: '#4c5d7a',
    lineHeight: 18,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  dateAcoes: {
    flexDirection: 'row',
    gap: 12,
  },
  dateBtnOutline: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#001830',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  dateBtnOutlineText: {
    color: '#001830',
    fontSize: 15,
    fontWeight: '700',
  },
  dateBtnPrimary: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#001830',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBtnPrimaryText: {
    color: '#fff',
    fontSize: 15,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E8EDF3',
    overflow: 'hidden',
    shadowColor: '#001830',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  cardMainRow: {
    flexDirection: 'row',
    padding: 14,
  },

  dataBox: {
    width: 72,
    minHeight: 96,
    backgroundColor: '#001830',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    paddingVertical: 10,
  },

  dataDiaSemana: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  dataNumero: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 2,
    lineHeight: 36,
  },

  dataMes: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  cardInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  horario: {
    fontSize: 16,
    fontWeight: '700',
    color: '#001830',
    marginBottom: 8,
  },

  info: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 3,
    lineHeight: 20,
  },

  confirmPresenceButton: {
    marginTop: 10,
    backgroundColor: '#d6a100',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },

  confirmPresenceText: {
    fontSize: 13,
    color: '#001830',
    fontWeight: '700',
  },

  statusBadge: {
    alignSelf: 'flex-end',
    marginTop: 10,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },

  statusBadgeConfirmado: {
    backgroundColor: '#E8F5E9',
  },

  statusBadgeIndisponivel: {
    backgroundColor: '#FCE4EC',
  },

  statusBadgeText: {
    fontSize: 13,
    fontWeight: '700',
  },

  statusBadgeTextConfirmado: {
    color: '#2E7D32',
  },

  statusBadgeTextIndisponivel: {
    color: '#C62828',
  },

  presencaFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 10,
  },

  presencaFooterConfirmado: {
    backgroundColor: '#E8F5E9',
  },

  presencaFooterIndisponivel: {
    backgroundColor: '#FCE4EC',
  },

  presencaFooterIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },

  presencaFooterIconConfirmado: {
    backgroundColor: '#43A047',
  },

  presencaFooterIconIndisponivel: {
    backgroundColor: '#E53935',
  },

  presencaFooterIconText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 14,
  },

  presencaFooterText: {
    flex: 1,
    fontSize: 13,
    color: '#4A5568',
    lineHeight: 18,
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