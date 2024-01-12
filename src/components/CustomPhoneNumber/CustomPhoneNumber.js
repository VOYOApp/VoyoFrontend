import React from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native"

const CustomPhoneNumber = ({value, setValue, placeHolder, secureTextEntry, editabled = true, widthInp}) => {

    return (
      <View style={styles.container}>
          <View style={{width:'100%', flexDirection:'row', alignItems:'center'}}>
              <View style={{flexDirection:'row', alignItems:'center', width:'20%', height:50, backgroundColor:'#F0F0F0', borderRadius:18, padding:10, marginRight:10}}>
                  <Image source={require('../../../assets/france.png')} style={styles.logo}/>
                  <Text> +33</Text>
              </View>

              <View style={{flexDirection:'row',width:'70%'}}>
                  <TextInput
                    value={value}
                    onChangeText={setValue}
                    placeholder={placeHolder}
                    style={[styles.input,{backgroundColor: '#F0F0F0', borderRadius: 18, height: 50, width: '100%',padding:10 }]}
                    secureTextEntry={secureTextEntry}
                    editable={editabled}
                    textContentType={"telephoneNumber"}
                    keyboardType={"numeric"}
                    maxLength={13}
                  />
              </View>
          </View>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
    },
    logo: {
        width: '400%',
        maxWidth: 20,
        maxHeight: 20,
    }
})

export default CustomPhoneNumber