import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const TrainersScreen = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "trainers"));
      let trainerData = [];
      querySnapshot.forEach((doc) => {
        trainerData.push({ id: doc.id, ...doc.data() });
      });
      setTrainers(trainerData);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meet Our Trainers</Text>
      <FlatList
        data={trainers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.bio}>{item.bio}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: { padding: 10, backgroundColor: "#fff", borderRadius: 10, marginBottom: 10, alignItems: "center" },
  image: { width: 100, height: 100, borderRadius: 50, marginBottom: 5 },
  name: { fontWeight: "bold", fontSize: 16 },
  bio: { fontSize: 14, color: "gray", textAlign: "center" },
});

export default TrainersScreen;
