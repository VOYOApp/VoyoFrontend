import React from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";

const CustomInput = ({value, setValue, placeHolder, secureTextEntry, editabled = true, widthInp}) => {
    return (<View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeHolder}
                style={[styles.input, widthInp ? {width: widthInp} : null]}
                secureTextEntry={secureTextEntry}
                editable={editabled}
            />
        </View>)
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#F0F0F0',
        height: 50,
        borderRadius: 18,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 10,
        fontSize: 15,
    }
})

export default CustomInput