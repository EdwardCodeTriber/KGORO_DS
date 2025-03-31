import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const AttendanceCalendar = () => {
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchAttendance = async () => {
      const querySnapshot = await getDocs(collection(db, "attendance"));
      let attendanceData = {};
      querySnapshot.forEach((doc) => {
        attendanceData[doc.id] = {
          marked: true,
          dotColor: doc.data().status === "present" ? "green" : "red",
        };
      });
      setAttendance(attendanceData);
    };

    fetchAttendance();
  }, []);

  return (
    <View>
      <Calendar markedDates={attendance} />
    </View>
  );
};

export default AttendanceCalendar;
