import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SuporteHeader from '@/shared/components/layout/SuporteHeader';

export default function Privacidade({ navigation }) {
    const [nome, setNome] = useState(true);
    const [telefone, setTelefone] = useState(false);
    const [email, setEmail] = useState(false);
    const [foto, setFoto] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            <SuporteHeader
                title="Privacidade"
                navigation={navigation}
            />

            <Text style={styles.section}>Visibilidade</Text>

            <View style={styles.card}>
                <Item
                    titulo="Mostrar meu nome para outros membros"
                    valor={nome}
                    alterar={setNome}
                />

                <Item
                    titulo="Mostrar telefone"
                    valor={telefone}
                    alterar={setTelefone}
                />

                <Item
                    titulo="Mostrar e-mail"
                    valor={email}
                    alterar={setEmail}
                />

                <Item
                    titulo="Compartilhar foto de perfil"
                    valor={foto}
                    alterar={setFoto}
                />
            </View>

            <Text style={styles.section}>Segurança</Text>

            <View style={styles.card}>
                <Linha titulo="Alterar senha" />
                <Linha titulo="Dispositivos conectados" />
                <Linha titulo="Política de Privacidade" />
            </View>

            <TouchableOpacity style={styles.excluir}>
                <Text style={styles.excluirTexto}>Excluir minha conta</Text>
                <Ionicons name="trash-outline" size={22} color="#FF3B30" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

function Item({ titulo, valor, alterar }) {
    return (
        <View style={styles.item}>
            <Text style={styles.itemTexto}>{titulo}</Text>

            <Switch
                value={valor}
                onValueChange={alterar}
                trackColor={{
                    false: '#D6D6D6',
                    true: '#2563EB',
                }}
                thumbColor="#FFF"
            />
        </View>
    );
}

function Linha({ titulo }) {
    return (
        <TouchableOpacity style={styles.item}>
            <Text style={styles.itemTexto}>{titulo}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FB",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 20,
        backgroundColor: "#FFF",
    },

    titulo: {
        fontSize: 20,
        fontWeight: "700",
        color: "#002B5B",
        marginLeft: 12,
    },

    section: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
        marginHorizontal: 20,
        marginTop: 28,
        marginBottom: 12,
    },

    card: {
        backgroundColor: "#FFF",
        marginHorizontal: 15,
        marginBottom: 8,
        borderRadius: 14,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#ECECEC",
    },

    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },

    itemTexto: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },

    excluir: {
        marginTop: 20,
        marginHorizontal: 15,
        backgroundColor: "#FFF",
        borderRadius: 14,
        padding: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    excluirTexto: {
        color: "#FF3B30",
        fontSize: 16,
        fontWeight: "600",
    },
});