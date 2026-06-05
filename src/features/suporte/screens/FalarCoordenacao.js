import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import SuporteHeader from '@/shared/components/layout/SuporteHeader';

const AZUL = '#001830';
const MAX_CARACTERES = 500;

const ASSUNTOS = [
  { label: 'Selecione um assunto', value: '' },
  { label: 'Dúvida sobre escala', value: 'escala' },
  { label: 'Troca de missa', value: 'troca' },
  { label: 'Justificativa de ausência', value: 'ausencia' },
  { label: 'Problema no aplicativo', value: 'app' },
  { label: 'Outro assunto', value: 'outro' },
];

export default function FalarCoordenacao({ navigation }) {
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');

  const enviar = () => {
    if (!assunto) {
      Alert.alert('Atenção', 'Selecione um assunto para continuar.');
      return;
    }

    if (!mensagem.trim()) {
      Alert.alert('Atenção', 'Escreva sua mensagem antes de enviar.');
      return;
    }

    Alert.alert(
      'Mensagem enviada',
      'Sua mensagem foi registrada. A coordenação responderá em breve.',
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  };

  const selecionarArquivo = () => {
    Alert.alert(
      'Anexar arquivo',
      'Em breve você poderá anexar arquivos à mensagem.',
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <SuporteHeader title="Falar com a Coordenação" navigation={navigation} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.hero}>
          <Ionicons
            name="mail-outline"
            size={36}
            color={AZUL}
            style={styles.heroIcon}
          />
          <Text style={styles.heroTexto}>
            Envie uma mensagem para a coordenação da sua equipe.
          </Text>
        </View>

        <Text style={styles.label}>Assunto</Text>
        <View style={styles.pickerWrap}>
          <Picker
            selectedValue={assunto}
            onValueChange={setAssunto}
            style={styles.picker}
            dropdownIconColor={AZUL}
            mode="dropdown"
          >
            {ASSUNTOS.map((item) => (
              <Picker.Item
                key={item.value || 'placeholder'}
                label={item.label}
                value={item.value}
                color={item.value ? AZUL : '#9CA3AF'}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Mensagem</Text>
        <View style={styles.mensagemWrap}>
          <TextInput
            style={styles.mensagemInput}
            placeholder="Escreva sua mensagem..."
            placeholderTextColor="#9CA3AF"
            value={mensagem}
            onChangeText={(texto) =>
              setMensagem(texto.slice(0, MAX_CARACTERES))
            }
            multiline
            textAlignVertical="top"
          />
          <Text style={styles.contador}>
            {mensagem.length}/{MAX_CARACTERES}
          </Text>
        </View>

        <Text style={styles.label}>Anexar arquivo (opcional)</Text>
        <TouchableOpacity
          style={styles.anexoBtn}
          activeOpacity={0.85}
          onPress={selecionarArquivo}
        >
          <Ionicons name="attach-outline" size={22} color={AZUL} />
          <Text style={styles.anexoTexto}>Selecionar arquivo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.enviarBtn}
          activeOpacity={0.85}
          onPress={enviar}
        >
          <Text style={styles.enviarTexto}>Enviar mensagem</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },

  hero: {
    alignItems: 'center',
    marginBottom: 28,
  },

  heroIcon: {
    marginBottom: 14,
  },

  heroTexto: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: AZUL,
    marginBottom: 8,
  },

  pickerWrap: {
    borderWidth: 1,
    borderColor: '#E8EDF3',
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#F9FAFB',
    minHeight: 52,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },

  picker: {
    color: AZUL,
    width: '100%',
    ...Platform.select({
      ios: { height: 50 },
      android: { height: 52 },
      web: {
        height: 48,
        borderWidth: 0,
        outlineStyle: 'none',
        backgroundColor: 'transparent',
      },
      default: { height: 50 },
    }),
  },

  mensagemWrap: {
    borderWidth: 1,
    borderColor: '#E8EDF3',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    marginBottom: 20,
    minHeight: 140,
    padding: 12,
  },

  mensagemInput: {
    fontSize: 15,
    color: AZUL,
    minHeight: 100,
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        outlineWidth: 0,
      },
    }),
  },

  contador: {
    textAlign: 'right',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },

  anexoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#E8EDF3',
    borderRadius: 12,
    borderStyle: 'dashed',
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 28,
  },

  anexoTexto: {
    fontSize: 15,
    color: '#6B7280',
  },

  enviarBtn: {
    backgroundColor: AZUL,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },

  enviarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
