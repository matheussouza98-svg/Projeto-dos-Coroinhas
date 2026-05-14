import React, { useState } from "react";
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
} from "react-native";

const { width } = Dimensions.get("window");

export default function NovaSenha({ navigation }) {
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erro, setErro] = useState("");

  function redefinir() {
    if (!senha && !confirmar) {
      setErro("Preencha todos os campos");
      return;
    }

    if (!senha) {
      setErro("Digite a nova senha");
      return;
    }

    if (!confirmar) {
      setErro("Confirme a nova senha");
      return;
    }

    if (senha !== confirmar) {
      setErro("As senhas não coincidem");
      return;
    }

    setErro("");
    alert("Senha redefinida com sucesso!");
    navigation.navigate("Login");
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
              <Text style={styles.title}>Nova Senha</Text>

            <TextInput
              style={[styles.input, erro ? styles.inputErro : null]}
              placeholder="Digite a nova senha"
              secureTextEntry
              value={senha}
              onChangeText={(text) => {
                setSenha(text);
                setErro("");
              }}
            />

            <TextInput
              style={[styles.input, erro ? styles.inputErro : null]}
              placeholder="Confirme a nova senha"
              secureTextEntry
              value={confirmar}
              onChangeText={(text) => {
                setConfirmar(text);
                setErro("");
              }}
            />

            {erro ? <Text style={styles.erroTexto}>{erro}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={redefinir}>
              <Text style={styles.buttonText}>Redefinir senha</Text>
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
    marginBottom: 20,
  },

  input: {
    height: 48,
    backgroundColor: "#F2F2F2",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  inputErro: {
    borderColor: "#C62828",
  },

  erroTexto: {
    color: "#C62828",
    fontSize: 13,
    marginBottom: 10,
  },

  button: {
    height: 48,
    backgroundColor: "#001830",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
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