import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

function formatarQuandoConfirmacao(when) {
    if (!when) return '';

    const match = when.match(/(\d{2})\/(\d{2})\/\d{4},?\s*(\d{2}:\d{2})/);
    if (match) {
        return `${match[1]}/${match[2]} às ${match[3]}`;
    }

    return when;
}

export default function ConfirmacaoPresenca({
    route,
    navigation,
}) {
    const { activity, onSubmit, presencaSalva } = route.params || {};

    const [step, setStep] = useState('choice');
    const [justification, setJustification] = useState('');
    const [submitted, setSubmitted] = useState(Boolean(presencaSalva));
    const [result, setResult] = useState(presencaSalva ?? null);

    const nowFormatted = () =>
        new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

    const chaveAtividade =
        activity?.dateKey && activity?.time
            ? `${activity.dateKey}-${activity.time}`
            : null;

    const voltarParaEscala = () => {
        navigation.goBack();
    };

    const handleParticipation = () => {
        const response = {
            status: 'confirmed',
            when: nowFormatted(),
            activityKey: chaveAtividade,
            eventDate: activity?.dateKey,
            eventDay: activity?.day,
            eventNumber: activity?.number,
            eventMonth: activity?.month,
        };

        setResult(response);
        setSubmitted(true);

        if (typeof onSubmit === 'function') {
            onSubmit(response);
        }

        setTimeout(() => voltarParaEscala(), 1800);
    };

    const handleUnavailable = () => {
        setStep('justify');
    };

    const handleSendJustification = () => {
        const response = {
            status: 'unavailable',
            justification: justification.trim(),
            when: nowFormatted(),
            activityKey: chaveAtividade,
            eventDate: activity?.dateKey,
            eventDay: activity?.day,
            eventNumber: activity?.number,
            eventMonth: activity?.month,
        };

        setResult(response);
        setSubmitted(true);

        if (typeof onSubmit === 'function') {
            onSubmit(response);
        }

        setTimeout(() => voltarParaEscala(), 1800);
    };

    // SETA ←
    const handleBack = () => {
        if (step === 'justify') {
            setStep('choice');
            return;
        }

        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safe}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={handleBack}
                    style={styles.backButton}
                >
                    <Ionicons
                        name="arrow-back"
                        size={36}
                        color="#001830"
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    {step === 'choice'
                        ? 'Confirmar presença'
                        : 'Justificativa'}
                </Text>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* CARD */}
                <View style={styles.card}>
                    <View style={styles.cardDate}>
                        <Text style={styles.cardDateDay}>
                            {activity?.day}
                        </Text>

                        <Text style={styles.cardDateNumber}>
                            {activity?.number}
                        </Text>

                        <Text style={styles.cardDateMonth}>
                            {activity?.month}
                        </Text>
                    </View>

                    <View style={styles.cardInfo}>
                        <Text style={styles.cardTime}>
                            {activity?.time}
                        </Text>

                        {activity?.items?.map((item, index) => (
                            <Text key={index} style={styles.cardItem}>
                                {item}
                            </Text>
                        ))}
                    </View>
                </View>

                {/* RESULTADO */}
                {submitted ? (
                    <View
                        style={[
                            styles.resultFooter,
                            result.status === 'confirmed'
                                ? styles.resultFooterConfirmado
                                : styles.resultFooterIndisponivel,
                        ]}
                    >
                        <View
                            style={[
                                styles.resultFooterIconCircle,
                                result.status === 'confirmed'
                                    ? styles.resultFooterIconConfirmado
                                    : styles.resultFooterIconIndisponivel,
                            ]}
                        >
                            <Text style={styles.resultFooterIconText}>
                                {result.status === 'confirmed' ? '✓' : '✕'}
                            </Text>
                        </View>

                        <Text style={styles.resultFooterText}>
                            {result.status === 'confirmed'
                                ? `Você confirmou sua presença em ${formatarQuandoConfirmacao(result.when)}`
                                : `Você informou que não poderá ir em ${formatarQuandoConfirmacao(result.when)}`}
                        </Text>
                    </View>
                ) : (
                    <>
                        {/* TELA CONFIRMAÇÃO */}
                        {step === 'choice' && (
                            <View style={styles.promptBox}>
                                <Text style={styles.promptTitle}>
                                    Você vai participar desta missa?
                                </Text>

                                <Text style={styles.promptSubtitle}>
                                    Sua resposta será enviada para
                                    o coordenador e sua equipe.
                                </Text>

                                <TouchableOpacity
                                    style={[
                                        styles.actionButton,
                                        styles.confirmButton,
                                    ]}
                                    onPress={handleParticipation}
                                >
                                    <Ionicons
                                        name="checkmark"
                                        size={20}
                                        color="#fff"
                                        style={styles.iconButton}
                                    />

                                    <Text style={styles.actionButtonText}>
                                        Vou participar
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.actionButton,
                                        styles.unavailableButton,
                                    ]}
                                    onPress={handleUnavailable}
                                >
                                    <Ionicons
                                        name="close"
                                        size={20}
                                        color="#fff"
                                        style={styles.iconButton}
                                    />

                                    <Text style={styles.actionButtonText}>
                                        Não poderei ir
                                    </Text>
                                </TouchableOpacity>

                                {/* IMPORTANTE */}
                                <View style={styles.warningBox}>
                                    <View style={styles.warningRow}>
                                        <Ionicons
                                            name="information-circle-outline"
                                            size={20}
                                            color="#3d6cb9"
                                        />

                                        <View style={{ marginLeft: 8 }}>
                                            <Text style={styles.warningTitle}>
                                                Importante
                                            </Text>

                                            <Text style={styles.warningText}>
                                                Confirme sua presença até
                                                {'\n'}
                                                24 horas antes da missa.
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}

                        {/* TELA JUSTIFICATIVA */}
                        {step === 'justify' && (
                            <View style={styles.promptBox}>
                                <Text style={styles.justifyTitle}>
                                    Sentimos sua falta!
                                </Text>

                                <Text style={styles.justifySubtitle}>
                                    Por favor, nos justifique o motivo
                                    de você não poder ir.
                                </Text>

                                <Text style={styles.inputLabel}>
                                    Digite sua justificativa
                                </Text>

                                <TextInput
                                    style={styles.justificationInput}
                                    placeholder="Ex.: Tenho prova, vou viajar, estou doente..."
                                    placeholderTextColor="#b5b5b5"
                                    multiline
                                    value={justification}
                                    onChangeText={setJustification}
                                    maxLength={250}
                                />

                                <Text style={styles.counterText}>
                                    {justification.length}/250
                                </Text>

                                {/* AVISO */}
                                <View style={styles.warningBox}>
                                    <View style={styles.warningRow}>
                                        <Ionicons
                                            name="information-circle-outline"
                                            size={20}
                                            color="#3d6cb9"
                                        />

                                        <Text style={styles.warningSmallText}>
                                            Sua justificativa será enviada para
                                            o coordenador da liturgia.
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={[
                                        styles.actionButton,
                                        justification.trim()
                                            ? styles.sendButton
                                            : styles.disabledButton,
                                    ]}
                                    onPress={handleSendJustification}
                                    disabled={!justification.trim()}
                                >
                                    <Text style={styles.actionButtonText}>
                                        Enviar justificativa
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },

    backButton: {
        marginRight: 12,
    },

    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#001830',
        marginRight: 70,
    },

    container: {
        paddingHorizontal: 20,
    },

    contentContainer: {
        paddingBottom: 40,
    },

    card: {
        backgroundColor: '#001f4d',
        borderRadius: 20,
        padding: 18,
        marginBottom: 24,
        flexDirection: 'row',
    },

    cardDate: {
        width: 75,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
        borderRightWidth: 2.5,
        borderRightColor: 'rgba(255,255,255,0.55)',
        paddingRight: 14,
    },

    cardDateDay: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 4,
    },

    cardDateNumber: {
        fontSize: 38,
        color: '#fff',
        fontWeight: 'bold',
    },

    cardDateMonth: {
        fontSize: 16,
        color: '#fff',
        marginTop: 4,
    },

    cardInfo: {
        flex: 1,
        justifyContent: 'center',
    },

    cardTime: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    cardItem: {
        color: '#e4e4e4',
        fontSize: 14,
        marginBottom: 5,
    },

    promptBox: {
        backgroundColor: '#fff',
        borderRadius: 20,
    },

    promptTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#001830',
        textAlign: 'center',
        marginBottom: 10,
    },

    promptSubtitle: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
    },

    actionButton: {
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
        flexDirection: 'row',
    },

    iconButton: {
        marginRight: 8,
    },

    confirmButton: {
        backgroundColor: '#00ff4c',
    },

    unavailableButton: {
        backgroundColor: '#ff3a32',
    },

    sendButton: {
        backgroundColor: '#001f4d',
    },

    disabledButton: {
        backgroundColor: '#bfbfbf',
    },

    actionButtonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },

    warningBox: {
        backgroundColor: '#f5f8ff',
        borderRadius: 16,
        padding: 14,
        marginTop: -4,
        marginBottom: 20,
    },

    warningRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    warningTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2d4d88',
        marginBottom: 4,
    },

    warningText: {
        fontSize: 13,
        color: '#4c5d7a',
        lineHeight: 18,
    },

    warningSmallText: {
        flex: 1,
        marginLeft: 8,
        fontSize: 13,
        color: '#4c5d7a',
        lineHeight: 18,
    },

    justifyTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#001830',
        marginBottom: 8,
    },

    justifySubtitle: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 24,
    },

    inputLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#001830',
        marginBottom: 10,
    },

    justificationInput: {
        minHeight: 130,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 16,
        padding: 16,
        color: '#111',
        textAlignVertical: 'top',
        backgroundColor: '#fff',
        fontSize: 15,
    },

    counterText: {
        textAlign: 'right',
        color: '#999',
        marginTop: 8,
        marginBottom: 16,
        fontSize: 12,
    },

    resultFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 12,
        gap: 10,
    },

    resultFooterConfirmado: {
        backgroundColor: '#E8F5E9',
    },

    resultFooterIndisponivel: {
        backgroundColor: '#FCE4EC',
    },

    resultFooterIconCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
    },

    resultFooterIconConfirmado: {
        backgroundColor: '#43A047',
    },

    resultFooterIconIndisponivel: {
        backgroundColor: '#E53935',
    },

    resultFooterIconText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 14,
    },

    resultFooterText: {
        flex: 1,
        fontSize: 13,
        color: '#4A5568',
        lineHeight: 18,
    },
});