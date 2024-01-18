import React from "react";
import {View, Text, StyleSheet, Pressable} from "react-native";

const CustomButton = ({text, onPress, type = "PRIMARY", bgColor, fgColor, widthBtn, deactivated = false}) => {
    return (
        <Pressable onPress={onPress}
                   disabled={deactivated}
                   style={[
                       styles.container,
                       styles[`container_${type}`],
                       bgColor && deactivated === false ? {backgroundColor: bgColor} : {backgroundColor: 'grey'},
                       widthBtn ? {width: widthBtn} : null,
                   ]}>
            <Text style={[
                styles.text,
                styles[`text_${type}`],
                fgColor ? {color: fgColor} : null
            ]}>{text}</Text>
        </Pressable>)
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        borderRadius: 100,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_PRIMARY: {
        backgroundColor: '#FE881B',
    },
    container_SECONDARY: {
        backgroundColor: '#ab5500',
    },
    container_TERTIARY: {
        backgroundColor: '#3e1d00',
    },

    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    text_PRIMARY: {
        color: '#fff',
    },
    text_SECONDARY: {
        color: '#aeaeae',
    },
    text_TERTIARY: {
        color: '#999999',
    },
})

export default CustomButton