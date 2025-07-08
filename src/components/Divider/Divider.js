import React from "react";
import {
    View,
} from "react-native";

import { styles } from "./Divider.Styles";

export const Divider = ({
    mainViewStyle,
}) => {
    return (
        <View style={[
            styles.container,
            mainViewStyle
        ]}
        />
    )
}