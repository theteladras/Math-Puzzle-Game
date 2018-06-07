import {
	PTS,
	LFP,
	LFPD,
	LVL,
	CLVL,
	TIME,
	RER,
	RECR,
	FLAGTIME,
	RLFP,
	CC,
	CCR,
	TPC,
	RTPC,
	REQTPC,
} from '../Actions/types';

const INITIAL_STATE = {
	skor: 0,
	zivot: 1,
	nivo: 0,
	trenutni_nivo: null,
	vreme_zavrsetka: 0,
	rerender: false,
	rekordi: {},
	flag: 1,
	per_click_flag: false,
	klika: 0,
	arr_klika_vreme: [],
};
  
export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case PTS:
		return { ...state, skor: action.payload };
	case LFP:
		return { ...state, zivot: state.zivot + 1  };
	case LFPD:
		return { ...state, zivot: state.zivot - action.payload  };
	case RLFP:
		return { ...state, zivot: 1 };
	case LVL:
		return { ...state, nivo: action.payload  };
	case CLVL:
		return { ...state, trenutni_nivo: action.payload };
	case TIME: 
		return { ...state, vreme_zavrsetka: action.payload };
	case RER: 
		return { ...state, rerender: action.payload};
	case RECR: 
		return { ...state, rekordi: action.payload};
	case FLAGTIME: 
		return { ...state, flag: state.flag + 1};
	case REQTPC: 
		return { ...state, per_click_flag: action.payload};
	case CC: 
		return { ...state, klika: state.klika + 1};
	case CCR: 
		return { ...state, klika: 0};
	case TPC: 
		return { ...state, arr_klika_vreme: [action.payload, ...state.arr_klika_vreme]};
	case RTPC: 
		return { ...state, arr_klika_vreme: [] };
	default:
		return state;
	}
};
  