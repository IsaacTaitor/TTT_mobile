import { AnyAction } from "redux";

import { RENAME_PLAYER } from "../../types/actions";
import { PlayerName } from "../../types/store";

const initialState: PlayerName = {
	playerName: "Chuck Norris"
};

export function playerReducer(state = initialState, action: AnyAction): PlayerName {
	switch (action.type) {
	case RENAME_PLAYER:
		return {
			...state,
			playerName: action.payload
		};
	default:
		return state;
	}
}