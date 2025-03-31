import React from "react";
import { View, Text, Button } from "react-native";
import CountdownTimer from "../components/CountdownTimer";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to the Driving School App</Text>
      <CountdownTimer endDate="2025-06-01" />
      <Button title="Mark Attendance" onPress={() => navigation.navigate("Attendance")} />
      <Button title="View Trainers" onPress={() => navigation.navigate("Trainers")} />
      <Button title="Watch Videos" onPress={() => navigation.navigate("Videos")} />
      <Button title="Rate Experience" onPress={() => navigation.navigate("Ratings")} />
    </View>
  );
};

export default HomeScreen;
