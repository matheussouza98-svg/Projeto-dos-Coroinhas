import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import SuporteHeader from '../../components/SuporteHeader';

export default function NotificacoesScreen({ navigation }) {
    const [avisosEscala, setAvisosEscala] = useState(true);
    const [lembretesMissa, setLembretesMissa] = useState(true);
    const [mensagens, setMensagens] = useState(true);
    const [novidades, setNovidades] = useState(false);

    const [lembrete, setLembrete] = useState('1h');

    return (
        <SafeAreaView
            style={styles.container}
            edges={['left', 'right', 'bottom']}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >

                <SuporteHeader
                    title="Notificações"
                    navigation={navigation}
                />

                {/* ALERTAS */}
                <Text style={styles.sectionTitle}>
                    Alertas e lembretes
                </Text>

                <View style={styles.card}>
                    <SwitchItem
                        title="Avisos da escala"
                        value={avisosEscala}
                        onValueChange={setAvisosEscala}
                    />

                    <SwitchItem
                        title="Lembretes de missa"
                        value={lembretesMissa}
                        onValueChange={setLembretesMissa}
                    />

                    <SwitchItem
                        title="Mensagens da coordenação"
                        value={mensagens}
                        onValueChange={setMensagens}
                    />

                    <SwitchItem
                        title="Novidades do aplicativo"
                        value={novidades}
                        onValueChange={setNovidades}
                        lastItem
                    />
                </View>

                {/* LEMBRETE */}
                <Text style={styles.sectionTitle}>
                    Lembrete
                </Text>

                <View style={styles.card}>
                    <RadioItem
                        title="1 hora antes"
                        selected={lembrete === '1h'}
                        onPress={() => setLembrete('1h')}
                    />

                    <RadioItem
                        title="3 horas antes"
                        selected={lembrete === '3h'}
                        onPress={() => setLembrete('3h')}
                    />

                    <RadioItem
                        title="1 dia antes"
                        selected={lembrete === '1d'}
                        onPress={() => setLembrete('1d')}
                        lastItem
                    />
                </View>

                {/* INFO */}
            </ScrollView>

            <View style={styles.infoBox}>
                <Ionicons
                    name="information-circle-outline"
                    size={22}
                    color="#001F4D"
                />

                <Text style={styles.infoText}>
                    Você poderá alterar essas preferências
                    quando quiser.
                </Text>
            </View>

        </SafeAreaView>
    );
}

function SwitchItem({
    title,
    value,
    onValueChange,
    lastItem = false,
}) {
    return (
        <View
            style={[
                styles.item,
                !lastItem && styles.borderBottom,
            ]}
        >
            <Text style={styles.itemText}>
                {title}
            </Text>

            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{
                    false: '#D6D6D6',
                    true: '#2563EB',
                }}
                thumbColor="#FFF"
            />
        </View>
    );
}

function RadioItem({
    title,
    selected,
    onPress,
    lastItem = false,
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[
                styles.item,
                !lastItem && styles.borderBottom,
            ]}
        >
            <View style={styles.radioContainer}>
                <View
                    style={[
                        styles.radio,
                        selected && styles.radioActive,
                    ]}
                >
                    {selected && (
                        <View style={styles.radioInside} />
                    )}
                </View>

                <Text style={styles.itemText}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 15,
        marginHorizontal: 20,
    },

    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginHorizontal: 20,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#ECECEC',
        overflow: 'hidden',
    },

    item: {
        paddingHorizontal: 18,
        paddingVertical: 22,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
    },

    itemText: {
        fontSize: 17,
        color: '#1A1A1A',
        fontWeight: '600',
    },

    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    radio: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#B8B8B8',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
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

    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEF2F7',
        marginHorizontal: 16,
        marginBottom: 16,
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: 12,
    },

    infoText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 13,
        color: '#001F4D',
        lineHeight: 18,
    },
});