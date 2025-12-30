import { router } from 'expo-router';
import { View, Text, Pressable, StyleSheet, TextInput, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { useAuth } from '../src/server/auth';

export default function Register() {
    const { register } = useAuth();
    const [registerApi, setRegisterApi] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        birthday: ""
    });

    // Formatear fecha de DD/MM/AAAA a AAAA-MM-DD
    const formatBirthdayToDate = (birthdayString) => {
        // Validar formato DD/MM/AAAA
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const match = birthdayString.match(regex);
        
        if (!match) {
            throw new Error('Formato de fecha inválido. Use DD/MM/AAAA');
        }
        
        const [, day, month, year] = match;
        const dayNum = parseInt(day, 10);
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);
        
        // Validar valores de fecha
        if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || yearNum < 1900) {
            throw new Error('Fecha inválida');
        }
        
        // Crear fecha en formato ISO (AAAA-MM-DD)
        const date = new Date(yearNum, monthNum - 1, dayNum);
        return date.toISOString().split('T')[0]; // Retorna YYYY-MM-DD
    };

    const handleRegister = async () => {
        // Validaciones básicas
        if (!formData.name.trim() || !formData.email.trim() || !formData.birthday.trim()) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
            return;
        }

        setLoading(true);

        try {
            // Formatear datos para el backend
            const userData = {
                username: formData.name.trim(),
                email: formData.email.trim(),
                birthDate: formatBirthdayToDate(formData.birthday)
            };

            console.log('Enviando datos:', userData);

            const result = await register(userData, setRegisterApi);
            
            if (result.success) {
                Alert.alert(
                    '¡Éxito!', 
                    result.data.message || 'Código de verificación enviado a tu email',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                // Navegar a pantalla de verificación con el email
                                router.push({
                                    pathname: '/verify',
                                    params: { email: formData.email }
                                });
                            }
                        }
                    ]
                );
            } else {
                Alert.alert('Error', result.error);
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'Error al procesar la solicitud');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const handleBirthdayChange = (text) => {
        let numericText = text.replace(/[^\d]/g, '');
        
        if (numericText.length > 0) {
            if (numericText.length <= 2) {
                numericText = numericText;
            } else if (numericText.length <= 4) {
                numericText = `${numericText.substring(0, 2)}/${numericText.substring(2)}`;
            } else {
                numericText = `${numericText.substring(0, 2)}/${numericText.substring(2, 4)}/${numericText.substring(4, 8)}`;
            }
        }
        
        handleInputChange('birthday', numericText);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Crear nueva cuenta</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.sectionTitle}>Información personal</Text>

                <View style={styles.inputContainer}>
                    <View style={styles.iconBox}>
                        <Feather name="user" size={20} color="#636363" />
                    </View>
                    <TextInput 
                        placeholder="Nombre completo" 
                        placeholderTextColor="#999"
                        style={styles.textInput}
                        value={formData.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                        editable={!loading}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.iconBox}>
                        <Feather name="mail" size={20} color="#636363" />
                    </View>
                    <TextInput 
                        placeholder="Correo electrónico" 
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.textInput}
                        value={formData.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                        editable={!loading}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.iconBox}>
                        <Feather name="calendar" size={20} color="#636363" />
                    </View>
                    <TextInput 
                        placeholder="DD/MM/AAAA" 
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        style={styles.textInput}
                        value={formData.birthday}
                        onChangeText={handleBirthdayChange}
                        maxLength={10}
                        editable={!loading}
                    />
                </View>

                <Pressable 
                    style={[styles.submitButton, loading && styles.submitButtonDisabled]} 
                    onPress={handleRegister}
                    disabled={loading}
                >
                    <Text style={styles.submitText}>
                        {loading ? 'Procesando...' : 'Crear cuenta'}
                    </Text>
                </Pressable>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
                    <Pressable onPress={() => router.push('/login')} disabled={loading}>
                        <Text style={[styles.loginLink, loading && styles.disabledLink]}>Iniciar sesión</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: 30,
        backgroundColor: '#fff',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 10,
        color: '#333',
    },

    formContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 25,
        gap: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#444',
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        paddingHorizontal: 10,
        height: 50,
    },
    iconBox: {
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },

    submitButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    submitButtonDisabled: {
        backgroundColor: '#B3D6FF',
    },
    submitText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },

    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 20,
    },
    loginText: {
        fontSize: 14,
        color: '#666',
    },
    loginLink: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '600',
    },
    disabledLink: {
        color: '#B3D6FF',
    },
});