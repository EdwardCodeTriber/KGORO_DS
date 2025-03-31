import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (phone.length < 10 || password.length < 4) {
      Alert.alert("Error", "Invalid credentials.");
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "users", phone));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.password === password) {
          navigation.replace("Home", { phone }); // Pass phone to track user data
        } else {
          Alert.alert("Error", "Incorrect password.");
        }
      } else {
        Alert.alert("Error", "User not found.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", "Failed to log in.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />
      <TextInput
        placeholder="4-Digit Password"
        keyboardType="numeric"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        maxLength={4}
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
});

export default LoginScreen;
