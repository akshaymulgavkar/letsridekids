import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Fonts } from "../../theme/Fonts";
import { styles } from "./Button.Styles";

export const Button = ({
    Loading,
    mainViewStyle,
    textStyle,
    text,
    leftIconEnable,
    leftIcon,
    leftIconViewStyle,
    rightIconEnable,
    rightIcon,
    rightIconViewStyle,
    leftText,
    ...touchableopacityProps
}) => {
    return (
        <>
            {!Loading ?
                <TouchableOpacity
                    {...touchableopacityProps}
                    style={[leftText? styles.containerLeft:styles.container, mainViewStyle]}>
                    {leftIconEnable ?
                        <View style={leftIconViewStyle}>
                            {leftIcon}
                        </View>
                        :
                        null
                    }

                    <Text style={[styles.textStyles, textStyle]} numberOfLines={1}>
                        {text}
                    </Text>

                    {rightIconEnable ?
                        <View style={rightIconViewStyle}>
                            {rightIcon}
                        </View>
                        :
                        null
                    }
                </TouchableOpacity>
                :
                <ActivityIndicator size={"small"} style={[leftText? styles.containerLeft:styles.container, mainViewStyle]}/>
            }
        </>
    )
}