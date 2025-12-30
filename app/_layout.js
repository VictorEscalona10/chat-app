import { Stack } from "expo-router";
import AsideBottom from "../src/components/AsideBottom";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <AsideBottom />
    </>
  );
}
