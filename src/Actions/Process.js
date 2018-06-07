import { Actions } from 'react-native-router-flux'
import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'
import {
	LIFEPOINTS,
	LIFEPOINTSDECRESE,
	RESETLIFEPOINTS,
	LEVEL,
	CURRENTLEVEL,
	TIME,
	RERENDER,
	RECORDSINREDUX,
	RECORDSINSTORAGE,
	FLAGTIME,
	CLICKCOUNTER,
	CLICKCOUNTERRESET,
	TIMEPERCLICK,
	RESETTIMEPERCLICK,
	REQUESTTIMEPERCLICK,
} from './types';

// creating a storage named 'storage' and making it available to the rest of the app
export const storage = new Storage({
	size: 1000,

	storageBackend: AsyncStorage,
        
	defaultExpires: null,
        
	enableCache: true,

});
// creating a storage named 'recStorage' and making it available to the rest of the app
export const recStorage = new Storage({
	size: 3000,

	storageBackend: AsyncStorage,
        
	defaultExpires: null,
        
	enableCache: true,

});

// when the storage loads unlocked levels, this function is used to set the max unlocked level
export const unlockedLevels = (level) => {
	return {
		type: LEVEL,
		payload: level
	};
};
// while game in progress, afther the highest level has been completed this function will either set the next unlocked level or reset to level 1. on game over scenario
export const unlockNextLVL = (level, max_unlocked, reset) => {
	if (max_unlocked < level + 1) {
		storage.save({  // save the unlocked level
			key: 'GameLevelStorage',   // hitting a specific key in the storage
			data: { 
				gameLevel: level + 1
			},
            
			expires: null
		});
    
		return {
			type: LEVEL,
			payload: level + 1
		};
	}
	else if (reset == 1) {
		storage.save({  // reset levels on game over ( when the player looses all his life )
			key: 'GameLevelStorage',   // hitting a specific key in the storage
			data: { 
				gameLevel: 1
			},
            
			expires: null
		});
    
		return {
			type: LEVEL,
			payload: 1
		};
	}
	return {
		type: 'none',
	};
};
// tracking the current level being played
export const currentLVL = (level) => {
	return {
		type: CURRENTLEVEL,
		payload: level,
	};
};
// getting the time counter value
export const Timer = (time) => {
	return {
		type: TIME,
		payload: time,
	};
};
// when a level is complete or reseted, reset status parameters
export const Rerender = (flag) => {
	return {
		type: RERENDER,
		payload: flag,
	};
};
// action handler for getting the records in a local state of the app
export const writeRecordInRedux = (rekordi) => {
	return {
		type: RECORDSINREDUX,
		payload: rekordi,
	};
};
// action handler for puting the rec in the storage, with the new updates made
export const writeRecordInStorage = (finishedLVL, inTIME, oldREC) => {
    let objOldRec = oldREC;
    // checking if the key in the object exists so i can update it, if it exists we will updated it here
	if (objOldRec[finishedLVL]) {
		objOldRec[finishedLVL] = [...objOldRec[finishedLVL], inTIME];
		recStorage.save({
			key: 'rec', // hitting a specific key in the storage
			data: objOldRec,
            
			expires: null,
		});
    }
    // if the key does not exist in the object (for putting old values back)
	else {
		objOldRec[finishedLVL] = [inTIME];
		recStorage.save({
			key: 'rec', // hitting a specific key in the storage
			data: objOldRec,
            
			expires: null,
		});
	}
	return {
		type: RECORDSINSTORAGE,
	};
};
// flag for the timer ( switch for seting the time value in redux )
export const requestTimeValue = () => {
	return {
		type: FLAGTIME,
	};
};
// calling the time value for a single click and adding it to the array of previous clicks
// adding triggered by passing a flag argument of value 'true'
export const requestTimePerClickValue = (flag) => {
	return {
		type: REQUESTTIMEPERCLICK,
		payload: flag,
	};
}
// succesfully completed level, adding +1 life to total amount
export const lifepointsIncrement = () => {
	return {
		type: LIFEPOINTS,
	};
};
// when getting on the game over scenario, reseting back life points to 1
export const lifepointsReset = () => {
	return {
		type: RESETLIFEPOINTS,
	};
};
// values of the unclicked tiles, witch are used to decrease the value of the total amount of life points
export const lifepointsDecrese = (num_of_unclicked) => {
	return {
		type: LIFEPOINTSDECRESE,
		payload: num_of_unclicked,
	}
}
// triggering a +1 for every click, tracking numver of clicks made
export const clickCounter = () => {
	return {
		type: CLICKCOUNTER,
	}
}
// reseting number of clicks to 0
export const clickCounterReset = () => {
	return {
		type: CLICKCOUNTERRESET,
	}
}
// when requestTimePerClick(x) is triggered with a 'true', this will take the time per click value and add it to the state array
export const timePerClickCount = (per_click_time) => {
	return {
		type: TIMEPERCLICK,
		payload: per_click_time,
	}
}
// reseting the array for the time per click made, once the level is done, reseted or game over...
export const resetTimePerClickCount = () => {
	return {
		type: RESETTIMEPERCLICK,
	}
}