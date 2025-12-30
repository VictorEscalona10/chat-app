import { router } from 'expo-router';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function AddContact() {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
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
                    />
                </View>

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
                    />
                </View>

                {/* Botón */}
                <Pressable style={styles.submitButton}>
                    <Text style={styles.submitText}>Agregar contacto</Text>
                </Pressable>
            </View>
        </View>
    )
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

    submitText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
