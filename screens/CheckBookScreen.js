import * as React from "react";
import { Text, View, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

function CheckBookScreen({ navigation, barcode, isLoading, setIsLoading }) {
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Clean-up function executed when the screen loses focus
        setIsLoading(true); // Set isLoading to true
      };
    }, []) // Pass an empty dependency array to ensure the effect is only run once when the component mounts
  );
  return (
    <View>
      <Button title="Scan" onPress={() => navigation.navigate("Scanner")} />
      <Text> </Text>
      {!isLoading && (
        <View key={barcode.id}>
          <Text>Book id: {barcode.id}</Text>
          <Text></Text>
          <Text>Book Name: {barcode.name}</Text>
          <Text></Text>
          <Text>Book details: {barcode.details}</Text>
          <Text></Text>
        </View>
      )}
    </View>
  );
}

export default CheckBookScreen;
