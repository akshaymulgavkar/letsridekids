import React from "react";
import {
    View,
    TouchableOpacity,
} from "react-native";

import { styles } from "./Header.Styles";

export const Header = ({
    mainContainerStyle,
    left,
    leftViewStyle,
    center,
    centerViewStyle,
    right,
    rightViewStyle,
    ...touchableopacityProps
}) => {
    return (
        <View
            style={[styles.container, mainContainerStyle]}>

            <View style={leftViewStyle}>
                {left}
            </View>

            <View style={centerViewStyle}>
                {center}
            </View>

            <View style={rightViewStyle}>
                {right}
            </View>

        </View>
    )
}