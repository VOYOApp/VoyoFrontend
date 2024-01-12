import React, {useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next'; // Import the useTranslation hook
import {LinearGradient} from 'expo-linear-gradient';
import Navigation from './src/navigation';
import i18n from './i18n'; // Import your i18n configuration file


const App = () => {
    const {t, i18n} = useTranslation(); // Destructure the t function and i18n object

    useEffect(() => {
    }, []);

    return (<SafeAreaView style={styles.root}>
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.gradientBackground}
        >
            <Navigation/>
            <StatusBar style="auto"/>
        </LinearGradient>
    </SafeAreaView>);
};

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
