import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import ScannerScreen from "./screens/ScannerScreen";
import HistoryScreen from "./screens/HistoryScreen";
import CheckBookScreen from "./screens/CheckBookScreen";
import { useState } from "react";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CheckBookStack({ barcode, setBarcode, isLoading, setIsLoading }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Book Scanner">
        {(props) => (
          <CheckBookScreen
            {...props}
            barcode={barcode}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Scanner">
        {(props) => (
          <ScannerScreen
            {...props}
            setBarcode={setBarcode}
            setIsLoading={setIsLoading}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const [barcode, setBarcode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Check Book">
          {(props) => (
            <CheckBookStack
              {...props}
              setBarcode={setBarcode}
              barcode={barcode}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="History" component={HistoryScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
