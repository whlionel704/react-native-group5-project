import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { CameraView, Camera } from "expo-camera";

export default function ScannerScreen({
  navigation,
  setBarcode,
  setIsLoading,
  history,
  setHistory,
}) {
  //set the component states
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeNo, setBarcodeNo] = useState(null);

  //Request for the camera permission when the component loads
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); //updated from BarcodeScanner to Camera
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  //Barcode scanner handler function - for now, what it does is it will display the data type of the barcode and content
  const handleBarcodeScanned = async ({ data }) => {
    setScanned(true);
    setBarcodeNo(data);
    try {
      const response = await fetch(
        `https://659d12bb633f9aee7908887d.mockapi.io/api/project5/booklist/${data}`
      );
      const result = await response.json();
      setBarcode(result);
      setHistory([...history, result]);
      navigation.navigate("Book Scanner");
      setIsLoading(false);
    } catch (error) {
      console.log("error", error.message);
      alert(`Error fetching data for barcode: ${data}`);
    }
  };

  //component check if the state for tcamera access has been changed
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  //JSX for the view and the scanner
  return (
    <View style={styles.container}>
      <CameraView // changed from BarcodeScanner to CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr", "pdf417", "code128"] }} // this property allows you to provide what kinds of barcodes/qr codes it can scan
      />
      {scanned && (
        <Button title={"Tap to scan again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
