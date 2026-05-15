import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (email === 'teste@teste' && senha === '123456') {
      navigation.navigate('AppTabs');
    } else {
      alert('Seus dados estão incorretos');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>

            <Image
              source={require('./assets/background.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.title}>Bem-vindo(a)</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>

            <Text style={styles.label}>E-mail:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Text style={styles.label}>Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <View style={styles.links}>
              <Text style={styles.textSmall}>Novo por aqui?</Text>

              <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.link}>Criar uma conta</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('EsqueceuSenha')}>
                <Text style={styles.link}>Recuperar Senha</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },

  container: {
    width: width < 400 ? '90%' : 360,
    padding: 20,
  },

  logo: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#001830'
  },

  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
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

  links: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5, 
  },

  textSmall: {
    fontSize: 13,
    color: '#000',
  },

  link: {
    fontSize: 13,
    color: '#1976D2',
    fontWeight: 'bold',
  },
});