import React, { useState } from "react";

export default function Cadastro({ navigation }) {

  const [form, setForm] = useState({
    nome: "",
    nascimento: "",
    telefone: "",
    responsavel: "",
    telResponsavel: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    autorizacao: false,
  });

  // ✅ ERROS
  const [erro, setErro] = useState("");
  const [erroTelefone, setErroTelefone] = useState("");
  const [erroTelResponsavel, setErroTelResponsavel] = useState("");
  const [camposErro, setCamposErro] = useState([]);

  // ✅ SUCESSO
  const [sucesso, setSucesso] = useState("");

  function handleChange(e) {

    const { name, value, type, checked } = e.target;

    let novoValor = value;

    // ✅ TELEFONES
    if (
      name === "telefone" ||
      name === "telResponsavel"
    ) {

      // REMOVE LETRAS
      novoValor = value.replace(/\D/g, "");

      // LIMITE 11 NÚMEROS
      novoValor = novoValor.slice(0, 11);
    }

    setForm({
      ...form,
      [name]: type === "checkbox"
        ? checked
        : novoValor,
    });

    // REMOVE BORDA VERMELHA
    if (camposErro.includes(name)) {
      setCamposErro(
        camposErro.filter((campo) => campo !== name)
      );
    }

    // ✅ REMOVE ERRO TELEFONE AO DIGITAR
    if (name === "telefone") {
      setErroTelefone("");
    }

    if (name === "telResponsavel") {
      setErroTelResponsavel("");
    }
  }

  function handleSubmit(e) {

    e.preventDefault();

    let erros = [];

    // ✅ LIMPA ERROS
    setErro("");
    setErroTelefone("");
    setErroTelResponsavel("");

    // ✅ CAMPOS VAZIOS
    Object.keys(form).forEach((campo) => {

      if (
        campo !== "autorizacao" &&
        form[campo].trim() === ""
      ) {
        erros.push(campo);
      }

    });

    setCamposErro(erros);

    // ✅ ERRO CAMPOS
    if (erros.length > 0) {

      setErro("Preencha todos os campos obrigatórios.");
      setSucesso("");

      return;
    }

    // ✅ TELEFONE INVÁLIDO
    if (form.telefone.length < 10) {

      setCamposErro((prev) => [
        ...prev,
        "telefone"
      ]);

      setErroTelefone(
        "Digite um telefone válido."
      );

      setSucesso("");

      return;
    }

    // ✅ TELEFONE RESPONSÁVEL INVÁLIDO
    if (form.telResponsavel.length < 10) {

      setCamposErro((prev) => [
        ...prev,
        "telResponsavel"
      ]);

      setErroTelResponsavel(
        "Digite um telefone válido."
      );

      setSucesso("");

      return;
    }

    // ✅ SENHAS DIFERENTES
    if (form.senha !== form.confirmarSenha) {

      setCamposErro([
        "senha",
        "confirmarSenha"
      ]);

      setErro("As senhas não coincidem.");
      setSucesso("");

      return;
    }

    // ✅ CHECKBOX
    if (!form.autorizacao) {

      setErro("Autorize o uso dos dados.");
      setSucesso("");

      return;
    }

    // ✅ LIMPA ERROS
    setErro("");
    setCamposErro([]);

    // ✅ SALVAR
    localStorage.setItem(
      "usuario",
      JSON.stringify(form)
    );

    // ✅ SUCESSO
    setSucesso(
      "Cadastro realizado com sucesso!"
    );

    // ✅ REDIRECIONA
    setTimeout(() => {
      navigation.navigate("Login");
    }, 1000);
  }

  return (

    <div style={styles.page}>

      <span
        style={styles.voltar}
        onClick={() => navigation.navigate("Login")}
      >
        &lt; Voltar para a tela de login
      </span>

      <div style={styles.container}>

        <h1 style={styles.titulo}>
          Cadastro
        </h1>

        <form
          style={styles.form}
          onSubmit={handleSubmit}
        >

          <label>Nome completo:</label>

          <input
            style={{
              ...styles.input,
              ...(camposErro.includes("nome")
                ? styles.inputErro
                : {})
            }}
            type="text"
            name="nome"
            placeholder="Digite seu nome completo"
            value={form.nome}
            onChange={handleChange}
          />

          <label>Data de nascimento:</label>

          <input
            style={{
              ...styles.input,
              ...(camposErro.includes("nascimento")
                ? styles.inputErro
                : {})
            }}
            type="date"
            name="nascimento"
            value={form.nascimento}
            onChange={handleChange}
          />

          <label>Telefone:</label>

          <input
            style={{
              ...styles.input,
              ...(camposErro.includes("telefone")
                ? styles.inputErro
                : {})
            }}
            type="tel"
            name="telefone"
            placeholder="(99) 99999-9999"
            value={form.telefone}
            onChange={handleChange}
            maxLength={11}
          />

          {/* ✅ ERRO TELEFONE */}
          {erroTelefone !== "" && (
            <div style={styles.textoErro}>
              {erroTelefone}
            </div>
          )}

          <label>Nome do responsável:</label>

          <input
            style={{
              ...styles.input,
              ...(camposErro.includes("responsavel")
                ? styles.inputErro
                : {})
            }}
            type="text"
            name="responsavel"
            placeholder="Digite o nome do responsável"
            value={form.responsavel}
            onChange={handleChange}
          />

          <label>Telefone do responsável:</label>

          <input
            style={{
              ...styles.input,
              ...(camposErro.includes("telResponsavel")
                ? styles.inputErro
                : {})
            }}
            type="tel"
            name="telResponsavel"
            placeholder="(99) 99999-9999"
            value={form.telResponsavel}
            onChange={handleChange}
            maxLength={11}
          />

          {/* ✅ ERRO TELEFONE RESPONSÁVEL */}
          {erroTelResponsavel !== "" && (
            <div style={styles.textoErro}>
              {erroTelResponsavel}
            </div>
          )}

          <label>E-mail:</label>

          <input
            style={{
              ...styles.input,
              ...(camposErro.includes("email")
                ? styles.inputErro
                : {})
            }}
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={form.email}
            onChange={handleChange}
          />

          <label>Senha:</label>

          <input
            style={{
              ...styles.input,
              ...(camposErro.includes("senha")
                ? styles.inputErro
                : {})
            }}
            type="password"
            name="senha"
            placeholder="Digite sua senha"
            value={form.senha}
            onChange={handleChange}
          />

          <label>Confirmar senha:</label>

          <input
            style={{
              ...styles.input,
              ...(camposErro.includes("confirmarSenha")
                ? styles.inputErro
                : {})
            }}
            type="password"
            name="confirmarSenha"
            placeholder="Confirme sua senha"
            value={form.confirmarSenha}
            onChange={handleChange}
          />

          {/* ✅ ERRO */}
          {erro !== "" && (
            <div style={styles.textoErro}>
              {erro}
            </div>
          )}

          <div style={styles.checkbox}>

            <input
              type="checkbox"
              name="autorizacao"
              checked={form.autorizacao}
              onChange={handleChange}
            />

            <span>
              Autorizo o uso dos dados para fins pastorais
            </span>

          </div>

          {/* ✅ SUCESSO */}
          {sucesso !== "" && (

            <div style={styles.sucessoBox}>

              <span style={styles.sucessoIcon}>
                ✓
              </span>

              <span style={styles.sucessoTexto}>
                {sucesso}
              </span>

            </div>

          )}

          <button
            type="submit"
            style={styles.botao}
          >
            Cadastrar
          </button>

        </form>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    width: "100%",
    fontFamily: "Arial, Helvetica, sans-serif",
    backgroundColor: "#ffffff",
    paddingTop: "60px",
    position: "relative",
  },

  voltar: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "#1a73e8",
    cursor: "pointer",
    fontSize: "14px",
  },

  container: {
    maxWidth: "380px",
    margin: "0 auto",
  },

  titulo: {
    textAlign: "center",
    color: "#001830",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
  },

  input: {
    height: "48px",
    backgroundColor: "#F2F2F2",
    borderRadius: "14px",
    padding: "0 14px",
    marginBottom: "15px",
    border: "none",
    fontSize: "14px",
    outline: "none",
  },

  // ✅ BORDA VERMELHA
  inputErro: {
    border: "2px solid #FF3B30",
  },

  // ✅ TEXTO ERRO
  textoErro: {
    color: "#FF3B30",
    fontSize: "13px",
    marginTop: "-5px",
    marginBottom: "10px",
  },

  // ✅ SUCESSO
  sucessoBox: {
    backgroundColor: "#DFF7E3",
    border: "1px solid #28C76F",
    color: "#28C76F",
    padding: "12px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "15px",
  },

  sucessoIcon: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#28C76F",
  },

  sucessoTexto: {
    fontSize: "14px",
    fontWeight: "bold",
  },

  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    margin: "20px 0",
    fontSize: "14px",
  },

  botao: {
    backgroundColor: "#001830",
    color: "white",
    border: "none",
    borderRadius: "14px",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
  },

};