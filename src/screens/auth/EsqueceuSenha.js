import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStatusBarPadding } from "../../utils/safeArea";

const { width } = Dimensions.get("window");

export default function EsqueceuSenha({ navigation }) {
  const topPadding = useStatusBarPadding(12);
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");

  function validarEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function enviarCodigo() {
    if (!email) {
      setErro("Digite seu e-mail");
      return;
    }

    if (!validarEmail(email)) {
      setErro("Digite um e-mail válido");
      return;
    }

    setErro("");
    navigation.navigate("CodigoVerificacao");
  }

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: topPadding }]}>
          <View style={styles.page}>
            <TouchableOpacity
              style={[styles.backLink, { top: topPadding }]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backLinkText}>{'<'} Voltar</Text>
            </TouchableOpacity>

            <View style={styles.container}>
              <Text style={styles.title}>Esqueceu sua senha?</Text>

            <Text style={styles.subtitle}>
              Informe seu e-mail e enviaremos um código.
            </Text>

            <TextInput
              style={[styles.input, erro ? styles.inputErro : null]}
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErro("");
              }}
              keyboardType="email-address"
            />

            {erro ? <Text style={styles.erroTexto}>{erro}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={enviarCodigo}>
              <Text style={styles.buttonText}>Enviar código</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

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
    marginBottom: 25,
  },

  input: {
    height: 50,
    backgroundColor: "#F2F2F2",
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  inputErro: {
    borderColor: "#C62828",
  },

  erroTexto: {
    color: "#C62828",
    fontSize: 13,
    marginTop: 6,
    marginBottom: 10,
  },

  button: {
    height: 50,
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
});