import React from 'react'
import { StyleSheet, Text, View, Image,TextInput,Button, TouchableOpacity } from 'react-native';
import {useState} from 'react';


// firebase
import firebase from "../database/firebaseDB";

// Redux
import { useSelector, useDispatch } from "react-redux"
import { putDocumentName } from "../store/actions/myAction";
import { putUSER_DATA } from "../store/actions/myAction";

const Signup = ({navigation}) => {

    // Redux
    const dispatch = useDispatch();
    const putDataUser = (item, name) => {
        dispatch( putUserData(item) ); //ค่าที่ส่งไปเก็บ = {name: 'เฟรม', password: '1111', email: '64070257@kmitl.ac.th', history: Array(1)}
        dispatch( putDocumentName(name))
    };  

    // Validation Form 
    const [showIncorrect, setIncorrect] = useState(false);
    const [showIncorrectConfirm, setIncorrectConfirm] = useState(false);
    const [showMatchUserNameInDB, setMatchUserNameInDB] = useState(false); // ตรวจสอบชื่อผู้ใช้ห้ามซํ้า

    // ตรวจสอบชื่อผู้ใช้ห้ามซํ้า
    const getCollection = (querySnapshot) => {
        querySnapshot.forEach((res) => {
            console.log(res.id, "res!!!!!!!!!!!!!!!!"); 
            if(res.id == userName){
                setMatchUserNameInDB(true)
            }
             
        })
    }


    // Firebase
    const subjCollection = firebase.firestore().collection("Users");
    const addUSer = () => {
        subjCollection.onSnapshot(getCollection);
    
        
        if(userName=="" || userEmail=="" || userPassword==""){
            setIncorrect(true);
        }
        else if(userPassword != userConfirm){
            setIncorrect(false);
            setIncorrectConfirm(true);
        }
        // else if(userName == ){
        // }
        else{
            setIncorrectConfirm(false);
            setMatchUserNameInDB(false)
            // ให้ชื่อ document ตามชื่อ username

            subjCollection.doc(userName).set({
                email: userEmail,
                history: [],
                name: userName,
                password:userPassword,
            }).then(() => {
                // ส่งไปให้Storeส่วนกลาง หรือ Redux
                dispatch( putDocumentName(userName))
                dispatch( putUSER_DATA({email: userEmail,history: [],name: userName,password:userPassword}) )
                navigation.navigate("tab");
            }).catch(() => {
                alert("ยูเซอร์ไม่ถูก Add");
            })
        }

    };



    const [userName , setUserName] = useState('');
    const [userEmail , setUserEmail] = useState('');
    const [userPassword , setUserPassword] = useState('');
    const [userConfirm, setUserConfirm] = useState('')
     return (
    <View style={styles.container}>
       
            <View style={styles.title}>
                <Text style={styles.signupLargeText}>WTH, Bro</Text>
                <Text style={{color: '#004466', fontWeight:"bold", fontSize:20}}>ลงทะเบียน</Text>
            </View>
            {/* View ด้านล่าง คือไอกล่องส้มจางที่มีปัญหา  */}
            <View style={{height:"auto", width: '80%', borderRadius:10,  marginTop:"10%" ,backgroundColor:'#ed8e73'}}>
                <TextInput
                    style={styles.input}
                    placeholder="ชื่อผู้ใช้:"
                    onChangeText={setUserName}
                    value={userName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="อีเมล:"
                    onChangeText={setUserEmail}
                    value={userEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="รหัสผ่าน:"
                    onChangeText={setUserPassword}
                    value={userPassword}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder="ยืนยันรหัสผ่าน:"
                    onChangeText={setUserConfirm}
                    value={userConfirm}
                    secureTextEntry={true}
                />
                {showIncorrect && (
                    <Text style={styles.validationText}>*กรอกข้อมูลให้ครบ</Text>
                )}
                {showIncorrectConfirm && (
                    <Text style={styles.validationText}>*ข้อมูลรหัสผ่านไม่ตรงกัน</Text>
                )}
                {showMatchUserNameInDB && (
                    <Text style={styles.validationText}>*ชื่อผู้ใช้นี้ถูกใช้แล้ว</Text>
                )}
            </View>
            {/* <Text> </Text> */}
            <View style={{padding:8, height:'auto' ,backgroundColor:'white', width:'60%',marginTop:"10%", borderRadius:50,backgroundColor:'#004466',  }}>
                <TouchableOpacity style={{ justifyContent:'center', alignSelf:'center', }} onPress={() => {addUSer();}}>
                    <Text style={{fontSize:16, color:'white' }}>ลงทะเบียน</Text>
                </TouchableOpacity>
            </View>
            <View style={{color:'grey', marginTop:"2%" , height:'auto', justifyContent:'center',alignSelf:'center', flexDirection:'row', width:"100%"}}>
                <Text style={{fontSize:14, color:'grey'}}>มีบัญชีแล้ว?</Text>
                <TouchableOpacity onPress={() => { navigation.navigate("login");}} style={{width:'auto'}}>
                    <Text style={{color:'grey', fontWeight:'bold' ,textDecorationLine:'underline', marginLeft:"8%", width:"100%", fontSize:14 }}>คลิกเพื่อเข้าสู่ระบบตอนนี้</Text>
                </TouchableOpacity>
            </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 4,
      backgroundColor: '#FF724C',
      justifyContent:'center',
      alignItems:'center'
      
    },
    content:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'violet'
    },
    input: {
      height: 40,
      margin: 12,
      padding: 10,
      placeholderTextColor: 'gray',
      borderBottomWidth: 1,
      borderColor:"#004466",
      color:'#004466',
      fontWeight:"bold"
    },
    title: {
        // WTH BRO
        height:'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:"10%"
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
    signupLargeText:{
        color: '#004466',
        fontWeight:"bold", 
        fontSize:25,
        // fontFamily:'Lobster-Regular'

    }
  
  });


export default Signup;