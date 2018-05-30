import { Actions } from 'react-native-router-flux'
import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'
import {
    PTS,
    LFP,
    LFPD,
    LVL,
    CLVL,
    TIME,
    RER,
    RECR,
    RECS,
    FLAGTIME,
    RLFP,
    CC,
    CCR,
    TPC,
    RTPC,
    REQTPC,
  } from '../Reactions/types'

    export const storage = new Storage({
        size: 1000,

        storageBackend: AsyncStorage,
        
        defaultExpires: null,
        
        enableCache: true,

    });

    export const recStorage = new Storage({
        size: 3000,

        storageBackend: AsyncStorage,
        
        defaultExpires: null,
        
        enableCache: true,

    });


  export const unlockedLevels = (level) => {
    return {
        type: LVL,
        payload: level
        };
  };

  export const unlockNextLVL = (level, max_unlocked, reset) => {
    if (max_unlocked < level + 1) {
        storage.save({  // save the unlocked level
            key: 'GameLevelStorage',   
            data: { 
                gameLevel: level + 1
            },
            
            expires: null
        });
    
        return {
        type: LVL,
        payload: level + 1
        };
    }
    else if (reset == 1) {
        storage.save({  // reset levels on game over ( when the player looses all his life )
            key: 'GameLevelStorage',   
            data: { 
                gameLevel: 1
            },
            
            expires: null
        });
    
        return {
        type: LVL,
        payload: 1
        };
    }
    return {
        type: 'nista',
        };
  };

  export const currentLVL = (level) => {
    return {
    type: CLVL,
    payload: level
    };
  };

  export const Timer = (time) => {
    return {
        type: TIME,
        payload: time,
    };
  };


  export const Rerender = (flag) => {
      return {
        type: RER,
        payload: flag
      };
  };

  export const upisiRekordURedux = (rekordi) => {
      return {
        type: RECR,
        payload: rekordi,
      };
  };

  export const upisiRekordUStoridz = (finishedLVL, inTIME, oldREC) => {
    let objOldRec = oldREC;
    if(objOldRec[finishedLVL]) {
        objOldRec[finishedLVL] = [ ...objOldRec[finishedLVL], inTIME ]
        recStorage.save({
            key: 'rec',   
            data: objOldRec,
            
            expires: null
        });
    }
    else {  // if the key does not exist in the object (for putting old walues back)
        objOldRec[finishedLVL] = [inTIME];
        recStorage.save({
            key: 'rec',   
            data: objOldRec,
            
            expires: null
        });
    }
    return {
      type: RECS,
    };
};

    export const requestTimeValue = () => { // flag for the timer ( switch for seting the time value in redux )
        return {
            type: FLAGTIME,
        };
    };

    export const requestTimePerClickValue = (flag) => {
        return {
            type: REQTPC,
            payload: flag
        };
    }

    export const lifepointsIncrement = () => {
        return {
            type: LFP,
        };
    };

    export const lifepointsReset = () => {
        return {
            type: RLFP,
        };
    };

    export const lifepointsDecrese = (num_of_unclicked) => {
        return {
            type: LFPD,
            payload: num_of_unclicked,
        }
    }

    export const clickCounter = () => {
        return {
            type: CC,
        }
    }
    export const clickCounterReset = () => {
        return {
            type: CCR,
        }
    }

    export const timePerClickCount = (vreme) => {
        return {
            type: TPC,
            payload: vreme,
        }
    }

    export const resetTimePerClickCount = () => {
        return {
            type: RTPC,
        }
    }