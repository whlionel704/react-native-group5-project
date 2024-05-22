import * as React from "react";
import { Text, View, Button } from "react-native";

function CheckBookScreen({ navigation }) {
  return (
    <View>
      <Text>check the book</Text>
      <Button title="Scanner" onPress={() => navigation.navigate("Scanner")}>
        scan the barcode
      </Button>
    </View>
  );
}

export default CheckBookScreen;
