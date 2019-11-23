import { Dispatch, Action } from "redux";
import { CREATE_NEW_GAME, EDIT_FIELD } from "../../types/actions";

export const createNewGame = (id: string) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: CREATE_NEW_GAME, payload: { id } });
	};
};

export const editField = (id: string, step: string, coordinates: Array<{ x: number; y: number }>) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: EDIT_FIELD, payload: { id, step, coordinates } });
	};
};