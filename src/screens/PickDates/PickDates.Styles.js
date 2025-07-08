import {Fonts} from '../../theme/Fonts';
import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  monthFormat: {
    width: '100%',
    color: '#000',
    fontFamily: Fonts.Lato400,
    fontSize:20
  },
  headingText:{
    color: '#000', 
    fontFamily: Fonts.Lato900, 
    fontSize: 22, 
    marginTop: '1%', 
    marginStart:'5%'
  }
});
