import { Stack, usePathname } from "expo-router";
import AsideBottom from "../src/components/AsideBottom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";


export default function RootLayout() {

  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ELIMINAR
  /* async function clear(){
    await AsyncStorage.clear()
  }

  clear() */

  const hiddenRoutes = [
    "/login",
    "/register",
    "/addContact",
    "/verify-login",
    "/verify",
    "/chatScreen",
  ];

  const shouldShowAside = !hiddenRoutes.includes(pathname);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const [token, userData] = await Promise.all([
          AsyncStorage.getItem("userToken"),
          AsyncStorage.getItem("userData"),
        ]);

        const authenticated = !!(token && userData);
        setIsAuthenticated(authenticated);

        // Redirigir si no está autenticado y no está en una ruta pública
        if (!authenticated && !hiddenRoutes.includes(pathname)) {
          router.replace("/login");
        }

        if (
          authenticated &&
          (pathname === "/login" || pathname === "/register")
        ) {
          router.replace("/");
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        if (!hiddenRoutes.includes(pathname)) {
          router.replace("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname]);

  // Pantalla de carga mientras verifica autenticación
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {shouldShowAside && <AsideBottom />}
    </>
  );
}
