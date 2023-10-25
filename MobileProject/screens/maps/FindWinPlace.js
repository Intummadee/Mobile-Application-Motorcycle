import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";


import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


// Firebase
import firebase from "../../database/firebaseDB";

// Import Icon
import { Ionicons } from '@expo/vector-icons'; 


const FindWinPlace = ({ navigation }) => {

  //พิกัดล็อกจอ default
  const [mapRegion, setmapRegion] = useState({
    latitude: 13.729934564820017,
    longitude: 100.77823520369489,
    latitudeDelta: 0.00461,
    longitudeDelta: 0.0021,
  });

  const userLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied just like your feeling for him ;)')
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    setmapRegion({
      latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
    });
    console.log(location.coords.latitude, location.coords.longitude)
  }
  useEffect(() => {
    userLocation();
  }, []);

  const [point , setPoint] = useState("");



  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: "stretch", height: "100%" }}
        region={mapRegion}
      >
        
        <Marker coordinate={{ latitude: 13.72867889245462, longitude: 100.77810841657259 }} title="วินวิทยา" onPress={()=>{setPoint("วินวิทยา")}} />
        <Marker coordinate={{ latitude: 13.727983692875426, longitude: 100.77757211311763 }} title="วินสี่แยก" onPress={()=>{setPoint("วินสี่แยก")}}/>
        <Marker coordinate={{ latitude: 13.728072751164596, longitude: 100.77321225463284 }} title="วินหน้าวิศวะ" onPress={()=>{setPoint("วินหน้าวิศวะ")}} />
        <Marker coordinate={{ latitude: 13.727950020561163, longitude: 100.7706408695449 }} title="วินเกกี 1"  onPress={()=>{setPoint("วินเกกี 1")}} />
        <Marker coordinate={{ latitude: 13.727978898357103, longitude: 100.77018010113943 }} title="วินเกกี 3" onPress={()=>{setPoint("วินเกกี 3")}} />
        <Marker coordinate={{ latitude: 13.727923144677993, longitude: 100.76640170651164 }} title="วินวิดวะการ์เด้น" onPress={()=>{setPoint("วินวิดวะการ์เด้น")}} />
        <Marker coordinate={{ latitude: 13.727898608280542, longitude: 100.76441474983417 }} title="วิน RNP" onPress={()=>{setPoint("วิน RNP")}} />
        <Marker coordinate={{ latitude: 13.721944366544147, longitude: 100.76887698325939 }} title="วินวัดปลูก" onPress={()=>{setPoint("วินวัดปลูก")}} />
        <Marker coordinate={{ latitude: 13.72290424568357, longitude: 100.78030723198673 }} title="วิน FBT" onPress={()=>{setPoint("วิน FBT")}} />
        <Marker coordinate={{ latitude: 13.726569543185796, longitude: 100.77818240236152 }} title="วินหน้าถาปัต" onPress={()=>{setPoint("วินหน้าถาปัต")}} />
      </MapView>
      <TouchableOpacity
        style={{position:'absolute', bottom:70, right:20,}}
        onPress={()=>{
          // จะได้ titleมา ในตัวแปรชื่อ point = วินหน้าวิศวะ
          navigation.navigate("listWin", {title: point})
        }}
      >
        <Ionicons name="navigate-circle-outline" size={50} color="black" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default FindWinPlace;