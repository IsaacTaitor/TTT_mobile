import { Dispatch, Action } from "redux";
import { CREATE_NEW_GAME, EDIT_FIELD, SURRENDER } from "../../types/actions";
import { StateTurn } from "../../types/store";

export const createNewGame = (id: string) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: CREATE_NEW_GAME, payload: { id } });
	};
};

export const editField = (id: string, turn: StateTurn, coordinates: { x: number; y: number }) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: EDIT_FIELD, payload: { id, turn, coordinates } });
	};
};

export const surrender = (id: string) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: SURRENDER, payload: { id } });
	};
};