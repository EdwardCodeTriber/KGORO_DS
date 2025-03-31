import React, { useState } from "react";
import { View, Text } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const RatingComponent = () => {
  const [rating, setRating] = useState(0);

  const submitRating = async (newRating) => {
    setRating(newRating);
    await addDoc(collection(db, "ratings"), { rating: newRating });
  };

  return (
    <View>
      <Text>Rate Your Experience:</Text>
      <AirbnbRating count={5} defaultRating={rating} onFinishRating={submitRating} />
    </View>
  );
};

export default RatingComponent;
