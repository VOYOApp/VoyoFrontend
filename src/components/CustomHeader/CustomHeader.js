import React from "react";
import {View, Text, TextInput, StyleSheet, Image} from "react-native";

const CustomHeader = () =>{
return(
    <View style={styles.header}>
    <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
    <Image style={{ width: 25, height: 25}} source={require("../../../assets/back.png")} onClick={() => goBack()}></Image>
    <Text style= {{ marginLeft: 25, fontFamily: "Roboto", fontSize: "15px"}}>Mon compte</Text>
    </View>
    <View style={{position: "absolute", right: 20}}>
    <Image style={{ width: 25, height: 25}} source={require("../../../assets/logout.png")} onClick={() => logout()}></Image>
    </View>
    </View>)
}

const styles = StyleSheet.create({
header: {
    display: "flex", 
    flexDirection: "row", 
    backgroundColor: "rgba(92, 56, 11, 0.71)", 
    paddingLeft:"20px", 
    paddingRight:"20px", 
    paddingTop:"12px", 
    paddingBottom:"12px"
  }})
export default CustomHeader