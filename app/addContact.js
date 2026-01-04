import { router } from 'expo-router';
import { View, Text, Pressable, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { useForm } from '../src/components/hooks/useForm';
import { useState } from 'react';
import useContact from '../src/server/contacts';

export default function AddContact() {
    const { registerContact } = useContact()
    const [errorEmail, seterrorEmail] = useState('');
    const [errorNickname, seterrorNickname] = useState('');
    const [loading, setloading] = useState(false);
    const [errorRegister, seterrorRegister] = useState(undefined)

    const { formState, setFormState } = useForm({ nickname: '', email: '' });

    const handleInputChange = (field, value) => {
        setFormState({
            ...formState,
            [field]: value,
        });

        seterrorRegister(undefined)

        // Validación en tiempo real
        if (field === 'nickname') {
            if (value.length > 0 && (value.length < 3 || value.length > 20)) {
                seterrorNickname('El nombre debe tener entre 3 y 20 caracteres.');
            } else {
                seterrorNickname('');
            }
        }

        if (field === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value.length > 0 && !emailRegex.test(value)) {
                seterrorEmail('Ingrese un correo válido.');
            } else {
                seterrorEmail('');
            }
        }
    };

    const validateFormContact = () => {
        let valid = true;

        if (!formState.nickname || formState.nickname.length < 3 || formState.nickname.length > 20) {
            seterrorNickname('El nombre debe tener entre 3 y 20 caracteres.');
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formState.email || !emailRegex.test(formState.email)) {
            seterrorEmail('Ingrese un correo válido.');
            valid = false;
        }

        return valid;
    };

    const handleRegisterContact = async () => {
        if (!validateFormContact()) return;

        setloading(true);
        const result = await registerContact(formState);
        console.log('📥 Resultado del servidor:', result);


        if (result.success && result.data) {
            console.log(result.data)
            setloading(false);
            router.push('/contacts')
        } else {
            setloading(false);
            seterrorRegister(result.error)
            console.log('⚠️ Error cargando contactos:', result.error);
        }

    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Pressable disabled={loading} onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={22} color="#007AFF" />
                </Pressable>
                <Text style={styles.headerTitle}>Agregar un nuevo contacto</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
                <Text style={styles.sectionTitle}>Información del contacto</Text>

                {/* Nombre */}
                <View style={styles.inputContainer}>
                    <View style={styles.iconBox}>
                        <Feather name="user" size={20} color="#636363" />
                    </View>
                    <TextInput
                        placeholder="Nombre"
                        placeholderTextColor="#999"
                        style={styles.textInput}
                        value={formState.nickname}
                        editable={!loading}
                        onChangeText={(text) => handleInputChange('nickname', text)}
                    />
                </View>
                {errorNickname ? <Text style={{ fontSize: 12, color: 'red' }}>{errorNickname}</Text> : null}

                {/* Correo */}
                <View style={styles.inputContainer}>
                    <View style={styles.iconBox}>
                        <Feather name="mail" size={20} color="#636363" />
                    </View>
                    <TextInput
                        placeholder="Correo electrónico"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        style={styles.textInput}
                        editable={!loading}
                        onChangeText={(text) => handleInputChange('email', text)}
                        value={formState.email}
                    />
                </View>
                {errorEmail ? <Text style={{ fontSize: 12, color: 'red' }}>{errorEmail}</Text> : null}

                {errorRegister ? <Text style={{ fontSize: 15, color: 'red' }}>⚠️ {errorRegister}</Text> : null}

                {/* Botón */}
                <Pressable
                    style={[styles.submitButton, loading && styles.buttonDisabled]}
                    disabled={loading}
                    onPress={handleRegisterContact}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.submitText}>Agregar contacto</Text>
                    )}
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonDisabled: {
        backgroundColor: '#B3D6FF',
    },
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
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f2f3',
        borderRadius: 20,
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
    },
    submitText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
