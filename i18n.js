import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Platform, NativeModules } from 'react-native'

const deviceLanguage =
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

console.log(deviceLanguage.substring(0, 2)); //en_US

// Import your translation files
import enTranslation from './src/locales/en.json';
import frTranslation from './src/locales/fr.json';

const resources = {
    en: { translation: enTranslation },
    fr: { translation: frTranslation },
};

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',

        resources,
        lng: deviceLanguage.substring(0, 2), // set the default language
        fallbackLng: 'en', // fallback language is english

        interpolation: {
            escapeValue: false, // react already escapes values
        },
    });

export default i18n;
