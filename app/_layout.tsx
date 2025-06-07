import { AuthProvider } from "@/contexts/AuthContext";
import { ProductProvider } from "@/contexts/ProductsContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <AuthProvider>
    <ProductProvider>
      <Stack screenOptions={{
        headerShown:false,
      }} />
    </ProductProvider>
  </AuthProvider>;
}
