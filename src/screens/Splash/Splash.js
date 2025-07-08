import {getUser} from '../../redux/selectors/User.Selectors'
import React, {
    useEffect,
    useRef
} from "react";
import {
    View,
    StyleSheet,
    Image,
    Animated,
    StatusBar
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Images } from "../../assets/assets.path";
import { styles } from "./Splash.Styles";
import {HttpClient, setDispatch} from '../../redux/controllers/HttpClient'
import { logout } from '../../redux/actions/User.Actions';

const Splash = () => {

    const fadeAnimation = useRef(new Animated.Value(0)).current;
    const Loopanimation = useRef(new Animated.Value(0)).current;
    const fadeAnimation2 = useRef(new Animated.Value(0)).current;

    const user = useSelector(getUser)

    const dispatch = useDispatch()

    useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnimation, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true
            }),
            Animated.timing(fadeAnimation2, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true
            }),
        ]).start();
    }, []);

    function cycleAnimation() {
        Animated.loop(
            Animated.timing(Loopanimation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            })
        ).start();
    }

    useEffect(() => {
        cycleAnimation();
    }, []);

    useEffect(()=>{
        // HttpClient.setAuthorization(user?.accessToken)

        setDispatch(dispatch);
        if (user){
            HttpClient.setAuthorization(user?.accessToken)
        }else {
            dispatch(logout())
        }
    },[])

    return (
        <View style={styles.container}>

            <StatusBar
                translucent
                backgroundColor={'transparent'}
                barStyle={'light-content'}
            />

            <Image
                source={Images.splashBackground}
                style={[StyleSheet.absoluteFill, styles.imageBackground]}
            />

            <Animated.Image
                source={Images.cityandcloud}
                style={[StyleSheet.absoluteFill, styles.imageBackground, {
                    opacity: fadeAnimation,
                }]}
            />

            <Animated.View
                style={[StyleSheet.absoluteFill, {
                    opacity: Loopanimation,
                    transform: [{
                        translateX: Loopanimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [2000, -200]  // 0 : 150, 0.5 : 75, 1 : 0
                        }),
                    }],
                }]}
            >
                <Image
                    source={Images.singleCloud}
                    style={{
                        width: 50,
                        height: 200,
                    }}
                    resizeMode="contain"
                />
            </Animated.View>

            <Animated.View style={[styles.logoView, {
                opacity: fadeAnimation2
            }]}>
                <Image
                    source={Images.logo}
                    style={styles.logoStyle}
                    resizeMode="contain"
                />
            </Animated.View>
        </View>
    )
}
export default Splash;