import React from "react";
import {View, Text, TextInput, StyleSheet, Image} from "react-native";

const CustomInput = ({value, setValue, placeHolder, secureTextEntry, editable = true, showPen = false}) => {
    let penDisplay = "none";
    if(showPen === true){
        penDisplay = "flex";
    }
    return (<View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeHolder}
                style={[styles.input, widthInp ? {width: widthInp} : null]}
                secureTextEntry={secureTextEntry}
                editable={editable}
            />
            <Image source={require("../../../assets/pen.png")} style={{display:penDisplay, width:"10px", height:"10px", marginRight:"15px"}}></Image>
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
        flexDirection: 'row'
    },
    input: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 10,
        fontSize: 15,
    }
})

export default CustomInput