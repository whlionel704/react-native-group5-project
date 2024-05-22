import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
//import { BarCodeScanner } from "expo-barcode-scanner";
import { CameraView, Camera } from "expo-camera";

export default function ScannerScreen({ navigation }) {
  //set the component states
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  //Request for the camera permission when the component loads
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); //updated from BarcodeScanner to Camera
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  //Barcode scanner handler function - for now, what it does is it will display the data type of the barcode and content
  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type}, and content: ${data} has been scanned`);
    navigation.navigate("Check Book");
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
