import React from "react";
import { Text, Icon, View } from "native-base";
import { Game, StateTurn } from "../../../types/store";
import { styles } from "./styles";

interface ScoreboardProps {
	playerName: string;
	game: Game;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ playerName, game }: ScoreboardProps) => (
	<View style={styles.scoreBoard}>
		<View style={[styles.player, game.turn === StateTurn.PLAYER ? styles.selected : null]}>
			<Text>{playerName}</Text>
			<Icon name={"md-close"} style={styles.crossIcon} />
		</View>
		<View style={[styles.opponent, game.turn === StateTurn.AI ? styles.selected : null]}>
			<Icon name={"md-radio-button-off"} style={styles.noughtIcon} />
			<Text>{game.opponent}</Text>
		</View>
	</View>
);

export default React.memo(Scoreboard);