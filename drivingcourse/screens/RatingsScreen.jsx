import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const RatingsScreen = () => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchAverageRating();
  }, []);

  const fetchAverageRating = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ratings"));
      let total = 0;
      let count = querySnapshot.size;

      querySnapshot.forEach((doc) => {
        total += doc.data().rating;
      });

      setAverageRating(count > 0 ? (total / count).toFixed(1) : "No ratings yet");
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  const submitRating = async (newRating) => {
    try {
      await addDoc(collection(db, "ratings"), { rating: newRating });
      Alert.alert("Success", "Thank you for your rating!");
      fetchAverageRating(); // Refresh the average rating
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rate Your Experience</Text>
      <AirbnbRating count={5} defaultRating={0} onFinishRating={submitRating} />
      <Text style={styles.average}>Average Rating: {averageRating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  average: { fontSize: 16, marginTop: 20, textAlign: "center" },
});

export default RatingsScreen;
