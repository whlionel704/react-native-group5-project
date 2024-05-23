import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import QRCode from 'react-native-qrcode-svg';

const HomeScreen = () => {
  const [currentNumber, setCurrentNumber] = useState(1);

  const generateNextNumber = () => {
    if (currentNumber < 100) {
      setCurrentNumber(currentNumber + 1);
    }
  }
  const generatePreviousNumber = () => {
    if (currentNumber > 1 ) {
      setCurrentNumber(currentNumber - 1);
    }
  };
 // Home Screen will genereate QR code for numbers 1 to 100 //
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Book Id: {currentNumber}</Text>
      <QRCode
        value={currentNumber.toString()}
        size={200}
        color="black"
        backgroundColor="white"
      />
      <View style={{ flexDirection:"row", padding:10}}> 
      <Button title="<" onPress={generatePreviousNumber} disabled={currentNumber === 0} />
      <Button title=">" onPress={generateNextNumber} disabled={currentNumber === 100} />
      </View>
    </View>
  )
};


export default HomeScreen;

