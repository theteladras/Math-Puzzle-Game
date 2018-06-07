import {
	POINTS,
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
} from '../Actions/types';

const INITIAL_STATE = {
	my_life_points: 1,
	level_caught: 0,
	current_level: null,
	time_of_finish: 0,
	rerender: false,
	all_records: {},
	records_saved: 'Not Saved',
	flag: 1,
	per_click_flag: false,
	clicks_count: 0,
	arr_time_per_clicks: [],
};
  
export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case LIFEPOINTS:
		return { ...state, my_life_points: state.my_life_points + 1  };
	case LIFEPOINTSDECRESE:
		return { ...state, my_life_points: state.my_life_points - action.payload - 1  };
	case RESETLIFEPOINTS:
		return { ...state, my_life_points: 1 };
	case LEVEL:
		return { ...state, level_caught: action.payload  };
	case CURRENTLEVEL:
		return { ...state, current_level: action.payload };
	case TIME: 
		return { ...state, time_of_finish: action.payload };
	case RERENDER: 
		return { ...state, rerender: action.payload};
	case RECORDSINREDUX: 
		return { ...state, all_records: action.payload};
	case RECORDSINSTORAGE: 
		return { ...state, records_saved: 'Saved'};
	case FLAGTIME: 
		return { ...state, flag: state.flag + 1};
	case REQUESTTIMEPERCLICK: 
		return { ...state, per_click_flag: action.payload};
	case CLICKCOUNTER: 
		return { ...state, clicks_count: state.clicks_count + 1};
	case CLICKCOUNTERRESET: 
		return { ...state, clicks_count: 0};
	case TIMEPERCLICK: 
		return { ...state, arr_time_per_clicks: [action.payload, ...state.arr_time_per_clicks]};
	case RESETTIMEPERCLICK: 
		return { ...state, arr_time_per_clicks: [] };
	default:
		return state;
	}
};
  