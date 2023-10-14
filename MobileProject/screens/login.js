import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image,TextInput,Button, TouchableOpacity } from 'react-native';

// Redux
import { useSelector, useDispatch } from "react-redux"
import { putUserData } from "../store/actions/myAction";

// Firebase
import firebase from "../database/firebaseDB";


const login = ({navigation}) => {


    // FireBase
    const subjCollection = firebase.firestore().collection("Users");
    // data User
    const [userName , setUserName] = useState('');
    const [userPassword , setUserPassword] = useState('');
    // array User --> Collect in Redux เหมือนจะไม่ใช้แล้ว 
    // const [user, setUser] = useState([]);

    // Validation Form 
    const [showIncorrect, setIncorrect] = useState(false);
    const [showIncorrectPassword, setIncorrectPassword] = useState(false);
    const [showIncorrectEmail, setIncorrectEmail] = useState(false);

    
    
     
    const getCollection = (querySnapshot) => {
        const all_data = [];
        let userFound = false; // เอาไว้เช็กว่า ชื่อผู้ใช้ถูกไหม ถ้าถูกก็ไม่ต้องขึ้นเตือนสีแดง
        querySnapshot.forEach((res) => {
            console.log(res.data());
    
            setIncorrectEmail(true)
            if(res.data().name == userName){ //ชื่อผู้ใช้ถูกแล้ว
                userFound = true;
                if(res.data().password == userPassword){
                    all_data.push(res.data())
                    putDataUser(res.data()) //ส่งไปให้Storeส่วนกลาง หรือ Redux
                    setIncorrectPassword(false)
                    navigation.navigate("tab"); // 
                }
                    else{ //กรณีพาสเวิร์ดผิด
                        setIncorrectPassword(true)
                }
            }
            // setUser(all_data);
        });
        if (userFound) { //กรณีชื่อผู้ใช้ถูกแล้ว ไม่ต้องขึ้นตัวแดง
            setIncorrectEmail(false);
        } 

    };

    const findUser = () => {
        const unsubscribe = subjCollection.onSnapshot(getCollection);
        return () => {
          unsubscribe(); // ในบางกรณี, คุณต้องการทำงานบางอย่าง (เช่น, unsubscribe จาก Firebase, หรือทำความสะอาดข้อมูลที่ไม่ได้ใช้ = Unmounting (การลบ component ออกจาก DOM)
        };
    };

    // Redux
    const dispatch = useDispatch();
    const putDataUser = (item) => {
        dispatch( putUserData(item) ); //ค่าที่ส่งไปเก็บ = = {name: 'เฟรม', password: '1111', email: '64070257@kmitl.ac.th', history: Array(1)}
    };  
 

   

    return (
    <View style={styles.container}>
        <View style={styles.content}>
            <View style={styles.title}>
                <Text style={{color: '#FF724C', fontWeight:"bold", fontSize:25}}>WTH, Bro</Text>
                <Text style={{color: '#FF724C', fontWeight:"bold", fontSize:20}}>แอพลิเคชั่นร้องเรียน</Text>
            </View>
            <View style={{flex:0.4, marginTop:"20%", width:"60%"}}>
                <TextInput
                    style={styles.input}
                    placeholder="ชื่อผู้ใช้"
                    onChangeText={setUserName}
                    value={userName}
                    
                />
                <TextInput
                    style={styles.input}
                    placeholder="รหัสผ่าน"
                    onChangeText={setUserPassword}
                    value={userPassword}
                    secureTextEntry={true}
                    selectionColor={'red'}
                />
                {showIncorrect && (
                    <Text style={styles.validationText}>*ข้อมูลไม่ครบ</Text>
                )}
                {showIncorrectPassword && (
                    <Text style={styles.validationText}>*รหัสผ่านไม่ถูกต้อง</Text>
                )}
                {showIncorrectEmail && (
                    <Text style={styles.validationText}>*ชื่อผู้ใช้ไม่ถูกต้อง</Text>
                )}
            </View>
            <View style={{flex:0.2, width:'60%', marginTop:"15%" }}>
                <Button
                    style={{}}
                    color="#FF724C"
                    title='เข้าสู่ระบบ'
                    onPress={() => { 
                        if(userName == "" || userPassword == ""){
                            console.log("ขาดข้อมูล ชื่อผู้ใช้ หรือ พาสเวิร์ด");
                            setIncorrect(true)
                        }else{
                            setIncorrect(false)
                            findUser();
                        }
                    }}
                />
            </View>
            <View style={{color:'grey', marginTop:"1%" , flex:0.1, justifyContent:'center',alignSelf:'center', flexDirection:'row', width:"100%"}}>
                <Text style={{fontSize:14, color:'grey'}}>ยังไม่มีบัญชีผู้ใช้?</Text>
                <TouchableOpacity onPress={() => {
                    console.log("คลิกเพื่อลงทะเบียนตอนนี้");
                    navigation.navigate("signup");
                }}
                style={{width:'auto'}}
                >
                    <Text style={{color:'grey', fontWeight:'bold' ,textDecorationLine:'underline', marginLeft:"8%", width:"100%", fontSize:14 }}>คลิกเพื่อลงทะเบียนตอนนี้</Text>
                </TouchableOpacity>
            </View>
        </View>

    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 3,
      backgroundColor: '#004466',
      justifyContent:'center'
    },
    content:{
      flex: 0.6,
      justifyContent:'center',
      alignItems:'center',
    },
    input: {
      height: 40,
      margin: 12,
      padding: 10,
      placeholderTextColor: 'gray',
      borderBottomWidth: 1,
      backgroundColor:'white',
      borderRadius: 6,
    },
    validationText: {
        height: "auto",
        marginHorizontal: 12,
        paddingLeft: 10,
        color:'red', 
        borderBottomWidth: 0, 
        fontSize:16, 
        // backgroundColor:'white' 
    },
    title: {
        flex:0.1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Cochin', //ค่อยเปลี่ยน
    },
  
  });


export default login;