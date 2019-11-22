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
	field: Array<Array<string>>;
}

export interface Games {
	[id: string]: Game;
}