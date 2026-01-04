import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = 'http://192.168.1.102:3000';

export default function useContact() {
    const getAllcontacts = async () => {
        try {
            console.log('🔗 Conectando a:', API_URL);

            // 1. Obtener el token guardado en AsyncStorage
            const token = await AsyncStorage.getItem('userToken');

            if (!token) {
                throw new Error('No se encontró el token en AsyncStorage');
            }

            // 2. Hacer la petición con el token en el header
            const response = await axios.get(`${API_URL}/contacts/get-all`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                timeout: 10000,
            });

            return {
                success: true,
                data: response.data,
                error: null
            };

        } catch (error) {
            console.error('❌ Error en obtener los contactos:', {
                message: error.message,
                code: error.code,
                response: error.response?.data
            });

            return {
                success: false,
                data: null,
                error: error.response?.data?.message ||
                    'No se pudo conectar al servidor. Verifica tu conexión.'
            };
        }
    };

    const registerContact = async (contactData) => {
        try {
            console.log('🔗 Conectando a:', API_URL);

            // 1. Obtener el token guardado en AsyncStorage
            const token = await AsyncStorage.getItem('userToken');

            if (!token) {
                throw new Error('No se encontró el token en AsyncStorage');
            }

            // 2. Hacer la petición con el token en el header
            const response = await axios.post(`${API_URL}/contacts/create`, contactData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                timeout: 10000,
            });

            return {
                success: true,
                data: response.data,
                error: null
            };

        } catch (error) {
            console.error('❌ Error en obtener los contactos:', {
                message: error.message,
                code: error.code,
                response: error.response?.data
            });

            return {
                success: false,
                data: null,
                error: error.response?.data?.message ||
                    'No se pudo conectar al servidor. Verifica tu conexión.'
            };
        }
    };

    return {
        getAllcontacts,
        registerContact
    };
}
