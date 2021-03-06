import React, { useEffect } from 'react';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { activationStyle } from './AuthStyle';
import { Formik } from 'formik';
import * as Yup from "yup";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bankSelector, fetchtoecobank } from '../../reduxSlices/BankSlice';
import { useDispatch, useSelector } from 'react-redux';

const buttonTextStyle = {
    color: 'red'
};

const Payment = ({navigation}) => {
    const { errorMessage, errorHappen, activated } = useSelector(bankSelector);
    const dispatch = useDispatch()

    useEffect(()=>{
        if(activated)
            navigation.replace('SplashScreen')
    },[activated])

    function chunk(str, n) {
        var ret = [];
        var i;
        var len;
    
        for(i = 0, len = str.length; i < len; i += n) {
           ret.push(str.substr(i, n))
        }
        return ret
    };

    const logOut = () =>{
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('isLogin')
        navigation.replace('Auth')
    }

    const paymentSchema = Yup.object().shape({
        cardname: Yup.string()
            .min(1, 'Trop court!')
            .max(50, 'Trop long!')
            .required('Champs requis'),
        
        cardnumber: Yup.string()
            .min(16, 'Format invalide')
            .required('Champs requis'),
    
        expdate : Yup.string()
            .min(1,'Trop court!')
            .max(7,'Maximum 7 caractères')
            .required('Champs requis!'),
    
        cvc : Yup.string()
            .min(1,'Trop court!')
            .max(3,'Maximum 3 caractères')
            .required('Champs requis'),
    });

    return(
        <View style={activationStyle.container}>
            <ProgressSteps label="Paiement" activeStep={1}>
                <ProgressStep label="Inscription">
                    <View style={{ alignItems: 'center' }}></View>
                </ProgressStep>
                <ProgressStep label="Activation" previousBtnDisabled={true} nextBtnTextStyle={buttonTextStyle} previousBtnText={''} finishBtnText={''} >
                    <View style={{ alignItems: 'center' }}>
                        <Text style={activationStyle.titledesc}>Vous devez entrer vos informations bancaire pour activer votre compte Apoloan.</Text>
                        
                        <Formik
                            initialValues={{ 
                                cardname: '', 
                                cardnumber: '', 
                                expdate: '', 
                                cvc : ''
                            }}
                            
                            enableReinitialize={true}
                            validationSchema = {paymentSchema}
                            
                            onSubmit={(values, { setSubmitting }) => {
                                const data = {
                                    Name: values.cardname,
                                    CardNumber: values.cardnumber,
                                    Expiry: values.expdate,
                                    CVV: values.cvc
                                }
                                            
                                console.log(data)
                                dispatch(fetchtoecobank(data))
                            }}>
                            
                            {({ errors ,handleChange, handleBlur, values, handleSubmit, touched, setFieldValue }) => (
                            <>
                            <View style={activationStyle.field}>
                                <Text style={activationStyle.fielddesc}>Nom sur la carte</Text>
                                <TextInput 
                                    placeholder='Kevin De Bruyne'
                                    style={activationStyle.input}
                                    autoCorrect={false}
                                    onChangeText={handleChange('cardname')}
                                    onBlur={handleBlur('cardname')}
                                    value={values.cardname}
                                />
                                {errors.cardname && touched.cardname ? ( <Text style={activationStyle.errormsg} >{errors.cardname}</Text> ) : null}
                            </View>

                            <View style={activationStyle.field}>
                                <Text style={activationStyle.fielddesc}>Numéro de carte</Text>
                                <TextInput 
                                    placeholder='**** **** **** ****'
                                    maxLength={16}
                                    style={activationStyle.input}
                                    autoCorrect={false}
                                    onChangeText={(value)=>{
                                        setFieldValue('cardnumber',value)
                                    }}
                                    value={values.cardnumber}
                                />
                                {errors.cardnumber && touched.cardnumber ? ( <Text style={activationStyle.errormsg} >{errors.cardnumber}</Text> ) : null}
                            </View>

                            <View style={activationStyle.expsec}>
                                <View style={activationStyle.bfield}>
                                    <Text style={activationStyle.fielddesc}>Date d'expiration</Text>
                                    <TextInput 
                                        placeholder='MM/YYYY'
                                        maxLength={7}
                                        style={activationStyle.input}
                                        autoCorrect={false}
                                        onChangeText={handleChange('expdate')}
                                        onBlur={handleBlur('expdate')}
                                        value={values.expdate}
                                    />
                                    {errors.expdate && touched.expdate ? ( <Text style={activationStyle.errormsg} >{errors.expdate}</Text> ) : null}
                                </View>

                                <View style={activationStyle.bfield}>
                                    <Text style={activationStyle.fielddesc}>Code de sécurité</Text>
                                    <TextInput 
                                        placeholder='CVC'
                                        maxLength={3}
                                        style={activationStyle.input}
                                        autoCorrect={false}
                                        onChangeText={handleChange('cvc')}
                                        onBlur={handleBlur('cvc')}
                                        value={values.cvc}
                                    />
                                    {errors.cvc && touched.cvc ? ( <Text style={activationStyle.errormsg} >{errors.cvc}</Text> ) : null}
                                </View>
                            </View>
                            
                            <TouchableOpacity style={activationStyle.activatebtn} onPress={handleSubmit}>
                                <Text style={activationStyle.activatetxt}>Activer votre compte</Text>
                            </TouchableOpacity>
                        </>
                        )}
                        </Formik>
                            {errorHappen && <Text style={{color:'red',fontSize:18,fontWeight:'500',marginTop:12}}>{errorMessage}</Text> }
                            <Text onPress={()=> logOut()} style={{color:'red',fontSize:18,fontWeight:'500',margin:80}}>Déconnection</Text>
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </View>
    )
};

export default Payment;