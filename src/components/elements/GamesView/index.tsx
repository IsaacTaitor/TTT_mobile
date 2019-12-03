import React from "react";
import { View } from "native-base";
import GameSquare from "../../shared/GameSquare";
import { Games } from "../../../types/store";
import { styles } from "./styles";

interface GamesProps {
	games: Games;
}

const lengthGamesOnHomeScreen = 4; 

const GamesView: React.FC<GamesProps> = ({ games }: GamesProps): React.ReactElement => (
	<View style={styles.games}>
		{Object.keys(this.props.games).map((id, key) =>
			<GameSquare
				onPress={(): void => this.navigateToGame(id)}
				key={id}
				time={games[id].time}
				opponent={games[id].opponent}
				playerName={this.props.playerName}
				status={games[id].status}
				isLast={!((key + 1) % lengthGamesOnHomeScreen)} />
		)}
	</View>
);

export default React.memo(GamesView);