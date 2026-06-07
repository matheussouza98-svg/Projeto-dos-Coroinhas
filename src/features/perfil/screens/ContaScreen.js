import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Modal,
    Pressable,
    Platform,
} from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import SuporteHeader from '@/shared/components/layout/SuporteHeader';
import DataNascimentoField from '@/shared/components/forms/DataNascimentoField';
import { usePerfilSession } from '@/features/perfil/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ContaScreen({ navigation }) {
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const { fotoUri, setFotoUri } = usePerfilSession();
    const [modalFotoAberto, setModalFotoAberto] = useState(false);

    function formatarTelefone(texto) {
        const numeros = texto.replace(/\D/g, '');

        if (numeros.length === 0) {
            return '';
        }

        if (numeros.length <= 2) {
            return `(${numeros}`;
        }

        if (numeros.length <= 7) {
            return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
        }

        return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
    }

    useEffect(() => {
        async function carregarDados() {
            try {
                const nomeSalvo = await AsyncStorage.getItem('nome');
                const emailSalvo = await AsyncStorage.getItem('email');
                const telefoneSalvo = await AsyncStorage.getItem('telefone');
                const dataSalva = await AsyncStorage.getItem('dataNascimento');
                const fotoSalva = await AsyncStorage.getItem('fotoUri');

                if (fotoSalva) setFotoUri(fotoSalva);
                if (nomeSalvo) setNome(nomeSalvo);
                if (emailSalvo) setEmail(emailSalvo);
                if (telefoneSalvo) setTelefone(telefoneSalvo);
                if (dataSalva) setDataNascimento(dataSalva);
            } catch (error) {
                console.log(error);
            }
        }

        carregarDados();
    }, []);

    async function abrirGaleria() {
        try {
            if (Platform.OS === 'web') {
                const resultado = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ['images'],
                    quality: 0.8,
                });
                setModalFotoAberto(false);

                if (!resultado.canceled && resultado.assets?.[0]) {
                    setFotoUri(resultado.assets[0].uri);
                }
                return;
            }

            setModalFotoAberto(false);

            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permissão necessária',
                    'Precisamos de acesso à galeria para escolher uma foto.'
                );
                return;
            }

            const resultado = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!resultado.canceled && resultado.assets?.[0]) {
                setFotoUri(resultado.assets[0].uri);
            }
        } catch (error) {
            console.log(error);
            setModalFotoAberto(false);
            Alert.alert('Erro', 'Não foi possível abrir a galeria.');
        }
    }

    async function abrirCamera() {
        try {
            setModalFotoAberto(false);

            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permissão necessária',
                    'Precisamos de acesso à câmera para tirar uma foto.'
                );
                return;
            }

            const resultado = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!resultado.canceled && resultado.assets?.[0]) {
                setFotoUri(resultado.assets[0].uri);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível abrir a câmera.');
        }
    }

    function removerFoto() {
        setFotoUri(null);
        setModalFotoAberto(false);
    }

    function escolherFoto() {
        setModalFotoAberto(true);
    }

    async function salvarAlteracoes() {
        Alert.alert('Teste', 'Botão funcionando');

        try {
            await AsyncStorage.setItem('nome', nome);
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('telefone', telefone);
            await AsyncStorage.setItem('dataNascimento', dataNascimento);
            await AsyncStorage.setItem('fotoUri', fotoUri || '');

            Alert.alert('Sucesso', 'Alterações salvas com sucesso!');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar os dados.');
        }
    }

    return (
        <>
            <ScrollView style={styles.container}>

                <SuporteHeader
                    title="Conta"
                    navigation={navigation}
                />

                <TouchableOpacity
                    style={styles.avatarContainer}
                    onPress={escolherFoto}
                    activeOpacity={0.85}
                >
                    {fotoUri ? (
                        <Image
                            source={{ uri: fotoUri }}
                            style={styles.avatarFoto}
                            contentFit="cover"
                        />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Ionicons
                                name="person"
                                size={48}
                                color="#001F4D"
                            />
                        </View>
                    )}

                    <View style={styles.avatarBadge}>
                        <Ionicons name="camera" size={16} color="#FFF" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={escolherFoto} activeOpacity={0.7}>
                    <Text style={styles.avatarHint}>Toque para adicionar ou alterar a foto</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Nome completo:</Text>
                <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Digite seu nome completo"
                />

                <Text style={styles.label}>E-mail:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="seuemail@exemplo.com"
                />

                <Text style={styles.label}>Telefone:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="(00) 00000-0000"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="phone-pad"
                    value={telefone}
                    onChangeText={(texto) => {
                        setTelefone(formatarTelefone(texto));
                    }}
                    maxLength={15}
                />

                <Text style={styles.label}>Data de nascimento:</Text>
                <DataNascimentoField
                    value={dataNascimento}
                    onChange={setDataNascimento}
                    wrapperStyle={styles.dateWrapper}
                    inputStyle={styles.dateInput}
                    iconButtonStyle={styles.calendarIcon}
                    iconColor="#6B7280"
                />

                <TouchableOpacity style={styles.botao} onPress={salvarAlteracoes}>
                    <Text style={styles.textoBotao}>
                        Salvar alterações
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                transparent
                animationType="fade"
                visible={modalFotoAberto}
                onRequestClose={() => setModalFotoAberto(false)}
            >
                <View style={styles.modalOverlay}>
                    <Pressable
                        style={styles.modalBackdrop}
                        onPress={() => setModalFotoAberto(false)}
                    />
                    <View style={styles.modalSheet}>
                        <Text style={styles.modalTitulo}>Foto de perfil</Text>
                        <Text style={styles.modalSubtitulo}>
                            Como deseja adicionar sua foto?
                        </Text>

                        <TouchableOpacity
                            style={styles.modalOpcao}
                            onPress={abrirGaleria}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="images-outline" size={22} color="#001F4D" />
                            <Text style={styles.modalOpcaoTexto}>Escolher da galeria</Text>
                        </TouchableOpacity>

                        {Platform.OS !== 'web' ? (
                            <TouchableOpacity
                                style={styles.modalOpcao}
                                onPress={abrirCamera}
                                activeOpacity={0.8}
                            >
                                <Ionicons name="camera-outline" size={22} color="#001F4D" />
                                <Text style={styles.modalOpcaoTexto}>Tirar foto</Text>
                            </TouchableOpacity>
                        ) : null}

                        {fotoUri ? (
                            <TouchableOpacity
                                style={[styles.modalOpcao, styles.modalOpcaoPerigo]}
                                onPress={removerFoto}
                                activeOpacity={0.8}
                            >
                                <Ionicons name="trash-outline" size={22} color="#DC2626" />
                                <Text style={[styles.modalOpcaoTexto, styles.modalOpcaoTextoPerigo]}>
                                    Remover foto
                                </Text>
                            </TouchableOpacity>
                        ) : null}

                        <TouchableOpacity
                            style={styles.modalCancelar}
                            onPress={() => setModalFotoAberto(false)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.modalCancelarTexto}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },

    avatarContainer: {
        alignSelf: 'center',
        marginBottom: 8,
        position: 'relative',
    },

    avatarPlaceholder: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: '#E8EEF4',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#D1D9E6',
    },

    avatarFoto: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 2,
        borderColor: '#D1D9E6',
    },

    avatarBadge: {
        position: 'absolute',
        right: 2,
        bottom: 2,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#001F4D',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#F7F7F7',
    },

    avatarHint: {
        textAlign: 'center',
        fontSize: 13,
        color: '#6B7280',
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

    dateWrapper: {
        marginHorizontal: 20,
        marginBottom: 16,
    },

    dateInput: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingRight: 44,
        height: 55,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        fontSize: 15,
        color: '#374151',
    },

    calendarIcon: {
        right: 14,
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

    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    modalBackdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
    },

    modalSheet: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 28,
    },

    modalTitulo: {
        fontSize: 18,
        fontWeight: '700',
        color: '#001F4D',
        marginBottom: 4,
    },

    modalSubtitulo: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 16,
    },

    modalOpcao: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F2F5',
    },

    modalOpcaoPerigo: {
        borderBottomWidth: 0,
    },

    modalOpcaoTexto: {
        fontSize: 16,
        color: '#001F4D',
        fontWeight: '600',
    },

    modalOpcaoTextoPerigo: {
        color: '#DC2626',
    },

    modalCancelar: {
        marginTop: 12,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalCancelarTexto: {
        fontSize: 15,
        fontWeight: '600',
        color: '#374151',
    },
});
