import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";

interface AuthContextType {
  signInWithEmail: (email: string, password: string) => Promise<Session | null>;
  signOut: () => void;
  signUpWithEmail: (email: string, password: string) => Promise<Session | null>;
  session: Session | null;
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
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session || !session.user) {
        setSession(null);
        return;
      }
      setSession(session);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);
  async function signInWithEmail(email: string, password: string) {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);
    if (error) throw new Error(error.message);
    toast.show("Logged in successfully", { type: "success", placement: "top" });
    return data.session;
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
    setSession(null);
    setLoading(false);
    if (error) throw new Error(error.message);
  }
  // async function getU() {
  //   const data = await getCurrentUser(user);
  //   console.log(data);
  //   return data;
  // }
  return (
    <AuthContext.Provider
      value={{
        signUpWithEmail,
        signInWithEmail,
        signOut,
        session,
        loading,
      }}
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
