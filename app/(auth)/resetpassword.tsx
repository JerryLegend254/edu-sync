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
export default function PasswordResetForm() {
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
  }
  
  return(
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
      <Text style={styles.title}>Forgot password</Text>
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
       <View style={styles.inputView}>
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
          onPress={() =>setIsPasswordShown(!isPasswordShown)}
          style={{
            position: "absolute",
            right: 50,
            top: 12
          }}
          >
          {
            isPasswordShown == true ? (
              <Ionicons name="eye" size={24} color={"#ebedf0"}/>
            ) :(
              <Ionicons name="eye-off" size={24} color={"#ebedf0"}/>
            )
          }
          </TouchableOpacity>
          </View>
        <View style={styles.inputView
          
        }>
        <TextInput
          style={styles.input}
          placeholder="confirm password"
          secureTextEntry={!isConfirmPasswordShown}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={"white"}
        />
        <TouchableOpacity
          onPress={() =>setIsConfirmPasswordShown(!isConfirmPasswordShown)}
          style={{
            position: "absolute",
            right: 50,
            top: 12
          }}
          >
          {
            isConfirmPasswordShown == true ? (
              <Ionicons name="eye" size={24} color={"#ebedf0"}/>
            ) :(
              <Ionicons name="eye-off" size={24} color={"#ebedf0"}/>
            )
          }
          </TouchableOpacity>
        </View>
        </View>
      <View style={{ marginHorizontal: 20, width: "68%" }}>
        <Button
          mode="contained"
          buttonColor="#6ba4ff"
          style={{ borderRadius: 12, width: "100%", paddingVertical: 4 }}
          onPress={handleResetPassword}
          >
          Reset
        </Button>
      </View>
      </SafeAreaView>
    );
  };
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
  password:{
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 15,
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 15,
  },
  input: {
    height: 50,
    width: "100%",
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
