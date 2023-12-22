import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import SignInScreen from "./src/screens/SigninScreen";
import {LinearGradient} from "expo-linear-gradient";

const App = () => {
    return (

        <SafeAreaView style={styles.root}>
            <LinearGradient
                colors={['#FF9B3F','#FFA95A', '#FFC289',  'white', 'white', 'white', 'white', 'white', 'white']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 1}}
                style={styles.gradientBackground}
            />

            <SignInScreen/>
            <StatusBar style="auto"/>
        </SafeAreaView>);
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    }, box: {
        width: '100%', height: '100%',
    }, gradientBackground: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default App;
