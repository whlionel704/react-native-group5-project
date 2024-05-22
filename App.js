import * as React from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import ScannerScreen from "./screens/ScannerScreen";
import HistoryScreen from "./screens/HistoryScreen";
import CheckBookScreen from "./screens/CheckBookScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CheckBookStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Check Book" component={CheckBookScreen} />
      <Stack.Screen name="Scanner" component={ScannerScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [barcode, setBarcode] = useState(null);
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Check Book" component={CheckBookStack} />
        <Drawer.Screen name="History" component={HistoryScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
