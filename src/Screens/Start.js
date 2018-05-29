import React, { Component } from 'react'
import { View, Image, TouchableOpacity, ImageBackground, Text, StatusBar } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { storage, recStorage } from '../Reactions/Process'
import { unlockedLevels, upisiRekordURedux } from '../Reactions'
import _ from 'lodash'


class Start extends Component {

    componentDidMount() {
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

          recStorage.load({
            key: 'rec',
            autoSync: true,
            syncInBackground: true,
          })
          .then(ret => {this.props.upisiRekordURedux(ret);})
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
            
                <TouchableOpacity onPress={() => { Actions.pick() }} style={{ width: 120, height: 120, marginTop: 10, alignSelf: 'center' }}>
                
                    <Image source={require('../Resources/power.png')} style={styles.button} />
                
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { Actions.score({ rekordi: this.props.rekordi }) }} style={styles.scoreTouchable}>
                    <Text style={styles.score}>
                        Score List
                    </Text>
                </TouchableOpacity>
        </ImageBackground>
        );
    }
}

const styles = {
    button: {
        width: 80,
        resizeMode: 'contain',
        alignSelf: 'center',
        top: -195
    },
    logoImage: {
        width: 140,
        resizeMode: 'contain',
        alignSelf: 'center',
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 10,
    },
    text: {
        top: -50,
        marginBottom: 15,
        fontSize: 36,
        padding: 5,
        color: '#50aaff',
        fontWeight: '900',
        alignSelf: 'center',
        fontFamily: 'serif',
        textDecorationLine: 'underline',
    },
    backgroundImage: {
        width: '100%', 
        height: '100%'
    },
    score: {
        padding: 5,
        backgroundColor: 'rgba(10,80,200,0.3)',
        fontSize: 18,
        textAlign: 'center',
    },
    scoreTouchable: {
        marginHorizontal: 100,
        borderRadius: 6,
        overflow: 'hidden',

    }
}

const mapStateToProps = ({ proces }) => {
    const { rekordi} = proces;
  
    return { rekordi };
  };

export default connect(mapStateToProps, { unlockedLevels, upisiRekordURedux })(Start);