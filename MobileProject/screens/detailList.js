import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'

// import Icon
import { MaterialCommunityIcons } from '@expo/vector-icons'; //ใช้อันนี้เพราะน่ารักดี 
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 




import { AntDesign } from '@expo/vector-icons'; 
// เดียวค่อยเปลี่ยนเป็นใช้อันนี้ หน้าProfileผู้ถูกร้องเรียน -->  <AntDesign name="user" size={24} color="black" /> 


// Import Component
import DetailList from "../components/DetailList";
 


const detailList = ({route}) => {
  const data = route.params.data; //  data = {date: '12/11/2023', nameWin: 'นายโยคี ขี่รุ้งพุ่งออกมา', numberWin: '05', place: 'ซอยเกกี1', status: 'green', time: "12:12" ,type: "วาจาไม่สุภาพ"}

  return (
    <SafeAreaView style={styles.container}>
      <DetailList  
        data={data}
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

export default detailList