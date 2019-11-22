import { Dispatch } from "redux";
import { CREATE_NEW_GAME } from "../../types/actions";

export const createNewGame = (id: string) => {
	return (dispatch: Dispatch<any>) => {
		dispatch({ type: CREATE_NEW_GAME, payload: id });
	};
};