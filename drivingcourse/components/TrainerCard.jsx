import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const TrainerCard = ({ trainer }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: trainer.image }} style={styles.image} />
      <Text style={styles.name}>{trainer.name}</Text>
      <Text style={styles.bio}>{trainer.bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 10, backgroundColor: "#fff", borderRadius: 10, margin: 5 },
  image: { width: 80, height: 80, borderRadius: 40 },
  name: { fontWeight: "bold", fontSize: 16 },
  bio: { fontSize: 14, color: "gray" },
});

export default TrainerCard;
