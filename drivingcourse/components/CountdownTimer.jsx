import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

const CountdownTimer = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(endDate);
      const diff = end - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft("Training completed!");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      setTimeLeft(`${days} days remaining`);
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <View>
      <Text>{timeLeft}</Text>
    </View>
  );
};

export default CountdownTimer;
