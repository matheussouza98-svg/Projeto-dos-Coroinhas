import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ANO_MIN = 1926;
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

const temaCalendario = {
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  textSectionTitleColor: '#6B7280',
  selectedDayBackgroundColor: '#001830',
  selectedDayTextColor: '#ffffff',
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

function mascararData(texto) {
  const digitos = texto.replace(/\D/g, '').slice(0, 8);
  if (digitos.length <= 2) return digitos;
  if (digitos.length <= 4) return `${digitos.slice(0, 2)}/${digitos.slice(2)}`;
  return `${digitos.slice(0, 2)}/${digitos.slice(2, 4)}/${digitos.slice(4)}`;
}

function brParaISO(texto) {
  const partes = texto.split('/');
  if (partes.length !== 3) return null;
  const [dia, mes, ano] = partes;
  if (ano.length !== 4) return null;
  const iso = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  if (iso > DATA_MAX || iso < DATA_MIN) return null;
  return iso;
}

function isoParaBR(iso) {
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
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

function montarMarkedDates(isoSelecionada) {
  const iso = isoSelecionada || dataHojeISO();
  return {
    [iso]: {
      selected: true,
      selectedColor: '#001830',
      selectedTextColor: '#ffffff',
    },
  };
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

export default function DataNascimentoField({
  value,
  onChange,
  hasError = false,
  wrapperStyle,
  inputStyle,
  iconButtonStyle,
  iconColor = '#001830',
  placeholderTextColor = '#9CA3AF',
}) {
  const insets = useSafeAreaInsets();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dataSelecionadaISO, setDataSelecionadaISO] = useState('');
  const [dropdownAberto, setDropdownAberto] = useState(null);

  const dataMaxCalendario = dataHojeISO();
  const anoMinCalendario = Number(DATA_MIN.slice(0, 4));
  const anoMaxCalendario = Number(dataMaxCalendario.slice(0, 4));

  useEffect(() => {
    if (!showDatePicker) {
      setDropdownAberto(null);
      return;
    }
    let iso = brParaISO(value) || dataHojeISO();
    if (iso > dataMaxCalendario) iso = dataMaxCalendario;
    if (iso < DATA_MIN) iso = DATA_MIN;
    setDataSelecionadaISO(iso);
  }, [showDatePicker, value, dataMaxCalendario]);

  const { ano, mesIndex, dia } = partesDaISO(dataSelecionadaISO);
  const mesCalendarioISO = dataSelecionadaISO || dataHojeISO();
  const datasMarcadas = useMemo(
    () => montarMarkedDates(dataSelecionadaISO),
    [dataSelecionadaISO]
  );
  const anos = useMemo(
    () => anosNoIntervalo(DATA_MIN, dataMaxCalendario),
    [dataMaxCalendario]
  );
  const opcoesMes = MESES.map((nome, index) => ({ valor: index, rotulo: nome }));
  const opcoesAno = anos.map((a) => ({ valor: a, rotulo: String(a) }));

  function fecharDropdowns() {
    setDropdownAberto(null);
  }

  function confirmarData() {
    onChange(isoParaBR(dataSelecionadaISO));
    setShowDatePicker(false);
  }

  return (
    <>
      <View
        style={[
          styles.dateInputWrapper,
          hasError ? styles.dateInputWrapperError : null,
          wrapperStyle,
        ]}
      >
        <TextInput
          style={[styles.dateInput, inputStyle]}
          placeholder="DD/MM/AAAA"
          value={value}
          onChangeText={(text) => onChange(mascararData(text))}
          keyboardType="numeric"
          maxLength={10}
          placeholderTextColor={placeholderTextColor}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity
          style={[styles.calendarIconButton, iconButtonStyle]}
          onPress={() => setShowDatePicker(true)}
          accessibilityLabel="Abrir calendário"
          activeOpacity={0.7}
        >
          <Ionicons name="calendar-outline" size={22} color={iconColor} />
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        animationType="slide"
        visible={showDatePicker}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.dateOverlay}>
          <Pressable
            style={styles.dateBackdrop}
            onPress={() => setShowDatePicker(false)}
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
                Período: {anoMinCalendario} a {anoMaxCalendario}
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
                  setDataSelecionadaISO(
                    montarISO(ano, novoMes, dia, DATA_MIN, dataMaxCalendario)
                  );
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
                  setDataSelecionadaISO(
                    montarISO(novoAno, mesIndex, dia, DATA_MIN, dataMaxCalendario)
                  );
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
                      mudarMesCalendario(ano, mesIndex, dia, -1, DATA_MIN, dataMaxCalendario)
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
                      mudarMesCalendario(ano, mesIndex, dia, 1, DATA_MIN, dataMaxCalendario)
                    );
                    fecharDropdowns();
                  }}
                  disabled={!podeIrMesProximo(ano, mesIndex, dataMaxCalendario)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={26}
                    color={
                      podeIrMesProximo(ano, mesIndex, dataMaxCalendario)
                        ? '#001830'
                        : '#C5C5C5'
                    }
                  />
                </TouchableOpacity>
              </View>
              <Calendar
                key={mesCalendarioISO}
                current={mesCalendarioISO}
                minDate={DATA_MIN}
                maxDate={dataMaxCalendario}
                onDayPress={(day) => {
                  setDataSelecionadaISO(day.dateString);
                  fecharDropdowns();
                }}
                onMonthChange={(month) => {
                  setDataSelecionadaISO(
                    montarISO(month.year, month.month - 1, dia, DATA_MIN, dataMaxCalendario)
                  );
                }}
                markedDates={datasMarcadas}
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
            <View style={styles.dateAcoes}>
              <TouchableOpacity
                style={styles.dateBtnOutline}
                onPress={() => setShowDatePicker(false)}
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
    </>
  );
}

const styles = StyleSheet.create({
  dateInputWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  dateInputWrapperError: {
    borderColor: '#d32f2f',
    backgroundColor: '#FCECEC',
  },
  dateInput: {
    height: 48,
    marginBottom: 0,
    paddingHorizontal: 14,
    paddingRight: 44,
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'transparent',
    fontSize: 15,
    color: '#374151',
  },
  calendarIconButton: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
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
});
