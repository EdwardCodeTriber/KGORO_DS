import React from "react";
import { View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const YouTubePlayer = ({ videoId }) => {
  return (
    <View style={{ margin: 10 }}>
      <YoutubePlayer height={200} videoId={videoId} />
    </View>
  );
};

export default YouTubePlayer;
