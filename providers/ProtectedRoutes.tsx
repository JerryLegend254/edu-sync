import { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { useRouter } from "expo-router";
function ProtectedScreensContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      return router.push("(auth)/sign-in");
    }
  }, [user, router]);
  return children;
}

export default ProtectedScreensContextProvider;
