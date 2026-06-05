import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FOTO_PERFIL_KEY = 'fotoPerfil';

const PerfilSessionContext = createContext(null);

export function PerfilSessionProvider({ children }) {
    const [fotoUri, setFotoUri] = useState(null);

    useEffect(() => {
        AsyncStorage.removeItem(FOTO_PERFIL_KEY).catch(() => {});
    }, []);

    return (
        <PerfilSessionContext.Provider value={{ fotoUri, setFotoUri }}>
            {children}
        </PerfilSessionContext.Provider>
    );
}

export function usePerfilSession() {
    const context = useContext(PerfilSessionContext);
    if (!context) {
        throw new Error('usePerfilSession deve ser usado dentro de PerfilSessionProvider');
    }
    return context;
}
