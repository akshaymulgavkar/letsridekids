import {StyleSheet, Dimensions, Platform} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Fonts} from '../../theme/Fonts';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    maps: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
    },
    Image:{
      tintColor: '#fff', 
      backgroundColor:'#00000080', 
      margin:'10%', 
      marginTop:50, 
      height:30, 
      width:30
  }
  });
  