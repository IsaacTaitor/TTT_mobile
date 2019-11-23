export interface ApplicationStore {
	playerStore: PlayerName;
	gamesStore: Game;
}

export interface PlayerName {
	playerName: string;
}

export interface Game {
	id: string;
	begin: number;
	opponent: string;
	status: string;
	step: string;
	field: Array<Array<StateCell>>;
}

export interface Games {
	[id: string]: Game;
}

export enum StateCell {
	Empty,
	X,
	O,
}