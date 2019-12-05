import React from "react";
import { View } from "native-base";
import GameSquare from "../../shared/GameSquare";
import { Games } from "../../../types/store";
import { styles } from "./styles";

interface GamesProps {
	games: Games;
	playerName: string;
	onPress(id: string): void;
}

const lengthGamesOnHomeScreen = 4; 

const GamesView: React.FC<GamesProps> = ({ games, playerName, onPress }: GamesProps): React.ReactElement => (
	<View style={styles.games}>
		{Object.keys(games).map((id: string, key) =>
			<GameSquare
				onPress={() => onPress(id)}
				key={id}
				time={games[id].time}
				opponent={games[id].opponent}
				playerName={playerName}
				status={games[id].status}
				isLast={!((key + 1) % lengthGamesOnHomeScreen)} />
		)}
	</View>
);

export default React.memo(GamesView);