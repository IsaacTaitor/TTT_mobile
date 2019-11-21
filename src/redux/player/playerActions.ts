import { Dispatch } from "redux";
import { RENAME_PLAYER } from "../../types/actions";

export const renamePlayer = (newName: string) => {
	return (dispatch: Dispatch<any>) => {
		dispatch({ type: RENAME_PLAYER, payload: newName });
	};
};