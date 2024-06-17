import { Link, router } from "expo-router";
import React, { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";
import { Button } from "react-native-paper";
export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();
  const { signUpWithEmail } = useAuth();
  async function handleSignUp() {
    console.log(email, password, username);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.show(error.message, { type: "danger" });
    } else {
      toast.show("Please check your inbox for email verification!", {
        type: "success",
      });
      console.log(data);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/waves.jpg")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        resizeMode="contain"
      />

      <Text style={styles.title}>SIGN UP</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={"white"}
        />
        <TextInput
          style={styles.input}
          placeholder="username"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={"white"}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={"white"}
        />
        <TextInput
          style={styles.input}
          placeholder="confirm password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={"white"}
        />
      </View>

      <View style={{ marginHorizontal: 20, width: "78%" }}>
        <Button
          mode="contained"
          buttonColor="#6ba4ff"
          style={{ borderRadius: 12, width: "100%", paddingVertical: 4 }}
          onPress={handleSignUp}
        >
          Login
        </Button>
      </View>

      <Text style={styles.footerText}>
        <Link href="(auth)/sign-in">
          Already have an account?<Text style={styles.signup}> Sign In</Text>
        </Link>
      </Text>
      <Text style={styles.optionsText}>OR LOGIN WITH</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 70,
    flex: 1,
    justifyContent: "center",
  },
  image: {
    height: 160,
    width: 170,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 40,
    color: "white",
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 15,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    color: "#fff",
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
  },
  switch: {
    flexDirection: "row",
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 13,
  },
  forgetText: {
    fontSize: 11,
    color: "white",
  },
  button: {
    backgroundColor: "white",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
  },
  optionsText: {
    textAlign: "center",
    paddingVertical: 10,
    color: "gray",
    fontSize: 13,
    marginBottom: 6,
  },
  mediaIcons: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23,
  },
  icons: {
    width: 40,
    height: 40,
  },
  footerText: {
    textAlign: "center",
    color: "gray",
    marginTop: 16,
  },
  signup: {
    color: "white",
    fontSize: 13,
  },
});
