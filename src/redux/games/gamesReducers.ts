import { AnyAction } from "redux";

import { CREATE_NEW_GAME, EDIT_FIELD } from "../../types/actions";
import { Game, Games, StateCell } from "../../types/store";

const { Empty, X, O } = StateCell;

const startField = [
	[Empty, X, Empty],
	[Empty, Empty, O],
	[O, Empty, Empty]];

const initialState: Games = {
	"f5d47a64": {
		id: "f5d47a64",
		begin: 1574427290994,
		opponent: "AI",
		step: "player",
		status: "",
		field: startField
	}
};

const editField = (oldField: Game["field"], step, coordinates): Game["field"] => {
	const newField = new Object(oldField);

	newField[coordinates.x][coordinates.y] = step === "AI" ? O : X;
	return startField;
};

export function gamesReducer(state = initialState, action: AnyAction): Games {
	const { type, payload } = action;
	switch (type) {
	case CREATE_NEW_GAME:
		return {
			...state,
			[payload.id]: {
				id: payload.id,
				begin: new Date().getTime(),
				opponent: "AI",
				status: "",
				field: startField
			}
		};
	case EDIT_FIELD:
		return {
			...state,
			[payload.id]: {
				...state[payload.id],
				field: editField(state[payload.id].field, payload.step, payload.coordinates)
			}
		};
	default:
		return state;
	}
}