import { createContext, useContext } from "react";

interface AuthContextType {
  signIn: () => void;
  signOut: () => void;
  signUp: () => void;
  user: User | null;
}
const AuthContext = createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
  user: null,
});
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  function signIn() {}
  function signOut() {}
  function signUp() {}
  const user = null;

  return (
    <AuthContext.Provider value={{ signUp, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
