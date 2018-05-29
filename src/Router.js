import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import Game from './Screens/Game'
import Pick from './Screens/Pick'
import Start from './Screens/Start'
import Score from './Screens/Score'
import CanvasComponent from './Screens/CanvasComponent'


const RouterComponent = () => {
    return (
      <Router>
        <Scene key='root'>
          <Scene key="start" component={Start} hideNavBar={true} initial />
          <Scene key="pick" component={Pick} back={true} backButtonTintColor="#f4ee3a" title="Pick a Level" 
            titleStyle={{ color: "#f4ee3a", flex: 1, flexDirection: 'row', marginRight: '25%', textAlign: 'center'  }} 
            navigationBarStyle={{ backgroundColor: '#03540b', height: 40 }}
            onBack={() => { Actions.start({ rerender: true }) }} 
          />
          <Scene key="game" component={Game} hideNavBar={true} />
          <Scene key="score" component={Score} back={true} backButtonTintColor="#f4ee3a" title="Score list" 
            titleStyle={{ color: "#f4ee3a", flex: 1, flexDirection: 'row', marginRight: '25%', textAlign: 'center'  }} 
            navigationBarStyle={{ backgroundColor: '#03540b', height: 40 }}
            onBack={() => { Actions.start({ rerender: true }) }} 
          />
        </Scene>
      </Router>
    );
  };
  
  export default RouterComponent;