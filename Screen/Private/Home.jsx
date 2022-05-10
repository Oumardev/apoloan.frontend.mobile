import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Cet écrant sera l'écrant d'acceuil 
 * il affichera :
 * - LIST ANNONCE ['EMPRUNT', 'PRET']
*/
export default function Home({navigation}) {
  
    return (
        <View style={styles.container}>
            <Text>Home page</Text>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems : 'center'
  }

});