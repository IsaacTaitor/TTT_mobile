import React from "react";
import { Text, Icon, View } from "native-base";
import { Game, StateTurn } from "../../../types/store";
import { styles } from "./styles";

interface ScoreboardProps {
	playerName: string;
	game: Game;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ playerName, game }: ScoreboardProps) => {

	return (
		<View style={styles.scoreBoard}>
			<View style={[styles.player, game.turn === StateTurn.PLAYER ? { borderBottomWidth: 3 } : null]}>
				<Text>{playerName}</Text>
				<Icon name={"md-close"} style={{ color: "grey", paddingLeft: 10 }} />
			</View>
			<View style={[styles.opponent, game.turn === StateTurn.AI ? { borderBottomWidth: 3 } : null]}>
				<Icon name={"md-radio-button-off"} style={{ color: "#299ddc", paddingRight: 10 }} />
				<Text>{game.opponent}</Text>
			</View>
		</View>
	);
};

export default Scoreboard;