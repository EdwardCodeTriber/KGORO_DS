import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const VideosScreen = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "videos"));
      let videoData = [];
      querySnapshot.forEach((doc) => {
        videoData.push({ id: doc.id, ...doc.data() });
      });
      setVideos(videoData);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Driving Lesson Videos</Text>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.videoContainer}>
            <YoutubePlayer height={200} videoId={item.videoId} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  videoContainer: { marginBottom: 20 },
});

export default VideosScreen;
