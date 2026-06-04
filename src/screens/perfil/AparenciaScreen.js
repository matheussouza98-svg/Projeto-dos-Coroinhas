import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SuporteHeader from '../../components/SuporteHeader';

export default function AparenciaScreen({ navigation }) {
    const [tema, setTema] = useState('claro');
    const [fonte, setFonte] = useState('media');
    const [cor, setCor] = useState('#002B5B');
    const cores = [
        '#002B5B',
        '#8B5CF6',
        '#22C55E',
        '#F59E0B',
        '#EF4444',
        '#0EA5A4',
    ];

    useEffect(() => {
        const carregarPreferencias = async () => {
            try {
                const temaSalvo = await AsyncStorage.getItem('tema');
                const fonteSalva = await AsyncStorage.getItem('fonte');
                const corSalva = await AsyncStorage.getItem('corPrincipal');

                setTema(temaSalvo || 'claro');
                setFonte(fonteSalva || 'media');
                setCor(corSalva || '#002B5B');
            } catch (error) {
                console.log(error);
            }
        };

        carregarPreferencias();
    }, []);

    const salvarPreferencias = async () => {
        try {
            await AsyncStorage.setItem('tema', tema);
            await AsyncStorage.setItem('fonte', fonte);
            await AsyncStorage.setItem('corPrincipal', cor);

            Alert.alert(
                'Sucesso',
                'Preferências salvas com sucesso!'
            );
        } catch (error) {
            Alert.alert(
                'Erro',
                'Não foi possível salvar as preferências.'
            );
        }
    };

    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor:
                        tema === 'escuro'
                            ? '#121212'
                            : '#FFFFFF',
                },
            ]}
            edges={['left', 'right', 'bottom']}
        >
            <SuporteHeader
                title="Aparência"
                navigation={navigation}
            />

            <ScrollView contentContainerStyle={styles.content}>
                <Text
                    style={[
                        styles.sectionTitle,
                        {
                            color: tema === 'escuro' ? '#FFFFFF' : '#000000',
                        },
                    ]}
                >
                    Tema
                </Text>

                {[
                    { label: 'Claro', value: 'claro', icon: 'sunny-outline' },
                    { label: 'Escuro', value: 'escuro', icon: 'moon-outline' },
                    { label: 'Seguir sistema', value: 'sistema', icon: 'phone-portrait-outline' },
                ].map(item => (
                    <TouchableOpacity
                        key={item.value}
                        style={[
                            styles.option,
                            {
                                backgroundColor:
                                    tema === 'escuro'
                                        ? '#1E1E1E'
                                        : '#FFFFFF',
                                borderColor:
                                    tema === 'escuro'
                                        ? '#333333'
                                        : '#E5E7EB',
                            },
                        ]}
                        onPress={() => setTema(item.value)}
                    >
                        <View style={styles.optionLeft}>
                            <Ionicons name={item.icon} size={22} color={cor} />
                            <Text
                                style={[
                                    styles.optionText,
                                    {
                                        color:
                                            tema === 'escuro'
                                                ? '#FFFFFF'
                                                : '#1F2937',
                                    },
                                ]}
                            >
                                {item.label}
                            </Text>
                        </View>

                        <View
                            style={[
                                styles.radio,
                                tema === item.value && styles.radioActive,
                            ]}
                        >
                            {tema === item.value && (
                                <View style={styles.radioInside} />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}

                <Text
                    style={[
                        styles.sectionTitle,
                        {
                            color: tema === 'escuro' ? '#FFFFFF' : '#000000',
                        },
                    ]}
                >
                    Tamanho da fonte
                </Text>

                {[
                    { label: 'Pequena', value: 'pequena' },
                    { label: 'Média', value: 'media' },
                    { label: 'Grande', value: 'grande' },
                ].map(item => (
                    <TouchableOpacity
                        key={item.value}
                        style={[
                            styles.option,
                            {
                                backgroundColor:
                                    tema === 'escuro'
                                        ? '#1E1E1E'
                                        : '#FFFFFF',
                                borderColor:
                                    tema === 'escuro'
                                        ? '#333333'
                                        : '#E5E7EB',
                            },
                        ]}
                        onPress={() => setFonte(item.value)}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                {
                                    color:
                                        tema === 'escuro'
                                            ? '#FFFFFF'
                                            : '#1F2937',
                                },
                            ]}
                        >
                            {item.label}
                        </Text>

                        <View
                            style={[
                                styles.radio,
                                fonte === item.value && styles.radioActive,
                            ]}
                        >
                            {fonte === item.value && (
                                <View style={styles.radioInside} />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}

                <Text
                    style={[
                        styles.sectionTitle,
                        {
                            color: tema === 'escuro' ? '#FFFFFF' : '#000000',
                        },
                    ]}
                >
                    Cor principal do aplicativo
                </Text>

                <View style={styles.colorsContainer}>
                    {cores.map(item => (
                        <TouchableOpacity
                            key={item}
                            style={[
                                styles.colorCircle,
                                { backgroundColor: item },
                                cor === item && styles.colorSelected,
                            ]}
                            onPress={() => setCor(item)}
                        />
                    ))}
                </View>

                <TouchableOpacity
                    style={[
                        styles.saveButton,
                        { backgroundColor: cor }
                    ]}
                    onPress={salvarPreferencias}
                >
                    <Text style={styles.saveText}>Salvar preferências</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    content: {
        padding: 16,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },

    option: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        padding: 18,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },

    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    optionText: {
        fontSize: 16,
        color: '#1F2937',
    },

    radio: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#B8B8B8',
        alignItems: 'center',
        justifyContent: 'center',
    },

    radioActive: {
        borderColor: '#001F4D',
    },

    radioInside: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#001F4D',
    },

    colorsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    colorCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
    },

    colorSelected: {
        borderWidth: 3,
        borderColor: '#fff',
    },

    saveButton: {
        backgroundColor: '#002B5B',
        padding: 18,
        borderRadius: 12,
        marginTop: 30,
    },

    saveText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});