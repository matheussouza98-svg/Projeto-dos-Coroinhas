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

export default function NovaSenha({ navigation }) {
  const topPadding = useStatusBarPadding(12);

  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erro, setErro] = useState("");

  // ✅ SUCESSO
  const [sucesso, setSucesso] = useState("");

  function redefinir() {

    if (!senha && !confirmar) {
      setErro("Preencha todos os campos");
      setSucesso("");
      return;
    }

    if (!senha) {
      setErro("Digite a nova senha");
      setSucesso("");
      return;
    }

    if (!confirmar) {
      setErro("Confirme a nova senha");
      setSucesso("");
      return;
    }

    if (senha !== confirmar) {
      setErro("As senhas não coincidem");
      setSucesso("");
      return;
    }

    // ✅ LIMPA ERRO
    setErro("");

    // ✅ MOSTRA SUCESSO
    setSucesso("Senha redefinida com sucesso!");

    // ✅ REDIRECIONA
    setTimeout(() => {
      navigation.navigate("Login");
    }, 1000);
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
              <Text style={styles.backLinkText}>
                {'<'} Voltar
              </Text>
            </TouchableOpacity>

            <View style={styles.container}>

              <Text style={styles.title}>
                Nova Senha
              </Text>

              <TextInput
                style={[
                  styles.input,
                  erro ? styles.inputErro : null
                ]}
                placeholder="Digite a nova senha"
                secureTextEntry
                value={senha}
                onChangeText={(text) => {
                  setSenha(text);
                  setErro("");
                }}
              />

              <TextInput
                style={[
                  styles.input,
                  erro ? styles.inputErro : null
                ]}
                placeholder="Confirme a nova senha"
                secureTextEntry
                value={confirmar}
                onChangeText={(text) => {
                  setConfirmar(text);
                  setErro("");
                }}
              />

              {/* ✅ ERRO */}
              {erro ? (
                <Text style={styles.erroTexto}>
                  {erro}
                </Text>
              ) : null}

              {/* ✅ SUCESSO */}
              {sucesso ? (
                <View style={styles.sucessoBox}>

                  <Text style={styles.sucessoIcon}>
                    ✓
                  </Text>

                  <Text style={styles.sucessoTexto}>
                    {sucesso}
                  </Text>

                </View>
              ) : null}

              <TouchableOpacity
                style={styles.button}
                onPress={redefinir}
              >
                <Text style={styles.buttonText}>
                  Redefinir senha
                </Text>
              </TouchableOpacity>

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
    backgroundColor: "#fff"
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

  // ✅ SUCESSO
  sucessoBox: {
    backgroundColor: "#DFF7E3",
    borderWidth: 1,
    borderColor: "#28C76F",
    padding: 12,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 8,
  },

  sucessoIcon: {
    color: "#28C76F",
    fontSize: 18,
    fontWeight: "bold",
  },

  sucessoTexto: {
    color: "#28C76F",
    fontSize: 14,
    fontWeight: "bold",
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