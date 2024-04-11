import React from "react"
import { StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { useTranslation } from "react-i18next"
import Images from "../../../../assets"
import { Icon } from "react-native-paper"
// import { getGlobal } from "../../../../context/AuthContext"

const PendingVoyo = () => {
	const { t } = useTranslation()
	const { height } = useWindowDimensions()

	return (
	  <View style={styles.root}>
		  <View className={"absolute bottom-[35%]"}>
			  <Icon source={Images.voyo_banner_full} size={500} />
		  </View>
		  <Text className={"absolute top-[60%] text-3xl text-orange-400 font-bold"}>PENDING</Text>
		  {/*<ActivityIndicator className={"absolute top-[50%]"} size={100} color="orange" />*/}
	  </View>
	)
}


const styles = StyleSheet.create({
	root: {
		padding: 20, alignItems: "center", justifyContent: "center", width: "100%", height: "100%",
	},
})

export default PendingVoyo