import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SuporteHeader from '../../components/SuporteHeader';

export default function ContaScreen({ navigation }) {
    return (
        <ScrollView style={styles.container}>

            <SuporteHeader
                title="Conta"
                navigation={navigation}
            />

            <View style={styles.avatarContainer}>
                <Ionicons
                    name="person-circle"
                    size={100}
                    color="#001F4D"
                />
            </View>

            <Text style={styles.label}>Nome completo:</Text>
            <TextInput
                style={styles.input}
                placeholder="João da Silva"
               placeholderTextColor="#9CA3AF"
            />

            <Text style={styles.label}>E-mail:</Text>
            <TextInput
                style={styles.input}
                placeholder="joao.silva@email.com"
                placeholderTextColor="#9CA3AF"
            />

            <Text style={styles.label}>Telefone:</Text>
            <TextInput
                style={styles.input}
                placeholder="(85) 99999-9999"
                placeholderTextColor="#9CA3AF"
            />

            <Text style={styles.label}>Data de nascimento:</Text>
            <TextInput
                style={styles.input}
                placeholder="12/05/2002"
                placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity style={styles.botao}>
                <Text style={styles.textoBotao}>
                    Salvar alterações
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },

    avatarContainer: {
        alignItems: 'center',
        marginBottom: 25,
    },

    label: {
        marginHorizontal: 20,
        marginBottom: 6,
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },

    input: {
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        marginBottom: 16,
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 55,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        color: '#374151',
    },

    botao: {
        backgroundColor: '#001F4D',
        margin: 20,
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textoBotao: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});