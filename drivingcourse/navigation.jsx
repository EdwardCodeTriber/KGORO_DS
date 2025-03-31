import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import AttendanceScreen from "./screens/AttendanceScreen";
import TrainersScreen from "./screens/TrainersScreen";
// import VideosScreen from "./screens/VideosScreen";
import RatingsScreen from "./screens/RatingsScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
        <Stack.Screen name="Trainers" component={TrainersScreen} />
        {/* <Stack.Screen name="Videos" component={VideosScreen} /> */}
        <Stack.Screen name="Ratings" component={RatingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
