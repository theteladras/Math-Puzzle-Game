# TCGame

A job applycation project.

## Getting Started

To build this app you will need to have a full set up for ReactNative on your PC/Mac. For that you can follow the steps on: https://facebook.github.io/react-native/docs/getting-started.html


### Installing

To begin, clone the repository at a target destination. Than run 'npm install', witch will install all the needed dependencies for the app. Next will be runing the app, by passing 'react-native run-android' in the command line of your console, while you are runing a ANDROID EMULATOR or have a PHONE conected to the PC/Mac.

The target platform of this version is only Android.

### Building

Afther you have succesfully completed the steup for RN, you will be almost ready to build the APK. For that you will be needing to check: https://facebook.github.io/react-native/docs/signed-apk-android.html

Once that is done, you can build your APK by runing 'cd android && ./gradlew assembleRelease' directory where the project is located at.

The APK will be located at: 'android\app\build\outputs\apk'. 
Note: use the app-release.apk
