import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ImageBackground, Text, StatusBar, BackHandler, YellowBox } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Sound from 'react-native-sound';
import { storage, recStorage } from '../Actions/Process';
import { unlockedLevels, writeRecordInRedux } from '../Actions';
import styles from '../Styles/StartStyle';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])  // this warning is coming from react module ( react.development.js )



class Start extends Component {
    constructor(props){
        super(props);
        this.onBackClicked = this._onBackClicked;

        this.enterSound = null;

        enterSound = new Sound('enter.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);

                return;
        }});
    }
    //handling back button functionality
    _onBackClicked = () => {
        BackHandler.exitApp();
        return true;
    }

    componentDidMount() {
        
        //loading unlocked_game_lvl from 'local storage'
        storage.load({
          key: 'GameLevelStorage',
          autoSync: true,
          syncInBackground: true,
        })
        .then(ret => this.props.unlockedLevels(ret.gameLevel))
        .catch(err => {
            switch (err.name) {
              case 'NotFoundError':
                console.log('Error name: ', err.name);
                break;
              case 'ExpiredError':
                console.log('Error name: ', err.name);
                break;
            }
          });
        //loading records from 'local storage'
        recStorage.load({
        key: 'rec',
        autoSync: true,
        syncInBackground: true,
        })
        .then(ret => {this.props.writeRecordInRedux(ret);})
        .catch(err => {
            switch (err.name) {
            case 'NotFoundError':
                console.log('Error name: ', err.name);
                break;
            case 'ExpiredError':
                console.log('Error name: ', err.name);
                break;
            }
        });
        BackHandler.addEventListener('hardwareBackPress', this.onBackClicked);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackClicked); // removing the hardware back button functionality
    }

    powerButton = () => {
        Actions.pick();
        enterSound.setVolume(.4).play();
    }

    render() {
        return(
        <ImageBackground source={require('../Resources/bgr.png')} style={styles.backgroundImage}>
            <StatusBar
                backgroundColor="#dbd00d"
                barStyle="light-content"
            />
            <Image source={require('../Resources/logo.png')} style={styles.logoImage} />
            <Text style={styles.text}>TCGame</Text>
            <View style={styles.secondPart}>
                <TouchableOpacity onPress={this.powerButton} style={styles.touchableBtnStyle}>
                    <Image source={require('../Resources/power.png')} style={styles.button} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { Actions.score({ all_records: this.props.all_records }) }} style={styles.scoreTouchable}>
                    <Text style={styles.score}>
                        Score List
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
        );
    }
}

const mapStateToProps = ({ proces }) => {
    const { all_records } = proces;
  
    return { all_records };
  };

export default connect(mapStateToProps, { unlockedLevels, writeRecordInRedux })(Start);