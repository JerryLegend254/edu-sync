import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";
import { useToast } from "react-native-toast-notifications";

interface AuthContextType {
  signInWithEmail: (email: string, password: string) => Promise<Session | null>;
  signOut: () => void;
  signUpWithEmail: (email: string, password: string) => Promise<Session | null>;
  user: User | null;
  loading: boolean;
}
const AuthContext = createContext<AuthContextType | null>(null);
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [user, setuser] = useState<User | null>(null);
  supabase.auth.onAuthStateChange((_, session) => {
    if (!session || !session.user) {
      setuser(null);
      return;
    }
    setuser(session.user);
  });
  async function signInWithEmail(email: string, password: string) {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);
    if (error) throw new Error(error.message);
    toast.show("Logged in successfully", { type: "success", placement: "top" });
    return session;
  }

  async function signUpWithEmail(email: string, password: string) {
    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    setLoading(false);
    if (error) throw new Error(error.message);
    if (!session)
      toast.show("Please check your inbox for email verification!", {
        type: "success",
      });
    return session;
  }

  async function signOut() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setuser(null);
    setLoading(false);
    if (error) throw new Error(error.message);
  }
  return (
    <AuthContext.Provider
      value={{ signUpWithEmail, signInWithEmail, signOut, user, loading }}
    >
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
