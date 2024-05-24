import * as React from "react";
import { Text, View, Button, StyleSheet, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

function formatDate(date) {
  const datePart = date.split("T")[0];
  return datePart;
}

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
    <View style={styles.container}>
      <Button title="Scan" onPress={() => navigation.navigate("Scanner")} />
      {!isLoading && (
        <View key={barcode.id} style={styles.bookContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: barcode.image }} style={styles.image} />
          </View>
          <Text style={styles.label}>Book ID:</Text>
          <Text style={styles.value}>{barcode.id}</Text>
          <Text style={styles.label}>Book Name:</Text>
          <Text style={styles.value}>{barcode.name}</Text>
          <Text style={styles.label}>Publish Date:</Text>
          <Text style={styles.value}>{formatDate(barcode.published)}</Text>
          <Text style={styles.label}>Book Details:</Text>
          <Text style={styles.value}>{barcode.details}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  bookContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: "cover",
  },
});

export default CheckBookScreen;
