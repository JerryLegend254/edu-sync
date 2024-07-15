import { useAuth } from "@/providers/AuthProvider";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

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
export default function LoginForm() {
  const [click, setClick] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const { signInWithEmail } = useAuth();
  const toast = useToast();
  function handleSignIn() {
    if (!email || !password) {
      toast.show("Please fill all fields", {
        type: "danger",
        placement: "top",
      });
      return;
    }
    signInWithEmail(email, password).catch((error) => {
      toast.show(error.message, { type: "danger", placement: "top" });
    });
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
      <Text style={styles.title}>Login</Text>
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
          placeholder="password"
          secureTextEntry={!isPasswordShown}
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={"white"}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordShown(!isPasswordShown)}
          style={{
            position: "absolute",
            right: 50,
            top: 77,
          }}
        >
          {isPasswordShown == true ? (
            <Ionicons name="eye" size={24} color={"#ebedf0"} />
          ) : (
            <Ionicons name="eye-off" size={24} color={"#ebedf0"} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.rememberView}>
        <View style={styles.switch}>
          <Switch
            value={click}
            onValueChange={setClick}
            trackColor={{ true: "#4287f5", false: "gray" }}
          />
          <Text style={styles.rememberText}>Remember Me</Text>
        </View>
        <View>
          <Pressable
            onPress={() =>
              Alert.alert(
                "Forgot Password?",
                "To reset password follow this link ",
                [
                  {
                    text: "Reset",
                    onPress: () => router.push("(auth)/forgotpassword"),
                  },
                  {
                    text: "Cancel",
                    onPress: () => console.log("alert closed"),
                  },
                ],
              )
            }
          >
            <Pressable
              onPress={() => // Alert Box to confirm a user wishes to reset their password
                Alert.alert(
                  "Forgot Password",
                  "Are you sure you wish to reset your password? ",
                  [
                    {
                      text: "Reset",
                      onPress: () => router.push("(auth)/resetpassword"),
                    },
                    {
                      text: "Cancel",
                      onPress: () => console.log("alert closed"),
                    },
                  ],
                )
              }
            >
              <Text style={styles.forgetText}>Forgot Password?</Text>
            </Pressable>
          </Pressable>
        </View>
      </View>
      <View style={{ marginHorizontal: 20, width: "78%" }}>
        <Button
          mode="contained"
          buttonColor="#6ba4ff"
          style={{ borderRadius: 8, width: "100%", paddingVertical: 4 }}
          onPress={handleSignIn}
        >
          Login
        </Button>
      </View>

      <Text style={styles.footerText}>
        <Link href="(auth)/sign-up">
          Don't Have Account?<Text style={styles.signup}> Sign Up</Text>
        </Link>
      </Text>
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
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    color: "#fff",
  },
  icon: {
    marginLeft: 10,
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
    color: "white",
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
    marginTop: 16,
    textAlign: "center",
    color: "gray",
  },
  signup: {
    color: "white",
    fontSize: 13,
  },
});
