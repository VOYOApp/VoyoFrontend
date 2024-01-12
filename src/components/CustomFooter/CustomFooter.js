import React from "react";
import {View, Text, TextInput, StyleSheet, Image} from "react-native";
import { useNavigation } from '@react-navigation/native';

const CustomFooter = ({currentOption = "home"}) =>{

    let home = "home_locked";
    let search = "search_locked";
    let chat = "chat_locked";

    switch (currentOption){
      case "home" :
        home = "home";
        break;

      case "search" :
        search = "search";
        break;
      
      case "chat" :
        chat = "chat";
        break;
    }

    const navigation = useNavigation()
    const goHome = () => {
      //  TODO : Get back to previous page
      console.warn('Going back')
    }
    
    const goSearch = () => {
      //  TODO : Search function
      console.warn('Search')
    }

    const goChat = () => {
        // TODO : chat
        console.warn('Chat')
    }
    
  return(
      <View style={styles.footer}>
        <View>
            <Image style={{ width: 25, height: 25}} source={require("../../../assets/"+home+".png")} onClick={() => goHome()}></Image>
        </View>
        <View>
            <Image style={{ width: 25, height: 25}} source={require("../../../assets/"+search+".png")} onClick={() => goSearch()}></Image>
        </View>
        <View>
            <Image style={{ width: 25, height: 25}} source={require("../../../assets/"+chat+".png")} onClick={() => goChat()}></Image>
        </View>
      </View>)
  }


const styles = StyleSheet.create({
    footer: {
        display: "flex", 
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#292827", 
        paddingLeft:"40px", 
        paddingRight:"40px", 
        paddingTop:"12px", 
        paddingBottom:"12px"
      }})
export default CustomFooter