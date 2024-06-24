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

import { useToast } from "react-native-toast-notifications";
import { TouchableOpacity } from "react-native";
export default function PasswordResetForm() {

/*const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https:///update-password',
  })*/
}