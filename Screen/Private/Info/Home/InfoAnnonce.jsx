import React from "react";
import { Text, View, TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons, Feather, MaterialIcons  } from 'react-native-vector-icons';
import { infoStyle } from '../../styles.home/info.style'


const InfoAnnonce = ({route, navigation}) =>{
    const { data } = route.params;

    function nFormatter(num) {
        if (num >= 1000000000) {
           return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
           return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
           return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
    }

    const showSubmitButton = 
        data.type == "EMPRUNT" ? 
        (
            <TouchableOpacity style={infoStyle.submit}>
                <Text style={{...infoStyle.detailsTarget, color: 'white', marginRight: 10}}>Contribuer</Text>
                <MaterialIcons color={'white'} size={22} name={'payment'} />
            </TouchableOpacity>
        )
        :
        (
            <TouchableOpacity style={infoStyle.submit}>
                <Text style={{...infoStyle.detailsTarget, color: 'white', marginRight: 10}}>BENEFICIER</Text>
                <MaterialCommunityIcons color={'white'} size={22} name={'human-handsup'} />
            </TouchableOpacity>
        )

    return(
        <View style={infoStyle.container}>
            <View style={infoStyle.emptySection}></View>
            <View style={infoStyle.whiteSection}>
                
                <View style={infoStyle.price}>
                    <Text style={infoStyle.priceText}>{nFormatter(data.montant)} F</Text>
                </View>
                
                <View>
                    <View style={infoStyle.details}>
                        <Text style={infoStyle.detailsText}>Montant</Text>
                        <Text style={infoStyle.detailsTarget}>{nFormatter(data.montant)}  <MaterialIcons color={'black'} size={22} name={'attach-money'} /></Text>
                    </View>

                    <View style={infoStyle.details}>
                        <Text style={infoStyle.detailsText}>Pourcentage</Text>
                        <Text style={infoStyle.detailsTarget}>{data.pourcentage} <Feather color={'black'} size={21} name={'percent'} /></Text>
                    </View>

                    <View style={infoStyle.details}>
                        <Text style={infoStyle.detailsText}>Duree</Text>
                        <Text style={infoStyle.detailsTarget}>{data.duree} <MaterialCommunityIcons color={'black'} size={22} name={'timeline-clock'} /></Text>
                    </View>
                </View>
                {showSubmitButton}
            </View>
        </View>
    )
}
export default InfoAnnonce