import React, {useState, useEffect} from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userget } from './reduxSlices/UserSlice';
import { useDispatch } from 'react-redux';

const SplashScreen = ({navigation}) => {
  
  const [animating, setAnimating] = useState(true);
  const dispatch = useDispatch() 

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('token').then((value) =>{
        if(value === null) {
          navigation.replace('Auth')
        }else{
          navigation.replace('Boot')
        }
      }
      );
    }, 2500);

    dispatch(userget())
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo2.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});