import { router, useLocalSearchParams } from 'expo-router';
import { 
  View, Text, Pressable, StyleSheet, TextInput, 
  Alert, ActivityIndicator, Keyboard 
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect, useRef } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { useAuth } from '../src/server/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VerifyLoginScreen() {
    const params = useLocalSearchParams();
    const email = params.email || '';
    
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    
    const inputRefs = useRef([]);
    const { verifyLogin, login } = useAuth();

    useEffect(() => {
        let interval;
        if (timer > 0 && !canResend) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer, canResend]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 6);
    }, []);

    const handleCodeChange = (value, index) => {
        if (value.length > 1) {
            const newCode = value.split('').slice(0, 6);
            const updatedCode = [...code];
            newCode.forEach((char, i) => {
                if (i < 6) updatedCode[i] = char;
            });
            setCode(updatedCode);
            
            if (newCode.length === 6) {
                if (inputRefs.current[5]) {
                    inputRefs.current[5].focus();
                }
                setTimeout(() => handleVerify(), 500);
            }
            return;
        }

        const newCode = [...code];
        const numericValue = value.replace(/[^0-9]/g, '');
        newCode[index] = numericValue;
        setCode(newCode);

        if (numericValue && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }

        const fullCode = newCode.join('');
        if (fullCode.length === 6) {
            Keyboard.dismiss();
            setTimeout(() => handleVerify(), 300);
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            if (inputRefs.current[index - 1]) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleVerify = async () => {
  if (loading) return;

  const verificationCode = code.join('');

  if (verificationCode.length !== 6) return;

  setLoading(true);

  try {
    const result = await verifyLogin(email, verificationCode);

    if (result.success && result.data.token) {
      await AsyncStorage.setItem('userToken', result.data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(result.data.user));

      router.replace('/');
    } else {
      Alert.alert('Error', result.error || 'Código inválido');
    }
  } catch (error) {
    Alert.alert('Error', error.message || 'Error al verificar');
  } finally {
    setLoading(false);
  }
};


    const handleResendCode = async () => {
        if (!canResend) return;

        setResendLoading(true);
        try {
            console.log('Reenviando código de login para:', email);
            
            const result = await login(email);
            
            if (result.success) {
                Alert.alert(
                    'Código reenviado',
                    result.data.message || 'Se ha enviado un nuevo código a tu email'
                );
                
                setTimer(60);
                setCanResend(false);
                setCode(['', '', '', '', '', '']);
                
                if (inputRefs.current[0]) {
                    inputRefs.current[0].focus();
                }
            } else {
                Alert.alert('Error', result.error);
            }
        } catch (error) {
            console.error('Error al reenviar:', error);
            Alert.alert('Error', error.message || 'Error al procesar la solicitud');
        } finally {
            setResendLoading(false);
        }
    };

    const handleClearCode = () => {
        setCode(['', '', '', '', '', '']);
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={22} color="#007AFF" />
                </Pressable>
                <Text style={styles.headerTitle}>Verificar inicio de sesión</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Feather name="lock" size={80} color="#007AFF" />
                </View>

                <Text style={styles.title}>Verifica tu acceso</Text>
                
                <Text style={styles.subtitle}>
                    Hemos enviado un código de inicio de sesión a:
                </Text>
                
                <Text style={styles.emailText}>{email}</Text>

                <View style={styles.codeContainer}>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <TextInput
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            style={styles.codeInput}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={code[index]}
                            onChangeText={(value) => handleCodeChange(value, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            editable={!loading}
                            selectTextOnFocus
                            textContentType="oneTimeCode"
                            autoComplete="one-time-code"
                        />
                    ))}
                </View>

                <Pressable 
                    style={[styles.verifyButton, loading && styles.buttonDisabled]}
                    onPress={handleVerify}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.verifyButtonText}>Verificar y entrar</Text>
                    )}
                </Pressable>

                <Pressable 
                    style={styles.clearButton}
                    onPress={handleClearCode}
                    disabled={loading}
                >
                    <Text style={styles.clearButtonText}>Limpiar código</Text>
                </Pressable>

                <View style={styles.resendContainer}>
                    <Text style={styles.resendText}>
                        ¿No recibiste el código?{' '}
                        {canResend ? (
                            <Pressable onPress={handleResendCode} disabled={resendLoading}>
                                <Text style={styles.resendLink}>
                                    {resendLoading ? 'Enviando...' : 'Reenviar código'}
                                </Text>
                            </Pressable>
                        ) : (
                            <Text style={styles.timerText}>
                                Reenviar en {timer}s
                            </Text>
                        )}
                    </Text>
                </View>

                <View style={styles.instructionsContainer}>
                    <Feather name="info" size={16} color="#666" />
                    <Text style={styles.instructionsText}>
                        El código de inicio de sesión es válido por 10 minutos. 
                        Revisa tu carpeta de spam si no lo encuentras.
                    </Text>
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
    content: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 30,
        alignItems: 'center',
    },
    iconContainer: {
        width: 120,
        height: 120,
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 5,
    },
    emailText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007AFF',
        marginBottom: 30,
        textAlign: 'center',
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        gap: 10,
    },
    codeInput: {
        width: 50,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ddd',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        color: '#333',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
    },
    verifyButton: {
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
    buttonDisabled: {
        backgroundColor: '#B3D6FF',
    },
    verifyButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    clearButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#f1f2f3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    clearButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    resendContainer: {
        marginTop: 25,
        alignItems: 'center',
    },
    resendText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    resendLink: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '600',
    },
    timerText: {
        fontSize: 14,
        color: '#FF3B30',
        fontWeight: '500',
    },
    instructionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 122, 255, 0.05)',
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
        gap: 10,
    },
    instructionsText: {
        fontSize: 13,
        color: '#666',
        flex: 1,
        lineHeight: 18,
    },
});
