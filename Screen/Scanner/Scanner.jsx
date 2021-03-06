import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";

export default function Scanner({route, navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [errormsg, setErrorMsg] = useState(null)
    const { proposition } = route.params;
    
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const handleBarCodeScanned = async ({ type, data }) => {
      setScanned(true);
      const socket = io("http://192.168.1.103:1000")
      const token = await AsyncStorage.getItem('token')

      socket.emit('qrcode',{qr:data, proposition:proposition, token:token})
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <View style={styles.container}>
        <View style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
          {errormsg && <Text style={{color:'red',fontSize:20}}>{errormsg}</Text>}
          <Text style={{fontWeight: '500',fontSize:24,color:'red', textAlign:'center'}}>Scanner le QrCode pour accepter la proposition</Text>
          <Text style={{fontWeight: '400',fontSize:17, textAlign:'center'}}>Allez sur le site: https://api.oumardev.com/apoloanapi/qrcode</Text>
        </View>
       
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{width:500, height:500}}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });
  
  // sudo sysctl fs.inotify.max_user_watches=524288