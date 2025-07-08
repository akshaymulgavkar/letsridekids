import {  StatusBar, Text, View , useWindowDimensions} from 'react-native'
import { styles } from './Rides.Styles'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { getBookedRides, getPublishedRides } from '../../redux/actions/Rides.Actions';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/selectors/User.Selectors';
import MyPublishedRides from './MyPublishedRides/MyPublishedRides';
import MyBookedRides from './MyBookedRides/MyBookedRides'

export const Rides = ({navigation, route}) => {

  const user = useSelector(getUser)

  const dispatch= useDispatch()

  useEffect(() => {
    let params = {
      userId: user._id
    }
    dispatch(getPublishedRides(params))
    dispatch(getBookedRides())
  }, [user])

  const layout = useWindowDimensions();


  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: "I'm Driver" },
    { key: 'second', title: "I'm Passenger" },
  ]);

  const renderTabBar = (props) => (
  	<TabBar
     	 {...props}
      	activeColor={'#26185F'}
      	inactiveColor={'#00000050'}
        style={{backgroundColor:'#F3F3F3', borderRadius:10}}
        renderLabel={({ route, focused, color }) => renderLabel(route, focused, color)}
        indicatorStyle={{backgroundColor:'#F3F3F3'}}
  	/>
  );
 
  const renderLabel = (route, focused, color) => {
    return (
        <View style={focused ?{flex:1}:{}}>
         <Text style={focused ?[{color:'#26185F'}, styles.tabBarHeading]:[{color:'#00000050'}, styles.tabBarHeading]}>
          {route.title}
        </Text>
        </View>
        )
   }

  return (
    <>
    <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'}/>
    <SafeAreaView style={styles.SafeAreaView}>
      <Text style={styles.headingText}>My Rides</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          first: ()=><MyPublishedRides  navigation={navigation}/>,
          second: ()=> <MyBookedRides navigation={navigation}/>,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        style={styles.tabView}
        lazy
    />
    </SafeAreaView>
    </>
  )
}
 
