import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'

// import Icon
import { MaterialCommunityIcons } from '@expo/vector-icons'; //ใช้อันนี้เพราะน่ารักดี 
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

import { AntDesign } from '@expo/vector-icons'; 
// เดียวค่อยเปลี่ยนเป็นใช้อันนี้ หน้าProfileผู้ถูกร้องเรียน -->  <AntDesign name="user" size={24} color="black" /> 

// Import Component
import DetailListAdmin from "../../components/adminComponents/DetailListAdmin";

const DetailComplaint = ({route, navigation}) => {

  const data = route.params.data; // {place: 'Zapolyany palace', time: '10:00', date: '10/10/2023', type: 'วาจาไม่สุภาพ', service_point: '', detail: "ใครสอนให้ยิ้มแบบนั้น", nameWin:"Pantalone", numberWin: "09", status: "red", url: ""} 
  const userName = route.params.userName
  return (
    <SafeAreaView style={styles.container}>
      <DetailListAdmin 
        data={data}
        userName={userName}
        navigation={route.params.navigation}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
    
     
});

export default DetailComplaint