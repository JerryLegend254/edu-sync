import { useAuth } from "@/providers/AuthProvider";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Switch,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { useToast } from "react-native-toast-notifications";
import { TouchableOpacity } from "react-native";
import SafeArea from "@/components/safearea/safearea";
import { useRouter } from "expo-router";
import BarContainer from "@/components/bar-container/bar-container";
export default function ProfileSettings() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown]= useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordShown, setIsConfirmPasswordShown]= useState(false);
  const toast = useToast();
  const { signInWithEmail } = useAuth();
  async function handleResetPassword() {
    console.log(email, password, confirmPassword);
    let wsRegex = /^\s+|\s+$/g;
    const replaceemail = email.replaceAll(wsRegex, "");

    if (!email || !password ||!confirmPassword) {
      toast.show("Please fill all fields", {
        type: "danger",
        placement: "top",
      });
      return;
    }
    signInWithEmail(email, password).catch((error) => {
        toast.show(error.message, { type: "danger", placement: "top" });
      });
    
    //const handleForgotPassword = async () => {
      try {
        const { data,error } = await supabase.auth.resetPasswordForEmail(email,
        );
        if (error) {
          console.error('Error sending reset password email:', error);
        } else {
          toast.show("Please check your inbox for a reset password link!", {
            type: "success",
          });
          console.log(data);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
  return (
    <SafeArea>
      <BarContainer
        title="Change Password"
        icon="chevron-back"
        onPress={() => router.back()}
      />
    </SafeArea>
  );
}
}