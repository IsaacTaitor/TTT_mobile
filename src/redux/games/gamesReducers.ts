import { AnyAction } from "redux";

import { CREATE_NEW_GAME, EDIT_FIELD } from "../../types/actions";
import { Game, Games, StateCell, StateStatus, StateTurn } from "../../types/store";

const { Empty, X, O } = StateCell;
const { PLAYING, WIN, LOSE, DRAW } = StateStatus;

const initialState: Games = {
	"f5d47a64": {
		id: "f5d47a64",
		begin: 1574427290994,
		opponent: "AI",
		turn: StateTurn.PLAYER,
		status: PLAYING,
		field: [[Empty, X, Empty], [Empty, Empty, O], [O, Empty, Empty]]
	}
};

const editField = (oldField: Game["field"], turn: StateTurn, coordinates: { x: number; y: number }): Game["field"] => {
	const newField: Game["field"] = new Object(oldField) as Game["field"];

	newField[coordinates.x][coordinates.y] = turn === StateTurn.AI ? O : X;
	return newField;
};

const checkStatus = (field: Game["field"]): StateStatus => {
	for (let i = 0; i < 3; i++) {
		if ((field[i][0] !== StateCell.Empty) && (field[i][0] === field[i][1]) && (field[i][1] === field[i][2])) {
			if (field[i][0] === StateCell.X) {
				return WIN;
			} else {
				return LOSE;
			}
		}
	}
	for (let i = 0; i < 3; i++) {
		if ((field[0][i] !== StateCell.Empty) && (field[0][i] === field[1][i]) && (field[1][i] === field[2][i])) {
			if (field[0][i] === StateCell.X) {
				return WIN;
			} else {
				return LOSE;
			}
		}
	}
	if ((field[0][0] !== StateCell.Empty) && (field[0][0] === field[1][1]) && (field[1][1] === field[2][2])) {
		if (field[0][0] === StateCell.X) {
			return WIN;
		} else {
			return LOSE;
		}
	}
	if ((field[0][2] !== StateCell.Empty) && (field[0][2] === field[1][1]) && (field[1][1] === field[2][0])) {
		if (field[0][2] === StateCell.X) {
			return WIN;
		} else {
			return LOSE;
		}
	}
	for (let i = 0; i < 3; i++) {
		for (let k = 0; k < 3; k++) {
			if (field[i][k] === StateCell.Empty) {
				return PLAYING;
			}
		}
	}
	return DRAW;
};

export function gamesReducer(state: Games = initialState, action: AnyAction): Games {
	const { type, payload } = action;
	switch (type) {
	case CREATE_NEW_GAME:
		return {
			...state,
			[payload.id]: {
				id: payload.id,
				begin: new Date().getTime(),
				opponent: "AI",
				status: StateStatus.PLAYING,
				turn: StateTurn.PLAYER,
				field: [[Empty, Empty, Empty], [Empty, Empty, Empty], [Empty, Empty, Empty]]
			}
		};
	case EDIT_FIELD: {
		const field = editField(state[payload.id].field, payload.turn, payload.coordinates);
		const status = checkStatus(field);
		const turn = status === StateStatus.PLAYING ? payload.turn === StateTurn.PLAYER ? StateTurn.AI : StateTurn.PLAYER : StateTurn.GAMEOVER;
		return {
			...state,
			[payload.id]: {
				...state[payload.id],
				field,
				status,
				turn
			}
		};
	}
	default:
		return state;
	}
}