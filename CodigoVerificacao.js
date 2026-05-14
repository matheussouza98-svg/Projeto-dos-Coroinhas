import React, { useRef, useState, useEffect } from "react";
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
  Alert,
} from "react-native";

const { width } = Dimensions.get("window");

export default function CodigoVerificacao({ navigation }) {
  const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
  const [erro, setErro] = useState(false);
  const [tempo, setTempo] = useState(30);
  const inputs = useRef([]);

  // TIMER
  useEffect(() => {
    if (tempo === 0) return;

    const intervalo = setInterval(() => {
      setTempo((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tempo]);

  function handleChange(text, index) {
    if (!/^[0-9]?$/.test(text)) return;

    const novoCodigo = [...codigo];
    novoCodigo[index] = text;
    setCodigo(novoCodigo);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  }

  function handleBackspace(index) {
    if (index > 0 && !codigo[index]) {
      inputs.current[index - 1]?.focus();
    }
  }

  function confirmarCodigo() {
    const codigoFinal = codigo.join("");

    if (codigoFinal.length < 6) {
      setErro(true);
      return;
    }

    // Código temporário para teste
    if (codigoFinal !== "123456") {
      setErro(true);
      Alert.alert("Erro", "Código inválido");
      return;
    }

    setErro(false);
    navigation.navigate("NovaSenha");
  }

  function reenviarCodigo() {
    setTempo(30);
    setCodigo(["", "", "", "", "", ""]);
    setErro(false);
    Alert.alert("Sucesso", "Novo código enviado!");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.page}>
            <TouchableOpacity
              style={styles.backLink}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backLinkText}>{'<'} Voltar</Text>
            </TouchableOpacity>

            <View style={styles.container}>
              <Text style={styles.title}>Código de Verificação</Text>

              <Text style={styles.subtitle}>
                Digite o código enviado para seu e-mail
              </Text>

            <View style={styles.codeContainer}>
              {codigo.map((value, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputs.current[index] = ref)}
                  style={[
                    styles.codeInput,
                    erro && styles.inputErro,
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={value}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace") {
                      handleBackspace(index);
                    }
                  }}
                />
              ))}
            </View>

            {erro && (
              <Text style={styles.erroTexto}>
                Código incorreto. Tente novamente.
              </Text>
            )}

            <TouchableOpacity style={styles.button} onPress={confirmarCodigo}>
              <Text style={styles.buttonText}>Confirmar código</Text>
            </TouchableOpacity>

            <View style={styles.reenviarContainer}>
              {tempo > 0 ? (
                <Text style={styles.timer}>
                  Reenviar código em {tempo}s
                </Text>
              ) : (
                <TouchableOpacity onPress={reenviarCodigo}>
                  <Text style={styles.reenviar}>Reenviar código</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  page: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 70,
  },

  container: {
    width: width < 400 ? "90%" : 360,
  },

  backLink: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 30,
  },

  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  codeInput: {
    width: 45,
    height: 55,
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  inputErro: {
    borderColor: "#001830",
  },

  erroTexto: {
    color: "#C62828",
    marginBottom: 10,
    fontSize: 13,
  },

  button: {
    height: 48,
    backgroundColor: "#001830",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  backLinkText: {
    color: "#1976D2",
    fontSize: 14,
    fontWeight: "bold",
  },

  reenviarContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  timer: {
    color: "#777",
    fontSize: 13,
  },

  reenviar: {
    color: "#1976D2",
    fontWeight: "bold",
    fontSize: 14,
  },
});