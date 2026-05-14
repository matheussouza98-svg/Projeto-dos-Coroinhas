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

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // 🔴 VALIDAÇÕES
    if (
      !form.nome ||
      !form.email ||
      !form.senha ||
      !form.confirmarSenha
    ) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (!form.autorizacao) {
      alert("Você precisa autorizar o uso dos dados.");
      return;
    }

    // 🔵 SALVAR USUÁRIO NO LOCALSTORAGE
    localStorage.setItem("usuario", JSON.stringify(form));

    alert("Cadastro realizado com sucesso!");

    navigation.navigate("Login");
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
        <h1 style={styles.titulo}>Cadastro</h1>

        <form style={styles.form} onSubmit={handleSubmit}>
          <label>Nome completo:</label>
          <input
            style={styles.input}
            type="text"
            name="nome"
            placeholder="Digite seu nome completo"
            value={form.nome}
            onChange={handleChange}
          />

          <label>Data de nascimento:</label>
          <input
            style={styles.input}
            type="date"
            name="nascimento"
            value={form.nascimento}
            onChange={handleChange}
          />

          <label>Telefone:</label>
          <input
            style={styles.input}
            type="tel"
            name="telefone"
            placeholder="Digite seu telefone"
            value={form.telefone}
            onChange={handleChange}
          />

          <label>Nome do responsável:</label>
          <input
            style={styles.input}
            type="text"
            name="responsavel"
            placeholder="Digite o nome do responsável"
            value={form.responsavel}
            onChange={handleChange}
          />

          <label>Telefone do responsável:</label>
          <input
            style={styles.input}
            type="tel"
            name="telResponsavel"
            placeholder="Digite o telefone do responsável"
            value={form.telResponsavel}
            onChange={handleChange}
          />

          <label>E-mail:</label>
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={form.email}
            onChange={handleChange}
          />

          <label>Senha:</label>
          <input
            style={styles.input}
            type="password"
            name="senha"
            placeholder="Digite sua senha"
            value={form.senha}
            onChange={handleChange}
          />

          <label>Confirmar senha:</label>
          <input
            style={styles.input}
            type="password"
            name="confirmarSenha"
            placeholder="Confirme sua senha"
            value={form.confirmarSenha}
            onChange={handleChange}
          />

          <div style={styles.checkbox}>
            <input
              type="checkbox"
              name="autorizacao"
              checked={form.autorizacao}
              onChange={handleChange}
            />
            <span>Autorizo o uso dos dados para fins pastorais</span>
          </div>
          
          <button type="submit" style={styles.botao}>
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
    maxWidth: "450px",
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
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid #999",
    fontSize: "14px",
    marginBottom: "10px",
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