import { Game, StateTurn, StateCell } from "../types/store";

const findEmptyCell = (field: Game["field"]): Array<number> => {
	const emptyCells = [];
	field.forEach((row: Array<StateCell>, i: number) => {
		row.forEach((cell: StateCell, k: number) => {
			if (cell === StateCell.Empty) {
				emptyCells.push((i * 3) + k);
			}
		});
	});
	return emptyCells;
};

const getCoordinates = (emptyCells: Array<number>): { x: number; y: number } => {
	const rand = Math.floor(Math.random() * emptyCells.length);
	return { x: Math.floor(emptyCells[rand] / 3), y: emptyCells[rand] % 3 };
};

export const turnAI = (id: number, field: Game["field"], editField: Function): void => {
	const emptyCells = findEmptyCell(field);
	const coordinates = getCoordinates(emptyCells);
	editField(id, StateTurn.AI, coordinates);
};