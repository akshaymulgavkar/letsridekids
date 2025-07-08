import { 
    StyleSheet, 
    Dimensions 
} from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import { Fonts } from '../../theme/Fonts';

export const styles = StyleSheet.create({
    searchBox:{
        width:wp('98%'), 
        flexDirection:'row', 
        marginTop:'10%', 
        alignSelf:'center',
    },
    textContainer:{
        flexDirection:'row', 
        width:'100%', 
        alignSelf:'center', 
        margin:10,
        borderWidth:0.01,
        elevation:.2,
        padding:10,
        borderColor:'#64748B31'
    },
    currentLocationText:{
        color:"#26185F", 
        fontFamily:Fonts.Lato400, 
        textAlign:'center',
    },
    leftIcon:{
        alignSelf:'center' 
    }
})
export const GooglePlacesAutocompleteStyles = {
    container: {
      width:'80%'
    },
    textInputContainer: {
      flexDirection: 'row',
    },
    textInput: {
      fontFamily:Fonts.Lato400,
      backgroundColor:'#64748B21',
    },
    poweredContainer: {
      height:"10%",
      flexDirection:'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderColor: '#c8c7cc',
      borderTopWidth: 0.5,
    },
    powered: {
      height:"80%",
      alignSelf:'flex-end',
    },
    listView: {},
    row: {
      padding: 13,
      height: 50,
      flexDirection: 'row',
    },
    separator: {
      height: 0.5,
      backgroundColor: '#c8c7cc',
    },
    description: {
      color:'#000000',
      fontSize:10,
      fontFamily:Fonts.Lato700,
      fontSize:hp('1.5%')
    },
    loader: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      height: 20,
    },
  }

  export const mapstyles = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#181818',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#1b1b1b',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#2c2c2c',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#8a8a8a',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#373737',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#3c3c3c',
        },
      ],
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [
        {
          color: '#4e4e4e',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#3d3d3d',
        },
      ],
    },
  ];