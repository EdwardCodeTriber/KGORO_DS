import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

const AttendanceScreen = () => {
  const [attendance, setAttendance] = useState({});
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  useEffect(() => {
    fetchAttendance();
    fetchAttendancebyid();
  }, []);

  const fetchAttendance = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "attendance"));
      let attendanceData = {};
      querySnapshot.forEach((doc) => {
        attendanceData[doc.id] = {
          selected: true,
          selectedColor: doc.data().status === "present" ? "green" : "red",
        };
      });
      setAttendance(attendanceData);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  /// by id
  const fetchAttendancebyid = async () => {
    if (!phone) return;
  
    try {
      const userDoc = await getDoc(doc(db, "users", phone));
      if (userDoc.exists()) {
        setAttendance(userDoc.data().attendance || {});
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };
  

  const markAttendance = async () => {
    try {
      await setDoc(doc(db, "attendance", today), { status: "present" });
      Alert.alert("Success", "Attendance marked successfully!");
      fetchAttendance(); // Refresh calendar after marking attendance
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attendance Tracker</Text>
      <Calendar markedDates={attendance} />
      <Button title="Mark Present" onPress={markAttendance} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});

export default AttendanceScreen;
