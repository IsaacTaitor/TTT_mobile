export interface ApplicationStore {
	playerStore: PlayerName;
	gamesStore: Game;
}

export interface PlayerName {
	playerName: string;
}

export interface Game {
	id: string;
	time: number;
	opponent: string;
	status: StateStatus;
	turn: StateTurn;
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

export enum StateStatus {
	PLAYING,
	WIN,
	LOSE,
	DRAW
}

export enum StateTurn {
	PLAYER,
	AI,
	GAMEOVER
}