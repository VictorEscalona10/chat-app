import { router } from "expo-router";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { useAuth } from "../src/server/auth";
import {useForm} from "../src/components/hooks/useForm";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Usamos useForm para manejar el estado del formulario
  const { formState, onInputChange, setFormState } = useForm({
    email: "",
  });

  const handleLogin = async () => {
    if (!formState.email.trim()) {
      Alert.alert("Error", "Por favor ingresa tu correo electrónico");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      Alert.alert("Error", "Por favor ingresa un correo electrónico válido");
      return;
    }

    setLoading(true);
    
    try {
      console.log("Enviando solicitud de login para:", formState.email);
      
      const result = await login(formState.email.trim());

      if (result.success) {
        Alert.alert(
          "¡Código enviado!",
          result.data.message || "Código de inicio de sesión enviado a tu email",
          [
            {
              text: "Continuar",
              onPress: () => {
                router.push({
                  pathname: "/verify-login",
                  params: { 
                    email: formState.email.trim() 
                  },
                });
              },
            },
          ]
        );
      } else {
        Alert.alert("Error", result.error);
      }
    } catch (error) {
      console.error("Error en login:", error);
      Alert.alert("Error", error.message || "Error al procesar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormState({
      ...formState,
      [field]: value,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        
        <Text style={styles.headerTitle}>Iniciar sesión</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.iconContainer}>
          <Feather name="log-in" size={80} color="#007AFF" />
        </View>

        <Text style={styles.title}>Bienvenido de nuevo</Text>

        <Text style={styles.subtitle}>
          Ingresa tu correo electrónico para recibir un código de inicio de sesión
        </Text>

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
            value={formState.email}
            onChangeText={(text) => handleInputChange("email", text)}
            editable={!loading}
            autoFocus
          />
        </View>

        <Pressable
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>Enviar código de acceso</Text>
          )}
        </Pressable>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
          <Pressable onPress={() => router.push("/register")} disabled={loading}>
            <Text style={[styles.registerLink, loading && styles.disabledLink]}>
              Regístrate
            </Text>
          </Pressable>
        </View>

        <View style={styles.infoContainer}>
          <Feather name="info" size={16} color="#666" />
          <Text style={styles.infoText}>
            Te enviaremos un código de 6 dígitos a tu email para iniciar sesión. 
            El código es válido por 10 minutos.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 30,
    backgroundColor: "#fff",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f2f3",
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    color: "#333",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 30,
    alignItems: "center",
  },
  iconContainer: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 20,
  },
  iconBox: {
    width: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  loginButtonDisabled: {
    backgroundColor: "#B3D6FF",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 20,
  },
  registerText: {
    fontSize: 14,
    color: "#666",
  },
  registerLink: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  disabledLink: {
    color: "#B3D6FF",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 122, 255, 0.05)",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    gap: 10,
  },
  infoText: {
    fontSize: 13,
    color: "#666",
    flex: 1,
    lineHeight: 18,
  },
});