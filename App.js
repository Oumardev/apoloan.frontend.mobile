import React from 'react';
import 'react-native-gesture-handler';
import { View, Text, TextInput , StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {MaterialCommunityIcons, AntDesign, MaterialIcons,FontAwesome,Ionicons, Feather } from 'react-native-vector-icons';
import store from './store'
import { Provider } from 'react-redux';
import SplashScreen from './SplashScreen';
import Register from './Screen/Auth/Register';
import Login from './Screen/Auth/Login'
import Historical from './Screen/Private/Historical'
import Home from './Screen/Private/Home'
import Post from './Screen/Private/Post'
import Profile from './Screen/Private/Profile'
import MakeAnnonce from './Screen/Private/Modal/Home/MakeAnnonce';
import EditProfile from './Screen/Private/Modal/Profile/EditProfile';
import ListProposition from './Screen/Private/Modal/Post/ListProposition';
import EditPassword from './Screen/Private/Modal/Profile/EditPassword';
import EditAnnonce from './Screen/Private/Modal/Post/EditAnnonce';
import Refil from './Screen/Private/Modal/Profile/Refil';
import Scanner from './Screen/Scanner/Scanner';
import Versement from "./Screen/Private/Modal/Historique/Versement"
import Rembourssement from "./Screen/Private/Modal/Historique/Rembourssement"
import Payment from "./Screen/Auth/Payment"
import Boot from './bootScreen/Boot'
import SaveSignature from './Screen/Private/Modal/Home/SaveSignature'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const PrivateScreen = ({navigation}) =>{
    
  return (
    <Tab.Navigator screenOptions={{ 
      tabBarShowLabel: false,
      tabBarStyle: {
        paddingVertical: Platform.OS === 'ios' ? 10 : 0,
        height: 78,
      }
      }
    }>
       
       <Tab.Screen name="Home" component={Home} 
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
          tabBarIcon: ({focused}) =>{
            return(
            <View style={{alignItems : 'center', justifyContent : 'center'}}>
              <AntDesign name={'home'} size={30} color={focused ? 'blue' : 'gray'} />
              <Text style={{color :  focused ? 'blue' : 'gray', fontSize : 15, fontWeight : '500'}} >Acceuil</Text>
            </View>)
          },
          headerTitle : ()=>(
            <Text style={{color : 'white', fontSize: 20, fontWeight : '500'}}>Acceuil</Text>
          ),
          headerStyle :{
            backgroundColor : 'black',
            height : 86
          }
        }}
      />

      <Tab.Screen name="Historical" component={Historical} 
        options={{
          tabBarIcon: ({focused}) =>{
            return(
            <View style={{alignItems : 'center', justifyContent : 'center'}}>
              <MaterialCommunityIcons name={'history'} size={25} color={focused ? 'blue' : 'gray'} />
              <Text style={{color :  focused ? 'blue' : 'gray', fontSize : 15, fontWeight : '500'}} >Historique</Text>
            </View>)
          },
          headerTitle : ()=>(
            <Text style={{color : 'white', fontSize: 20, fontWeight : '500'}}>Historique</Text>
          ),
          headerStyle :{
            backgroundColor : 'black',
            height : 86
          }
        }}
      />

      <Tab.Screen name="Add" component={MakeAnnonce} 
        options={{
          tabBarIcon: ({focused}) =>{
            return(
            <View style={{alignItems : 'center', justifyContent : 'center'}}>
              <Ionicons name={'add-circle-sharp'} size={35} color={'green'} />
            </View>)
          },
          headerTitle : ()=>(
            <Text style={{color : 'white', fontSize: 20, fontWeight : '500'}}>Faire une annonce</Text>
          ),
          headerStyle :{
            backgroundColor : 'black',
            height : 86
          }
        }}
      />

      <Tab.Screen name="Post" component={Post} 
        options={{
          tabBarIcon: ({focused}) =>{
            return(
            <View style={{alignItems : 'center', justifyContent : 'center'}}>
              <Feather name={'send'} size={25} color={focused ? 'blue' : 'gray'} />
              <Text style={{color :  focused ? 'blue' : 'gray', fontSize : 15, fontWeight : '500'}} >Poste</Text>
            </View>)
          },
          headerTitle : ()=>(
            <Text style={{color : 'white', fontSize: 20, fontWeight : '500'}}>Poste</Text>
          ),
          headerStyle :{
            backgroundColor : 'black',
            height : 86
          }
        }}
      />

      <Tab.Screen name="Profile" component={Profile} 
        options={{
          tabBarIcon: ({focused}) =>{
            return(
            <View style={{alignItems : 'center', justifyContent : 'center'}}>
              <FontAwesome name={'user'} size={25} color={focused ? 'blue' : 'gray'} />
              <Text style={{color :  focused ? 'blue' : 'gray', fontSize : 15, fontWeight : '500'}} >Profile</Text>
            </View>)
          },
          headerTitle : ()=>(
            <Text style={{color : 'black', fontSize: 20, fontWeight : '500'}}>Profile</Text>
          ),
          headerStyle :{
            backgroundColor : 'white',
            height : 86
          }
        }}
      />

    </Tab.Navigator>
  )
}

const headerLogin = {
  headerShown: false
}

const Auth = ({navigation}) =>{
  return(
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name = "login"
        component = {Login}
        options = {headerLogin}
      />

      <Stack.Screen
        name = "register"
        component = {Register}
        options={{
          headerShown:false,
          headerTitle: "",
          headerLeft: () =>(
            <MaterialIcons onPress={() => navigation.navigate('login')} name="arrow-back-ios" size={25} style={{paddingLeft : 12}} />
          )
        }}
      />
    </Stack.Navigator>
  )
}

const headerMakeAnnonce = {
  headerShown: true,
  headerTitle: () => <Text style={{fontSize:25, fontWeight:'600', color: 'white'}}>Faire une annonce</Text>
  ,
  headerLeft: () =>(
    <MaterialIcons name="arrow-back-ios" color={'white'} size={25} style={{paddingLeft : 12}} />
  ),
  headerStyle :{
    backgroundColor : 'black'
  }
}

const headerEditProfile = {
  headerShown: true,
  headerTitle: () => <Text style={{fontSize:25, fontWeight:'600', color: 'black'}}>Modifier profile</Text>
  ,
  headerLeft: () =>(
    <MaterialIcons name="arrow-back-ios" color={'black'} size={25} style={{paddingLeft : 12}} />
  ),
  headerStyle :{
    backgroundColor : 'white'
  }
}

const headerEditAnnonce = {
  headerShown: true,
  headerTitle: () => <Text style={{fontSize:25, fontWeight:'600', color: 'black'}}>Modifier annonce</Text>
  ,
  headerLeft: () =>(
    <MaterialIcons name="arrow-back-ios" color={'black'} size={25} style={{paddingLeft : 12}} />
  ),
  headerStyle :{
    backgroundColor : 'white'
  }
}

const headerRefil = {
  headerShown: true,
  headerTitle: () => <Text style={{fontSize:25, fontWeight:'600', color: 'black'}}>Rechargement</Text>
  ,
  headerLeft: () =>(
    <MaterialIcons name="arrow-back-ios" color={'black'} size={25} style={{paddingLeft : 12}} />
  ),
  headerStyle :{
    backgroundColor : 'white'
  }
}

const headerInfoHistorique = {
  headerShown: true,
  headerTitle: () => <Text style={{fontSize:25, fontWeight:'600', color: 'white'}}>Remboursser</Text>
  ,
  headerLeft: () =>(
    <MaterialIcons name="arrow-back-ios" color={'white'} size={25} style={{paddingLeft : 12}} />
  ),
  headerStyle :{
    backgroundColor : 'black'
  }
}

const headerScanner = {
  headerShown: true,
  headerTitle: () => <Text style={{fontSize:25, fontWeight:'600', color: 'white'}}>Scanner</Text>
  ,
  headerLeft: () =>(
    <MaterialIcons name="arrow-back-ios" color={'white'} size={25} style={{paddingLeft : 12}} />
  ),
  headerStyle :{
    backgroundColor : 'black'
  }
}

const headerListProposition = {
  headerShown: true,
  headerTitle: () => <Text style={{fontSize:25, fontWeight:'600', color: 'white'}}>Propositions</Text>
  ,
  headerLeft: () =>(
    <MaterialIcons name="arrow-back-ios" color={'white'} size={25} style={{paddingLeft : 12}} />
  ),
  headerStyle :{
    backgroundColor : 'black'
  }
}

const headerVersement = {
  headerShown: true,
  headerTitle: () => <Text style={{fontSize:25, fontWeight:'600', color: 'white'}}>Versement</Text>
  ,
  headerLeft: () =>(
    <MaterialIcons name="arrow-back-ios" color={'white'} size={25} style={{paddingLeft : 12}} />
  ),
  headerStyle :{
    backgroundColor : 'black'
  }
}

const headerRemboussement = {
  headerShown: true,
  headerTitle: () => <Text style={{fontSize:25, fontWeight:'600', color: 'white'}}>Rembourssement</Text>
  ,
  headerLeft: () =>(
    <MaterialIcons name="arrow-back-ios" color={'white'} size={25} style={{paddingLeft : 12}} />
  ),
  headerStyle :{
    backgroundColor : 'black'
  }
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
            <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}} />
            <Stack.Screen name="PrivateScreen" component={PrivateScreen} options={{headerShown: false}} />

            {/** Info screen : makeAnnonce */}
            <Stack.Screen name="MakeAnnonce" component={MakeAnnonce} options={headerMakeAnnonce} />
            {/** Info screen : EditProfile */}
            <Stack.Screen name="EditProfile" component={EditProfile} options={headerEditProfile} />
            {/** Info screen : EditPassword */}
            <Stack.Screen name="EditPassword" component={EditPassword} options={headerEditProfile} />
             {/** Info screen : EditAnnonce */}
             <Stack.Screen name="EditAnnonce" component={EditAnnonce} options={headerEditAnnonce} />
            {/** Info screen : ListProposition */}
            <Stack.Screen name="ListProposition" component={ListProposition} options={headerListProposition} />
            {/** Info screen : Refil */}
            <Stack.Screen name="Refil" component={Refil} options={headerRefil} />
            {/** Info screen : Payment */}
            <Stack.Screen name="Payment" options={{headerShown : false}} component={Payment}/>
            {/** Info screen : Boot */}
            <Stack.Screen name="Boot" options={{headerShown : false}} component={Boot}/>
            {/** Info screen : Scanner */}
            <Stack.Screen name="Scanner" options={{headerShown : false}} component={Scanner}/>
            {/** Info screen : SaveSignature */}
             <Stack.Screen name="SaveSignature" options={{headerShown : false}} component={SaveSignature}/>
            {/** Info screen : Versement */}
            <Stack.Screen name="Versement" options={headerVersement} component={Versement}/>
            {/** Info screen : Rembourssement */}
            <Stack.Screen name="Rembourssement" options={headerRemboussement} component={Rembourssement}/>

        </Stack.Navigator>
      </NavigationContainer>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
