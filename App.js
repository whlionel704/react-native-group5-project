import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import ScannerScreen from "./screens/ScannerScreen";
import HistoryScreen from "./screens/HistoryScreen";
import CheckBookScreen from "./screens/CheckBookScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CheckBookStack({
  barcode,
  setBarcode,
  isLoading,
  setIsLoading,
  history,
  setHistory,
}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Book Scanner">
        {(props) => (
          <CheckBookScreen
            {...props}
            barcode={barcode}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setHistory={setHistory}
            history={history}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Scanner">
        {(props) => (
          <ScannerScreen
            {...props}
            setBarcode={setBarcode}
            setIsLoading={setIsLoading}
            setHistory={setHistory}
            history={history}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const [barcode, setBarcode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState([]);

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
              history={history}
              setHistory={setHistory}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="History">
          {(props) => <HistoryScreen {...props} history={history} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
