import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Game from './Screens/Game';
import Pick from './Screens/Pick';
import Start from './Screens/Start';
import Score from './Screens/Score';
import styles from './Styles/RouterStyle';


const RouterComponent = () => {
    return (
      <Router>
        <Scene key='root'>
          <Scene key="start" component={Start} hideNavBar={true} initial />
          <Scene key="pick" component={Pick} back={true} backButtonTintColor={styles.backButtonColor} title="Pick a Level" 
            titleStyle={styles.titleStyle} 
            navigationBarStyle={styles.navigationBarStyle}
            onBack={() => { Actions.start({ rerender: true }) }} 
          />
          <Scene key="game" component={Game} hideNavBar={true} />
          <Scene key="score" component={Score} back={true} backButtonTintColor={styles.backButtonColor} title="Score list" 
            titleStyle={styles.titleStyle} 
            navigationBarStyle={styles.navigationBarStyle}
            onBack={() => { Actions.start({ rerender: true }) }} 
          />
        </Scene>
      </Router>
    );
  };
  
  export default RouterComponent;
