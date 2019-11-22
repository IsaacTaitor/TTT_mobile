import { AnyAction } from "redux";

import { CREATE_NEW_GAME } from "../../types/actions";
import { Games } from "../../types/store";

const startField = [[], [], []];

const initialState: Games = {
	"f5d47a64": {
		id: "f5d47a64",
		begin: 1574427290994,
		opponent: "AI",
		status: "",
		field: startField
	}
};

export function gamesReducer(state = initialState, action: AnyAction): Games {
	switch (action.type) {
	case CREATE_NEW_GAME:
		return {
			...state,
			[action.payload]: {
				id: action.payload,
				begin: new Date().getTime(),
				opponent: "AI",
				status: "",
				field: startField
			}
		};
	default:
		return state;
	}
}