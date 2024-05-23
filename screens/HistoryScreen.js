import * as React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const HistoryScreen = ({ history }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Book ID: {item.id}</Text>
      <Text>Book Name: {item.name}</Text>
      <Text>Publish Date: {item.published}</Text>
      <Text>Book details: {item.details}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
  },
});

export default HistoryScreen;