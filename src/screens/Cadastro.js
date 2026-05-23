import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const MENSAGEM_SUCESSO = 'Cadastro realizado com sucesso!';
const ANO_MIN = 1926;
const ANO_MAX = 2126;
const DATA_MIN = `${ANO_MIN}-01-01`;
const DATA_MAX = `${ANO_MAX}-12-31`;

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

const ANOS = Array.from({ length: ANO_MAX - ANO_MIN + 1 }, (_, i) => ANO_MAX - i);

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
    week: {
      marginTop: 8,
      marginBottom: 4,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  },
};

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

  const ano =
    Number(partes[0]) || hoje.getFullYear();

  const mes =
    Number(partes[1]) || hoje.getMonth() + 1;

  const dia =
    Number(partes[2]) || hoje.getDate();

  const mesIndex = Math.max(
    0,
    Math.min(11, mes - 1)
  );

  return { ano, mesIndex, dia };
}

function formatarPreview(iso) {
  const { ano, mesIndex, dia } = partesDaISO(iso);
  const nomeMes = MESES[mesIndex];
  return `${String(dia).padStart(2, '0')} de ${nomeMes} de ${ano}`;
}

function montarISO(ano, mesIndex, dia) {
  const anoNum = Number(ano);
  const mesIdx = Number(mesIndex);
  const diaNum = Number(dia);
  const maxDia = new Date(anoNum, mesIdx + 1, 0).getDate();
  const diaFinal = Math.min(diaNum, maxDia);
  const mes = String(mesIdx + 1).padStart(2, '0');
  const diaStr = String(diaFinal).padStart(2, '0');
  const iso = `${anoNum}-${mes}-${diaStr}`;
  if (iso > DATA_MAX) return DATA_MAX;
  if (iso < DATA_MIN) return DATA_MIN;
  return iso;
}

export default function Cadastro({ navigation }) {
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState({
    nome: '',
    nascimento: '',
    telefone: '',
    responsavel: '',
    telResponsavel: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    autorizacao: false,
  });

  const [erro, setErro] = useState('');
  const [erroTelefone, setErroTelefone] = useState('');
  const [erroTelResponsavel, setErroTelResponsavel] = useState('');
  const [camposErro, setCamposErro] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showYearList, setShowYearList] = useState(false);
  const [dataSelecionadaISO, setDataSelecionadaISO] = useState('');

  useEffect(() => {
    if (!showDatePicker) return;
    setDataSelecionadaISO(brParaISO(form.nascimento) || dataHojeISO());
  }, [showDatePicker]);

  function atualizarCampo(name, value) {
    let novoValor = value;

    if (name === 'telefone' || name === 'telResponsavel') {
      novoValor = value.replace(/\D/g, '').slice(0, 11);
    }

    if (name === 'nascimento') {
      novoValor = mascararData(value);
    }

    setForm((prev) => ({
      ...prev,
      [name]: novoValor,
    }));

    if (camposErro.includes(name)) {
      setCamposErro((prev) => prev.filter((campo) => campo !== name));
    }

    if (name === 'telefone') setErroTelefone('');
    if (name === 'telResponsavel') setErroTelResponsavel('');

    if (statusMessage) {
      setStatusMessage('');
      setStatusType('');
    }
  }

  function handleSubmit() {
    let erros = [];

    setErro('');
    setErroTelefone('');
    setErroTelResponsavel('');
    setStatusMessage('');
    setStatusType('');

    Object.keys(form).forEach((campo) => {
      if (campo !== 'autorizacao' && String(form[campo]).trim() === '') {
        erros.push(campo);
      }
    });

    setCamposErro(erros);

    if (erros.length > 0) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    if (form.telefone.length < 10) {
      setCamposErro((prev) => [...prev, 'telefone']);
      setErroTelefone('Digite um telefone válido.');
      return;
    }

    if (form.telResponsavel.length < 10) {
      setCamposErro((prev) => [...prev, 'telResponsavel']);
      setErroTelResponsavel('Digite um telefone válido.');
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      setCamposErro(['senha', 'confirmarSenha']);
      setErro('As senhas não coincidem.');
      return;
    }

    if (!form.autorizacao) {
      setErro('Autorize o uso dos dados.');
      return;
    }

    setErro('');
    setCamposErro([]);
    setStatusType('success');
    setStatusMessage(MENSAGEM_SUCESSO);
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }, 2000);
  }

  const inputStyle = (campo) => [
    styles.input,
    camposErro.includes(campo) ? styles.inputError : null,
  ];

  function abrirSeletorData() {
    setDataSelecionadaISO(brParaISO(form.nascimento) || dataHojeISO());
    setShowYearList(false);
    setShowDatePicker(true);
  }

  function confirmarData() {
    atualizarCampo('nascimento', isoParaBR(dataSelecionadaISO));
    setShowDatePicker(false);
  }

  const { ano: anoSelecionado, mesIndex: mesSelecionado, dia: diaSelecionado } =
    partesDaISO(dataSelecionadaISO);

  function aoMudarAno(ano) {
    setDataSelecionadaISO(
      montarISO(Number(ano), mesSelecionado, diaSelecionado)
    );
    setShowYearList(false);
  }

  function aoMudarMesRelativo(delta) {
    let novoMes = mesSelecionado + delta;
    let novoAno = anoSelecionado;

    if (novoMes < 0) {
      novoMes = 11;
      novoAno -= 1;
    } else if (novoMes > 11) {
      novoMes = 0;
      novoAno += 1;
    }

    setDataSelecionadaISO(montarISO(novoAno, novoMes, diaSelecionado));
  }

  const mesCalendarioISO = dataSelecionadaISO || dataHojeISO();
  const mesAnoMin = DATA_MIN.slice(0, 7);
  const mesAnoMax = dataHojeISO().slice(0, 7);
  const mesAnoAtual = mesCalendarioISO.slice(0, 7);
  const podeMesAnterior = mesAnoAtual > mesAnoMin;
  const podeMesProximo = mesAnoAtual < mesAnoMax;

  const datasMarcadas = useMemo(
    () => montarMarkedDates(dataSelecionadaISO),
    [dataSelecionadaISO]
  );

  const anosRecentes = useMemo(
    () => ANOS.filter((ano) => ano <= new Date().getFullYear()),
    []
  );

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            style={styles.backLink}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.backLinkText}>{'<'} Voltar para a tela de login</Text>
          </TouchableOpacity>

          <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>

            <Text style={styles.label}>Nome completo:</Text>
            <TextInput
              style={inputStyle('nome')}
              placeholder="Digite seu nome completo"
              value={form.nome}
              onChangeText={(text) => atualizarCampo('nome', text)}
            />

            <Text style={styles.label}>Data de nascimento:</Text>
            <View
              style={[
                styles.dateInputWrapper,
                camposErro.includes('nascimento') ? styles.dateInputWrapperError : null,
              ]}
            >
              <TextInput
                style={[styles.input, styles.dateInput]}
                placeholder="DD/MM/AAAA"
                value={form.nascimento}
                onChangeText={(text) => atualizarCampo('nascimento', text)}
                keyboardType="numeric"
                maxLength={10}
              />
              <TouchableOpacity
                style={styles.calendarIconButton}
                onPress={abrirSeletorData}
                accessibilityLabel="Abrir calendário"
                activeOpacity={0.7}
              >
                <Ionicons name="calendar" size={20} color="#001830" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Telefone:</Text>
            <TextInput
              style={inputStyle('telefone')}
              placeholder="(99) 99999-9999"
              value={form.telefone}
              onChangeText={(text) => atualizarCampo('telefone', text)}
              keyboardType="phone-pad"
              maxLength={11}
            />
            {erroTelefone ? <Text style={styles.errorText}>{erroTelefone}</Text> : null}

            <Text style={styles.label}>Nome do responsável:</Text>
            <TextInput
              style={inputStyle('responsavel')}
              placeholder="Digite o nome do responsável"
              value={form.responsavel}
              onChangeText={(text) => atualizarCampo('responsavel', text)}
            />

            <Text style={styles.label}>Telefone do responsável:</Text>
            <TextInput
              style={inputStyle('telResponsavel')}
              placeholder="(99) 99999-9999"
              value={form.telResponsavel}
              onChangeText={(text) => atualizarCampo('telResponsavel', text)}
              keyboardType="phone-pad"
              maxLength={11}
            />
            {erroTelResponsavel ? (
              <Text style={styles.errorText}>{erroTelResponsavel}</Text>
            ) : null}

            <Text style={styles.label}>E-mail:</Text>
            <TextInput
              style={inputStyle('email')}
              placeholder="Digite seu e-mail"
              value={form.email}
              onChangeText={(text) => atualizarCampo('email', text)}
              keyboardType="email-address"
            />

            <Text style={styles.label}>Senha:</Text>
            <TextInput
              style={inputStyle('senha')}
              placeholder="Digite sua senha"
              value={form.senha}
              onChangeText={(text) => atualizarCampo('senha', text)}
              secureTextEntry
            />

            <Text style={styles.label}>Confirmar senha:</Text>
            <TextInput
              style={inputStyle('confirmarSenha')}
              placeholder="Confirme sua senha"
              value={form.confirmarSenha}
              onChangeText={(text) => atualizarCampo('confirmarSenha', text)}
              secureTextEntry
            />

            {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() =>
                atualizarCampo('autorizacao', !form.autorizacao)
              }
            >
              <View style={[styles.checkbox, form.autorizacao && styles.checkboxChecked]}>
                {form.autorizacao ? <Text style={styles.checkboxMark}>✓</Text> : null}
              </View>
              <Text style={styles.checkboxLabel}>
                Autorizo o uso dos dados para fins pastorais
              </Text>
            </TouchableOpacity>

            {statusType === 'success' ? (
              <View style={[styles.statusBox, styles.successBox]}>
                <Text style={[styles.statusIcon, styles.successIcon]}>✓</Text>
                <Text style={[styles.statusText, styles.successText]}>{statusMessage}</Text>
              </View>
            ) : null}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        transparent
        animationType="slide"
        visible={showDatePicker}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setShowDatePicker(false)}
          />
          <ScrollView
            style={[styles.dateSheet, { paddingBottom: insets.bottom + 20 }]}
            contentContainerStyle={styles.dateSheetContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.sheetHandle} />

            <View style={styles.sheetHeader}>
              <Ionicons name="calendar" size={22} color="#001830" />
              <Text style={styles.sheetTitle}>Data de nascimento</Text>
            </View>

            <View style={styles.previewBox}>
              <Text style={styles.previewLabel}>Data selecionada</Text>
              <Text style={styles.previewValue}>{formatarPreview(dataSelecionadaISO)}</Text>
            </View>

            <View style={styles.calendarCard}>
              <View style={styles.calendarNav}>
                <TouchableOpacity
                  style={[styles.calendarNavBtn, !podeMesAnterior && styles.calendarNavBtnDisabled]}
                  onPress={() => aoMudarMesRelativo(-1)}
                  disabled={!podeMesAnterior}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="chevron-back"
                    size={22}
                    color={podeMesAnterior ? '#001830' : '#C5CED8'}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.calendarNavCenter}
                  onPress={() => setShowYearList((v) => !v)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.calendarNavMonth}>{MESES[mesSelecionado]}</Text>
                  <View style={styles.calendarNavYearRow}>
                    <Text style={styles.calendarNavYear}>{anoSelecionado}</Text>
                    <Ionicons
                      name={showYearList ? 'chevron-up' : 'chevron-down'}
                      size={16}
                      color="#6B7280"
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.calendarNavBtn, !podeMesProximo && styles.calendarNavBtnDisabled]}
                  onPress={() => aoMudarMesRelativo(1)}
                  disabled={!podeMesProximo}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={podeMesProximo ? '#001830' : '#C5CED8'}
                  />
                </TouchableOpacity>
              </View>

              {showYearList ? (
                <View style={styles.yearListWrap}>
                  <Text style={styles.yearListTitle}>Selecione o ano</Text>
                  <ScrollView
                    style={styles.yearListScroll}
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                  >
                    {anosRecentes.map((ano) => (
                      <TouchableOpacity
                        key={ano}
                        style={[
                          styles.yearItem,
                          ano === anoSelecionado && styles.yearItemActive,
                        ]}
                        onPress={() => aoMudarAno(ano)}
                        activeOpacity={0.75}
                      >
                        <Text
                          style={[
                            styles.yearItemText,
                            ano === anoSelecionado && styles.yearItemTextActive,
                          ]}
                        >
                          {ano}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              ) : (
                <Calendar
                  key={mesCalendarioISO}
                  current={mesCalendarioISO}
                  minDate={DATA_MIN}
                  maxDate={dataHojeISO()}
                  onDayPress={(day) => setDataSelecionadaISO(day.dateString)}
                  onMonthChange={(month) => {
                    setDataSelecionadaISO(
                      montarISO(month.year, month.month - 1, diaSelecionado)
                    );
                  }}
                  markedDates={datasMarcadas}
                  theme={temaCalendario}
                  enableSwipeMonths
                  hideArrows
                  hideHeader
                  hideExtraDays={false}
                  firstDay={0}
                  style={styles.calendar}
                />
              )}
            </View>

            <Text style={styles.sheetHint}>
              Toque no dia · deslize para mudar o mês · toque no ano para escolher
            </Text>

            <View style={styles.sheetActions}>
              <TouchableOpacity
                style={styles.sheetBtnOutline}
                onPress={() => setShowDatePicker(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.sheetBtnOutlineText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sheetBtnPrimary}
                onPress={confirmarData}
                activeOpacity={0.85}
              >
                <Text style={styles.sheetBtnPrimaryText}>Confirmar data</Text>
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
  scroll: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  backLink: {
    marginBottom: 16,
  },
  backLinkText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: 'bold',
  },
  container: {
    width: width < 400 ? '100%' : 360,
    alignSelf: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#001830',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    height: 48,
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dateInputWrapper: {
    position: 'relative',
    marginBottom: 12,
    height: 48,
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
  },
  dateInputWrapperError: {
    borderColor: '#d32f2f',
    backgroundColor: '#FCECEC',
  },
  dateInput: {
    height: 48,
    marginBottom: 0,
    paddingLeft: 14,
    paddingRight: 44,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  calendarIconButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#E8EEF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
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
  sheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#001830',
  },
  previewBox: {
    backgroundColor: '#F4F7FA',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  previewLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  previewValue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#001830',
  },
  calendarCard: {
    backgroundColor: '#FAFBFC',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E9EF',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  calendarNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingBottom: 12,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EEF4',
  },
  calendarNavBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E9EF',
  },
  calendarNavBtnDisabled: {
    backgroundColor: '#F4F6F8',
    borderColor: '#EEF1F5',
  },
  calendarNavCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  calendarNavMonth: {
    fontSize: 17,
    fontWeight: '700',
    color: '#001830',
    textTransform: 'capitalize',
  },
  calendarNavYearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  calendarNavYear: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  yearListWrap: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  yearListTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  yearListScroll: {
    maxHeight: 220,
  },
  yearItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E8EEF4',
    alignItems: 'center',
  },
  yearItemActive: {
    backgroundColor: '#001830',
    borderColor: '#001830',
  },
  yearItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#001830',
  },
  yearItemTextActive: {
    color: '#fff',
  },
  calendar: {
    marginBottom: 0,
  },
  sheetHint: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  sheetActions: {
    flexDirection: 'row',
    gap: 12,
  },
  sheetBtnOutline: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#001830',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetBtnOutlineText: {
    color: '#001830',
    fontSize: 15,
    fontWeight: '700',
  },
  sheetBtnPrimary: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#001830',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetBtnPrimaryText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  inputError: {
    borderColor: '#d32f2f',
    backgroundColor: '#FCECEC',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 13,
    marginTop: -8,
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    gap: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#001830',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#001830',
  },
  checkboxMark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 10,
    borderRadius: 12,
  },
  successBox: {
    backgroundColor: '#E8F6EA',
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  statusIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  statusText: {
    fontSize: 13,
  },
  successIcon: {
    color: '#4CAF50',
  },
  successText: {
    color: '#2E7D32',
    fontSize: 13,
  },
  button: {
    height: 48,
    backgroundColor: '#001830',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
