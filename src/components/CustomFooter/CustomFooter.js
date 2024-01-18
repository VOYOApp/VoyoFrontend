import React from "react";
import {View, Text, TextInput, StyleSheet, Image, Dimensions} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Images from "../../../assets/index.js";

const CustomFooter = ({currentOption = "home"}) =>{
    const appWidth = Dimensions.get('window').width;
    const appHeight = Dimensions.get('window').height;
    let home = Images.home_locked;
    let search = Images.search_locked;
    let chat = Images.chat_locked;

    switch (currentOption){
      case "home" :
        home = Images.home;
        break;

      case "search" :
        search = Images.search;
        break;
      
      case "chat" :
        chat = Images.chat;
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
      <View style={{display: "flex", 
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#292827",
        position:"absolute",
        paddingLeft:40, 
        paddingRight:40, 
        paddingTop:15, 
        paddingBottom:15,
        marginBottom:0,
        top: appHeight-25,
        width: appWidth}}>
        <View>
            <Image style={{ width: 25, height: 25}} source={home}></Image>
            {/* <Image style={{ width: 25, height: 25}} source={require("../../../assets/home.png")} onClick={() => goHome()}></Image> */}
        </View>
        <View>
            <Image style={{ width: 25, height: 25}} source={search} onClick={() => goSearch()}></Image>
        </View>
        <View>
            <Image style={{ width: 25, height: 25}} source={chat} onClick={() => goChat()}></Image>
        </View>
      </View>)
  }


const styles = StyleSheet.create({
    footer: {

      }})
export default CustomFooter