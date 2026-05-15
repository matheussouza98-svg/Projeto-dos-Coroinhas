import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Escala({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* MENU */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuVisible(v => !v)}
        >
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>

        {/* MENU DROPDOWN */}
        {menuVisible && (
          <View style={styles.dropdownMenu}>

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Inicio');
              }}
            >
              <Text style={styles.dropdownText}>Início</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Escala');
              }}
            >
              <Text style={styles.dropdownText}>Escala</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Oracoes');
              }}
            >
              <Text style={styles.dropdownText}>Orações</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Perfil');
              }}
            >
              <Text style={styles.dropdownText}>Perfil</Text>
            </TouchableOpacity>

          </View>
        )}

        {/* TÍTULO */}
        <Text style={styles.titulo}>Escalas</Text>

        {/* ABAS */}
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.tabActive}>
            <Text style={styles.tabTextActive}>Próximas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Todas</Text>
          </TouchableOpacity>
        </View>

        {/* LISTA */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >

          {/* CARD 1 */}
          <View style={styles.card}>

            <View style={styles.dataBox}>
              <Text style={styles.dataDiaSemana}>DOM</Text>
              <Text style={styles.dataNumero}>24</Text>
              <Text style={styles.dataMes}>MAI</Text>
            </View>

 <View style={styles.cardInfo}>
              <Text style={styles.horario}>
                08hs - Matriz Nossa Senhora de Nazaré.
              </Text>
             <Text style={styles.info}>
                Turíbulo: João
              </Text>

              <Text style={styles.info}>
                Naveta: Enzo
              </Text>

              <Text style={styles.info}>
                Cruz: Lucas
              </Text>

              <Text style={styles.info}>
                Velas: Gabriel e Pedro
              </Text>

              <Text style={styles.info}>
                Servir: Lucas, Gabriel e Pedro
              </Text>

              <Text style={styles.info}>
                Misal: Matheus
              </Text>

            </View>

          </View>

          {/* CARD 2 */}
          <View style={styles.card}>

            <View style={styles.dataBox}>
              <Text style={styles.dataDiaSemana}>QUI</Text>
              <Text style={styles.dataNumero}>28</Text>
              <Text style={styles.dataMes}>MAI</Text>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.horario}>
                19hs • Matriz Nossa Senhora de Nazaré.
              </Text>

              <Text style={styles.info}>
                Servir: Pedro e Lucas
              </Text>

              <Text style={styles.info}>
                Sino: Pedro
              </Text>
            </View>

          </View>

          {/* CARD 3 */}
          <View style={styles.card}>

            <View style={styles.dataBox}>
              <Text style={styles.dataDiaSemana}>SEX</Text>
              <Text style={styles.dataNumero}>29</Text>
              <Text style={styles.dataMes}>MAI</Text>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.horario}>
                08hs - Matriz Nossa Senhora de Nazaré.
              </Text>

              <Text style={styles.info}>
                Servir: Gabriel e Pedro
              </Text>

               <Text style={styles.info}>
                Sino: Gabriel
              </Text>
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

  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
  },

  menuButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 20,
  },

  menuIcon: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },

  dropdownMenu: {
    position: 'absolute',
    top: 78,
    left: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 6,
    zIndex: 10,
    width: 180,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  dropdownText: {
    fontSize: 18,
    color: '#111',
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1d2951',
    marginBottom: 25,
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#d6a100',
    paddingBottom: 8,
    width: 120,
    alignItems: 'center',
  },

  tab: {
    paddingBottom: 8,
    width: 120,
    alignItems: 'center',
  },

  tabTextActive: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111',
  },

  tabText: {
    fontSize: 17,
    color: '#777',
  },

  content: {
    flex: 1,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 14,
    marginBottom: 18,
    flexDirection: 'row',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,

    elevation: 3,
  },

  dataBox: {
    width: 75,
    height: 110,
    backgroundColor: '#0d2a63',
    borderRadius: 18,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 16,
  },

  dataDiaSemana: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  dataNumero: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 2,
  },

  dataMes: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  cardInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  horario: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },

  info: {
    fontSize: 15,
    color: '#555',
    marginBottom: 4,
  },

});