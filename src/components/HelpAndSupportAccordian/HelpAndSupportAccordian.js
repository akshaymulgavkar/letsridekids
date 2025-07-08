import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import { useState } from 'react';
import {styles} from './HelpAndSupportAccordian.Styles'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const HelpAndSupportAccordian = (props) => {
  const {question, answer} = props || '';


const [Expand, setExpand] = useState(false)     
  
const toggleExpand = () => {  
    setExpand(!Expand)        
}

  return (
    <TouchableWithoutFeedback style={styles.Container} onPress={() => toggleExpand()}>
        <View>
            <Text style={styles.questionText}>{question}</Text>
        </View>

        {Expand &&<Text style={styles.answerText}>{answer}</Text>}
    </TouchableWithoutFeedback>
  );
};

export default HelpAndSupportAccordian;

