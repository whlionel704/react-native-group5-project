import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, Image } from "react-native";

import QRCode from 'react-native-qrcode-svg';


const HomeScreen = () => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [bookName, setBookName] = useState("");
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    // write your code here, it's like componentWillMount
    getBookName("1")
}, [])

 const  getBookName = async(bookNumberCurrent) => {
  setLoading(true);
 
  console.log("data in home screen", bookNumberCurrent);

  try {
    const response = await fetch(
      `https://659d12bb633f9aee7908887d.mockapi.io/api/project5/booklist/${bookNumberCurrent}`
    );
    const result = await response.json();
    setBookName(result.name);
    

    // console.log("Result in home", result.name);
    // console.log("Result in home", result.image);
    // console.log("Result in home", result);
  } catch (error) {
    console.log("error", error.message);
    alert(`Error fetching data for barcode: ${bookNumberCurrent}`);
  } finally {
    setLoading(false);
  }
};


  const generateNextNumber = () => {
    if (currentNumber < 100) {
      //setCurrentNumber((prevState) => prevState + 1)
       setCurrentNumber(currentNumber + 1);
       getBookName(currentNumber + 1);
    }
  }
  const generatePreviousNumber = () => {
    if (currentNumber > 1 ) {
       setCurrentNumber(currentNumber - 1);
      //setCurrentNumber((prevState) => prevState - 1)
      getBookName(currentNumber - 1);

    }
  };
 // Home Screen will genereate QR code for numbers 1 to 100 ..//
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Scan the below QR to get Book Details</Text>
      {loading && <ActivityIndicator size="large" color="#0000ff"/> }
      {!loading && <Text style={{ marginBottom: 20 }}>Book name: {currentNumber} {bookName}</Text>}
      {!loading && <QRCode
        value={currentNumber.toString()}
        size={200}
        color="black"
        backgroundColor="white"
       
      />}
      
      <View style={{ flexDirection:"row", padding:10}}> 
      <Button title="<" onPress={generatePreviousNumber} disabled={currentNumber === 0} />
      <Button title=">" onPress={generateNextNumber} disabled={currentNumber === 100} />
      </View>
    </View>
  )
};




export default HomeScreen;